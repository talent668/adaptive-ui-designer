"""Package buildless HTML entries and statically discoverable local dependencies.

Usage: python package-project.py ROOT OUTPUT.zip [--entry index.html] [--include README.md]
Computed runtime paths need --include. Framework projects should package build output.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import argparse, json, re, zipfile

FONT_EXT={'.woff','.woff2','.ttf','.otf','.eot'}
TEXT_EXT={'.html','.css','.js','.mjs','.cjs','.json','.md','.py','.txt'}
ASSET_EXT=r'(?:js|mjs|cjs|css|json|txt|svg|html|md|png|jpe?g|gif|webp|avif|ico|mp4|webm|mp3|wav|woff2?|ttf|otf|eot)'
BLOCKED={'node_modules','.git','.validation','validation','tests','.github','__pycache__'}

def css_refs(text):
    text=re.sub(r'/\*.*?\*/','',text,flags=re.S)
    return [match.group(1) or match.group(2) for match in re.finditer(r'url\(\s*[\'\"]?([^\)\'\"]+)|@import\s+[\'\"]([^\'\"]+)',text)]

def js_refs(text):
    # Ignore imports inside generator strings/templates and comments.
    strings={}
    def mask(match):
        raw=match.group()
        if raw[0] not in "\"'":return ' '
        token='__AUI_PATH_'+str(len(strings))+'__';strings[token]=raw[1:-1];return token
    regex_literal=r'(?:[=(:,!&|?{;\[]\s*|\breturn\s+|=>\s*)/(?![/*])(?:\\.|\[(?:\\.|[^\]\\])*\]|[^/\\\r\n])+/[dgimsuvy]*'
    code=re.sub(r'//[^\n]*|/\*.*?\*/|'+regex_literal+r'|\'(?:\\.|[^\'\\])*\'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`',mask,text,flags=re.S)
    token=r'(__AUI_PATH_\d+__)';refs=[]
    patterns=[
        (r'\bimport\s*(?:\(\s*'+token+r'\s*\)|'+token+r'|[\w$*,\s{}]+\bfrom\s+'+token+r')','module'),
        (r'\bexport\s+(?:\*\s*(?:as\s+\w+\s*)?|\{[^}]*\}\s*)from\s+'+token,'module'),
        (r'\brequire\s*\(\s*'+token+r'\s*\)','module'),
        (r'\bfetch\s*\(\s*'+token+r'\s*(?=[,)])','document'),
        (r'\bnew\s+URL\s*\(\s*'+token+r'\s*,\s*import\.meta\.url\s*\)','source'),
        (r'\.(?:src|href|poster)\s*=\s*'+token+r'(?=\s*(?:[;,)}]|$))','document'),
    ]
    for pattern,kind in patterns:
        for match in re.finditer(pattern,code):
            key=next(value for value in match.groups() if value);ref=strings[key]
            if kind=='module' and not ref.startswith(('./','../','/')):continue
            refs.append((ref,True,'source' if kind=='module' else kind))
    # Keep an optional literal-resource pass for data lists and generator helpers.
    # It collects only existing files and does not turn future-app snippets into requirements.
    required_refs={ref for ref,required,kind in refs if required}
    for ref in re.findall(r'[\'\"]([\w./ -]+\.'+ASSET_EXT+r'(?:[?#][^\s\'\"]*)?)[\'\"]',text):
        if ref not in required_refs:refs.append((ref,False,'source'))
    return refs

class Links(HTMLParser):
    def __init__(self):super().__init__();self.links=[];self.styles=[];self.scripts=[];self.inline=None
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        for key in ('src','href','poster'):
            if a.get(key):self.links.append((a[key],tag!='a','source'))
        if a.get('srcset'):
            self.links.extend((x.strip().split()[0],True,'source') for x in a['srcset'].split(',') if x.strip())
        if a.get('style'):self.styles.append(a['style'])
        if tag in ('style','script'):self.inline=tag
    def handle_endtag(self,tag):
        if tag==self.inline:self.inline=None
    def handle_data(self,data):
        if self.inline=='style':self.styles.append(data)
        elif self.inline=='script':self.scripts.append(data)

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('root',type=Path);parser.add_argument('output',type=Path)
    parser.add_argument('--entry',action='append');parser.add_argument('--include',action='append',default=[])
    parser.add_argument('--allow-fonts',action='store_true',help='Only for explicitly supplied project fonts.')
    args=parser.parse_args();base=args.root.resolve();output=args.output.resolve()
    if not base.is_dir():raise SystemExit('Project root is not a directory.')
    pending=[(base/x,(base/x).parent) for x in (args.entry or ['index.html'])+args.include]
    included=set();visited=set();missing=[]
    def resolve(source,ref,required):
        parts=urlsplit(ref.strip())
        if not parts.path or parts.scheme or parts.netloc:return None
        local=unquote(parts.path)
        target=(base/local.lstrip('/')) if local.startswith('/') else source.parent/local
        target=target.resolve()
        if not target.is_relative_to(base):raise ValueError('Reference leaves project root: '+ref)
        if not required and not target.exists():
            alternative=(base/local).resolve()
            if alternative.is_relative_to(base) and alternative.exists():target=alternative
        return target
    while pending:
        file,document_dir=pending.pop();file=file.resolve();visit=(file,document_dir)
        if not file.is_relative_to(base):raise SystemExit('Entry leaves project root: '+str(file))
        if file==output or visit in visited or any(p in BLOCKED for p in file.relative_to(base).parts):continue
        visited.add(visit)
        if not file.is_file():missing.append(str(file.relative_to(base)));continue
        suffix=file.suffix.lower()
        if suffix in FONT_EXT and not args.allow_fonts:raise SystemExit('Font binary referenced. Use local font names, or explicitly approve project fonts with --allow-fonts.')
        included.add(file)
        if suffix not in TEXT_EXT:continue
        text=file.read_text(encoding='utf-8-sig');refs=[]
        if suffix=='.html':
            document_dir=file.parent;links=Links();links.feed(text);refs+=links.links
            refs += [(ref,True,'source') for style in links.styles for ref in css_refs(style)]
            refs += [ref for script in links.scripts for ref in js_refs(script)]
        if suffix=='.md':refs += [(x,True,'source') for x in re.findall(r'\]\(([^)]+)\)',text)]
        if suffix=='.css':refs += [(x,True,'source') for x in css_refs(text)]
        if suffix in {'.js','.mjs','.cjs','.py','.txt'}:refs += js_refs(text)
        for ref,required,kind in refs:
            try:target=resolve(document_dir/'__document__.html' if kind=='document' else file,ref,required)
            except ValueError:
                if required:raise
                continue
            if target and any(p in BLOCKED for p in target.relative_to(base).parts):
                if required:raise SystemExit('Development path referenced by runtime: '+str(target.relative_to(base)))
                continue
            if target and target.is_file():pending.append((target,document_dir))
            elif target and required:missing.append(str(target.relative_to(base)))
    if missing:raise SystemExit('Missing local dependencies: '+', '.join(sorted(set(missing))))
    output.parent.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
        for file in sorted(included):archive.write(file,file.relative_to(base).as_posix())
    print(json.dumps({'archive':str(output),'files':len(included),'uncompressedBytes':sum(p.stat().st_size for p in included),'zipBytes':output.stat().st_size,'fontBinaries':sum(p.suffix.lower() in FONT_EXT for p in included)},ensure_ascii=False))

if __name__=='__main__':main()
