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

if len(sections) == 11:
    new_sections = [
        sections[0], # Hero
        sections[2], # About
        sections[3], # Ideas
        sections[4], # Why Participate
        sections[5], # Domains
        sections[6], # Journey
        sections[7], # Format
        sections[8], # Stats
        sections[1], # Showcase Carousel (Previous Events)
        sections[9], # CTA
        sections[10] # FAQ
    ]
    new_main_content = "\n\n        ".join(new_sections)
    new_main_block = f"{main_start}\n        {new_main_content}\n      {main_end}"
    
    new_content = content.replace(main_match.group(0), new_main_block)
    
    # Also update navItems to point to #showcase instead of #stats
    new_content = new_content.replace("{ label: 'Previous Events', href: '#stats' }", "{ label: 'Previous Events', href: '#showcase' }")
    
    with open('src/App.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully updated App.tsx")
else:
    print("Found unexpected number of sections:", len(sections))
