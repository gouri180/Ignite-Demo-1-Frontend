with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '${mobileStep === 1 ? "block" : "hidden md:grid"}',
    '${mobileStep === 1 ? "grid" : "hidden md:grid"}'
)
content = content.replace(
    '${mobileStep === 2 ? "block" : "hidden md:grid"}',
    '${mobileStep === 2 ? "grid" : "hidden md:grid"}'
)
content = content.replace(
    '${mobileStep === 3 ? "block" : "hidden md:grid"}',
    '${mobileStep === 3 ? "grid" : "hidden md:grid"}'
)

with open('src/App.tsx', 'w') as f:
    f.write(content)
