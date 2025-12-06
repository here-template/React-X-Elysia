const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FEATURES = {
  i18n: {
    module: 'frontend',
    branch: 'extras/i18n',
  },
};

const featureName = process.argv[2];

if (!FEATURES[featureName]) {
  console.error(`❌ Unknown feature. Available: ${Object.keys(FEATURES).join(', ')}`);
  process.exit(1);
}

const feature = FEATURES[featureName];

try {
  console.log(`🚀 Merging feature: ${featureName}`);

  execSync('git fetch origin', { stdio: 'ignore' });

  console.log(`🔥 Starting Git merge (no commit)...`);
  
  try {
    execSync(`git merge --no-commit --no-ff origin/${feature.branch}`, { stdio: 'inherit' });
  } catch (err) {
    console.warn("⚠️  Conflicts detected during the merge.");
    console.warn("👉 This is normal! Git has marked the conflicts in your source files.");
  }

  console.log(`🧹 Restoring config files (for manual management)...`);
  
  const filesToReset = [
    `${feature.module}/package.json`,
    'bun.lockb',
    'yarn.lock',
    'package-lock.json'
  ];

  try {
    execSync(`git checkout HEAD -- ${filesToReset.join(' ')}`, { stdio: 'ignore' });
  } catch (e) {
    // ignore missing files
  }

  console.log(`📦 Cleanly injecting dependencies for ${feature.module}...`);
  
  const remotePkgPath = `${feature.module}/package.json`;
  let remotePkgStr;
  try {
    remotePkgStr = execSync(`git show origin/${feature.branch}:${remotePkgPath}`, { encoding: 'utf-8' });
  } catch (e) {
    console.warn(`⚠️ Unable to read remote package.json.`);
  }

  if (remotePkgStr) {
    const remotePkg = JSON.parse(remotePkgStr);
    const newDependencies = remotePkg.dependencies || {};

    const localPackagePath = path.resolve(__dirname, '../', feature.module, 'package.json');

    if (fs.existsSync(localPackagePath)) {
      const pkg = JSON.parse(fs.readFileSync(localPackagePath, 'utf-8'));

      pkg.dependencies = { ...pkg.dependencies, ...newDependencies };

      pkg.dependencies = Object.keys(pkg.dependencies).sort().reduce((acc, key) => {
        acc[key] = pkg.dependencies[key]; return acc;
      }, {});

      fs.writeFileSync(localPackagePath, JSON.stringify(pkg, null, 2));
      console.log(`✅ package.json updated.`);
    }
  }

  console.log(`🎉 Feature "${featureName}" applied!`);
  
  try {
    const gitStatus = execSync('git status --porcelain').toString();
    if (gitStatus.includes('UU ')) {
      console.log(`⚠️  WARNING: There are remaining code conflicts (marked 'UU').`);
      console.log(`👉 Open VS Code, resolve the conflicts, then run 'git add .' and 'git commit'.`);
    } else {
      console.log(`👉 Run 'bun install' then 'git add .' and 'git commit' to finalize.`);
    }
  } catch(e) {}

} catch (error) {
  console.error('❌ Critical error:', error.message);
}