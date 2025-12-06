import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const FEATURES = {
  i18n: {
    files: ['src/lib/i18n.ts', 'src/locales'],
    branch: 'extras/i18n',
    dependencies: {
      "i18next": "^23.7.16",
    }
  },
};

const featureName = process.argv[2];

if (!FEATURES[featureName]) {
  console.error(`❌ Unknown feature "${featureName}". Available: ${Object.keys(FEATURES).join(', ')}`);
  process.exit(1);
}

const feature = FEATURES[featureName];

try {
  console.log(`🚀 Installing feature: ${featureName}`);

  execSync('git fetch origin', { stdio: 'ignore' });
  
  console.log(`📂 Retrieving files from ${feature.branch}...`);
  const fileList = feature.files.join(' ');
  execSync(`git checkout origin/${feature.branch} -- ${fileList}`, { stdio: 'inherit' });

  console.log('📦 Updating package.json...');
  const packagePath = path.resolve(__dirname, '../package.json');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

  pkg.dependencies = {
    ...pkg.dependencies,
    ...feature.dependencies
  };

  pkg.dependencies = Object.keys(pkg.dependencies)
    .sort()
    .reduce((acc, key) => {
      acc[key] = pkg.dependencies[key];
      return acc;
    }, {});

  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
  
  console.log(`✅ Feature "${featureName}" installed!`);
  console.log(`👉 Run 'bun install' to finish.`);

} catch (error) {
  console.error('❌ Error during installation:', error.message);
}