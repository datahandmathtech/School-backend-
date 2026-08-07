const fs = require('fs');

const path = 'src/pages/LogKaro.jsx';
let lines = fs.readFileSync(path, 'utf-8').split('\n');

// 1. Remove Trusted By section
const trustedStart = lines.findIndex(l => l.includes('<motion.div variants={fadeUp} className="mt-12 flex items-center gap-6 opacity-60 grayscale">'));
const trustedEnd = lines.findIndex((l, i) => i > trustedStart && l.includes('</motion.div>'));

if (trustedStart !== -1 && trustedEnd !== -1) {
  lines.splice(trustedStart, trustedEnd - trustedStart + 1);
}

// 2. Extract 4 sections
const newSectionsStart = lines.findIndex(l => l.includes('{/* --- NEW SECTIONS REQUESTED BY USER --- */}'));
const newSectionsEnd = lines.findIndex(l => l.includes('{/* 5. PREMIUM CTA SECTION */}'));

if (newSectionsStart !== -1 && newSectionsEnd !== -1) {
  const sectionsToMove = lines.splice(newSectionsStart, newSectionsEnd - newSectionsStart);
  
  // 3. Insert after Hero section
  const heroEnd = lines.findIndex(l => l.includes('{/* 2. BENTO GRID FEATURES SECTION */}'));
  if (heroEnd !== -1) {
    lines.splice(heroEnd, 0, ...sectionsToMove);
  }
}

fs.writeFileSync(path, lines.join('\n'));
console.log('Successfully updated LogKaro.jsx');
