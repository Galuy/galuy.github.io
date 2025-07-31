#!/usr/bin/env node

/**
 * Feature Validation Script
 * Checks that critical features are still present in the codebase
 */

const fs = require("fs");
const path = require("path");

const CRITICAL_FEATURES = [
  {
    name: "Real-time listeners in Home",
    file: "src/pages/Home.jsx",
    pattern: /onSnapshot/,
    description: "Home must have real-time personal and shared notes listeners",
  },
  {
    name: "SuperAdmin role check in Home",
    file: "src/pages/Home.jsx",
    pattern: /SuperAdmin/,
    description: "Home must preserve SuperAdmin functionality",
  },
  {
    name: "Note creation functionality in Home",
    file: "src/pages/Home.jsx",
    pattern: /handleAddNote|addDoc/,
    description: "Home must allow creating personal and shared notes",
  },
  {
    name: "Community shared notes functionality",
    file: "src/pages/Community.jsx",
    pattern: /handleAddSharedNote/,
    description: "Community page must allow adding shared notes",
  },
  {
    name: "Authentication context",
    file: "src/App.jsx",
    pattern: /AuthContext|UserContext/,
    description: "App must maintain authentication context",
  },
  {
    name: "Firebase configuration",
    file: "src/firebase.js",
    pattern: /initializeApp/,
    description: "Firebase configuration must be present",
  },
  {
    name: "Real-time cleanup in useEffect",
    file: "src/pages/Home.jsx",
    pattern: /unsubscribe|unsubPersonalNotes|unsubSharedNotes/,
    description: "Home must properly cleanup real-time listeners",
  },
  {
    name: "Note page exists",
    file: "src/pages/Note.jsx",
    pattern: /function Note|export.*Note/,
    description: "Note page component must exist",
  },
  {
    name: "Reaction system",
    file: "src/pages/Home.jsx",
    pattern: /reaction|like|heart/i,
    description: "Home page must maintain note reactions",
  },
  {
    name: "Communities link in Navigation",
    file: "src/App.jsx",
    pattern: /comunità|communities/i,
    description: "App must link to Communities page",
  },
  {
    name: "Note filtering functionality",
    file: "src/pages/Home.jsx",
    pattern: /filterType|filter.*notes/i,
    description: "Home must provide note filtering capabilities",
  },
  {
    name: "Note attribution system",
    file: "src/components/NewNoteForm.jsx",
    pattern: /attribution.*Type|pseudonym|eteronym|anonymous/i,
    description:
      "NewNoteForm must support note attribution (self, other, pseudonym, eteronym, anonymous)",
  },
  {
    name: "Attribution display in NoteCard",
    file: "src/components/NoteCard.jsx",
    pattern: /formatAttribution|attribution/i,
    description: "NoteCard must display attribution information",
  },
];

let allPassed = true;

console.log("🔍 Validating critical features...\n");

for (const feature of CRITICAL_FEATURES) {
  const filePath = path.join(process.cwd(), feature.file);

  if (!fs.existsSync(filePath)) {
    console.log(`❌ MISSING FILE: ${feature.file}`);
    console.log(`   Required for: ${feature.description}\n`);
    allPassed = false;
    continue;
  }

  const content = fs.readFileSync(filePath, "utf8");

  if (!feature.pattern.test(content)) {
    console.log(`❌ MISSING FEATURE: ${feature.name}`);
    console.log(`   File: ${feature.file}`);
    console.log(`   Description: ${feature.description}\n`);
    allPassed = false;
  } else {
    console.log(`✅ ${feature.name}`);
  }
}

if (allPassed) {
  console.log("\n🎉 All critical features are present!");
  process.exit(0);
} else {
  console.log("\n🚨 CRITICAL FEATURES MISSING!");
  console.log("📋 Please review FEATURES.md and restore missing functionality");
  console.log("🔧 Run: npm run features");
  process.exit(1);
}
