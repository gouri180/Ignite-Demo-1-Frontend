import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

main_match = re.search(r'(<main id="home"[^>]*>)(.*?)(</main>)', content, re.DOTALL)
main_content = main_match.group(2)
sections = re.findall(r'(?:{/\*.*?\*/}\s*)?<section.*?</section>', main_content, re.DOTALL)

for i, s in enumerate(sections):
    print(f"Section {i}: {s[:80].strip()}")
