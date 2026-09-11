from bs4 import BeautifulSoup

with open(r'C:\Users\germa\.gemini\antigravity\brain\d406c0a1-274c-49e7-9efb-cb3b186e50b3\.system_generated\steps\4\content.md', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

forms = soup.find_all('form')
print(f"Found {len(forms)} forms.")

for i, form in enumerate(forms):
    print(f"\n--- Form {i+1} ---")
    print(f"Action: {form.get('action')}")
    print(f"Method: {form.get('method')}")
    print(f"Classes: {form.get('class')}")
    print("Inputs:")
    for input_tag in form.find_all(['input', 'textarea', 'select']):
        print(f" - {input_tag.get('name')} ({input_tag.name}): {input_tag.get('placeholder', '')}")
    print("Text in form:")
    print(form.get_text(separator=' ', strip=True)[:200])

