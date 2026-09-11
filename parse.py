import html.parser
class E(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.r = []
        self.s = False
    def handle_starttag(self, t, a):
        if t in ('style','script','head','svg'): self.s = True
    def handle_endtag(self, t):
        if t in ('style','script','head','svg'): self.s = False
    def handle_data(self, d):
        if not self.s and d.strip(): self.r.append(d.strip())
with open(r'C:\Users\germa\.gemini\antigravity\brain\d406c0a1-274c-49e7-9efb-cb3b186e50b3\.system_generated\steps\4\content.md', 'r', encoding='utf-8') as f:
    p = E()
    p.feed(f.read())
    print('\n'.join(p.r))
