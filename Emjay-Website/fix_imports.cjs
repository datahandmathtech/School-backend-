const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

fs.readdirSync(componentsDir).forEach(file => {
  if (!file.endsWith('.jsx')) return;
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const regex = /\/src\/assets\/([a-zA-Z0-9_/.-]+)/g;
  const matches = [...content.matchAll(regex)];
  
  if (matches.length > 0) {
    let importStatements = [];
    let replacements = [];
    
    matches.forEach((match, index) => {
      const fullMatch = match[0]; // e.g. /src/assets/mockups/perfect_clean_hero.png
      const relativePath = match[1]; // e.g. mockups/perfect_clean_hero.png
      const varName = `imgAsset${index}`;
      
      // We are in src/components, so ../assets/
      const importPath = `../assets/${relativePath}`;
      importStatements.push(`import ${varName} from '${importPath}';`);
      
      replacements.push({
        fullMatch,
        varName
      });
    });
    
    // Deduplicate replacements (if same image used multiple times)
    // Actually, simple sequential replacement is fine.
    
    replacements.forEach(r => {
      // Replace in background images: url(/src/assets/...) -> url(${imgAsset0})
      content = content.replace(`'url(${r.fullMatch})'`, `\`url(\${${r.varName}})\``);
      // Replace in img src: "/src/assets/..." -> {imgAsset0}
      content = content.replace(`"${r.fullMatch}"`, `{${r.varName}}`);
    });
    
    // Insert imports after the last import statement or at top
    const lastImportMatch = [...content.matchAll(/^import .*;?$/gm)];
    let insertIndex = 0;
    if (lastImportMatch.length > 0) {
      const last = lastImportMatch[lastImportMatch.length - 1];
      insertIndex = last.index + last[0].length;
    } else if (content.startsWith('import ')) {
       // Just find first newline after imports
       insertIndex = content.indexOf('\n', content.lastIndexOf('import ')) + 1;
    }
    
    content = content.slice(0, insertIndex) + '\n' + importStatements.join('\n') + '\n' + content.slice(insertIndex);
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
