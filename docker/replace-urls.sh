#!/bin/bash

# Replace GitHub and Discord URLs with pollinations.ai
echo "Replacing GitHub and Discord URLs with pollinations.ai..."
find /app/.next -type f -exec sed -i 's|https://github.com/Canner/WrenAI|https://pollinations.ai|g' {} \;
find /app/.next -type f -exec sed -i 's|github.com/Canner/WrenAI|pollinations.ai|g' {} \;
find /app/.next -type f -exec sed -i 's|https://discord.com/invite/5DvshJqG8Z|https://pollinations.ai|g' {} \;
echo "URL replacements completed."

# Replace all instances of "Wren AI" with "Sieb"
echo "Replacing 'Wren AI' with 'Sieb'..."
# Replace in title tags
find /app/.next -type f -exec sed -i 's|<title>Wren AI</title>|<title>Sieb</title>|g' {} \;
# Replace in JavaScript title settings
find /app/.next -type f -exec sed -i 's|children:"Wren AI"|children:"Sieb"|g' {} \;
# Replace in alt text for logo
find /app/.next -type f -exec sed -i 's|alt="Wren AI"|alt="Sieb"|g' {} \;
# Replace all other text occurrences
find /app/.next -type f -exec sed -i 's|Wren AI|Sieb|g' {} \;
echo "All 'Wren AI' replacements completed."
