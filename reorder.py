import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

main_match = re.search(r'(<main id="home"[^>]*>)(.*?)(</main>)', content, re.DOTALL)
if not main_match:
    print("Could not find main block")
    exit(1)

main_start = main_match.group(1)
main_content = main_match.group(2)
main_end = main_match.group(3)

sections = re.findall(r'(?:{/\*.*?\*/}\s*)?<section.*?</section>', main_content, re.DOTALL)

print("Found sections:", len(sections))

if len(sections) == 11:
    new_sections = [
        sections[0], # Hero
        sections[1], # Showcase
        sections[8], # About
        sections[2], # Ideas
        sections[6], # Why Participate
        sections[4], # Domains
        sections[7], # Journey
        sections[5], # Format
        sections[3], # Stats (Previous Events)
        sections[9], # CTA
        sections[10] # FAQ
    ]
    new_main_content = "\n\n        ".join(new_sections)
    new_main_block = f"{main_start}\n        {new_main_content}\n      {main_end}"
    
    new_content = content.replace(main_match.group(0), new_main_block)
    
    old_nav = """  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Domains', href: '#domains' },
    { label: 'Timeline', href: '#journey' },
    { label: 'Awards', href: '#format' },
    { label: 'Previous Events', href: '#stats' },
    { label: 'F.A.Q.', href: '#faq' },
  ]"""
    
    new_nav = """  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Domains', href: '#domains' },
    { label: 'Timeline', href: '#journey' },
    { label: 'Previous Events', href: '#stats' },
    { label: 'F.A.Q.', href: '#faq' },
  ]"""
    
    if old_nav in new_content:
        new_content = new_content.replace(old_nav, new_nav)
        print("Updated navItems.")
    else:
        print("Could not find navItems to replace.")
        
    with open('src/App.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully updated App.tsx")
else:
    for i, s in enumerate(sections):
        print(f"Section {i} starts with: {s[:50].strip()}")
    print("Found unexpected number of sections, aborting.")
