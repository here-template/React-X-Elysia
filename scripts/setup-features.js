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
  console.error(`❌ Feature inconnue. Dispo: ${Object.keys(FEATURES).join(', ')}`);
  process.exit(1);
}

const feature = FEATURES[featureName];

try {
  console.log(`🚀 Fusion de la feature : ${featureName}`);
  
  // 1. Fetch
  execSync('git fetch origin', { stdio: 'ignore' });

  // 2. FUSION NATIVE (git merge)
  console.log(`🔥 Lancement du merge Git (sans commit)...`);
  
  try {
      // --no-commit : Prépare les fichiers mais ne crée pas le commit de merge
      // --no-ff : Force la création d'un merge même si on pourrait fast-forward
      // Cela va modifier tes fichiers locaux (GlassInput.tsx, etc.)
      execSync(`git merge --no-commit --no-ff origin/${feature.branch}`, { stdio: 'inherit' });
  } catch (err) {
      // C'est NORMAL d'arriver ici s'il y a des conflits (code 1)
      console.warn("⚠️  Des conflits ont été détectés lors du merge.");
      console.warn("👉 C'est normal ! Git a marqué les conflits dans tes fichiers sources.");
  }

  // 3. NETTOYAGE DES FICHIERS DE CONFIG (Annulation du merge sur package.json/lock)
  console.log(`🧹 Restauration des fichiers de config (pour gestion manuelle)...`);
  
  // On liste les fichiers qu'on ne veut JAMAIS merger via Git (car on le fait en JS)
  const filesToReset = [
      `${feature.module}/package.json`,
      'bun.lockb',
      'yarn.lock',
      'package-lock.json'
  ];

  // On remet ces fichiers à l'état HEAD (avant le merge)
  // Cela résout automatiquement les conflits sur ces fichiers en prenant "notre" version
  try {
      execSync(`git checkout HEAD -- ${filesToReset.join(' ')}`, { stdio: 'ignore' });
  } catch (e) {
      // Ignore si certains fichiers n'existent pas
  }

  // 4. FUSION DES DÉPENDANCES (Méthode JS propre)
  console.log(`📦 Injection propre des dépendances pour ${feature.module}...`);
  
  const remotePkgPath = `${feature.module}/package.json`;
  let remotePkgStr;
  try {
      remotePkgStr = execSync(`git show origin/${feature.branch}:${remotePkgPath}`, { encoding: 'utf-8' });
  } catch (e) {
      console.warn(`⚠️ Impossible de lire le package.json distant.`);
  }

  if (remotePkgStr) {
      const remotePkg = JSON.parse(remotePkgStr);
      const newDependencies = remotePkg.dependencies || {};
      
      const localPackagePath = path.resolve(__dirname, '../', feature.module, 'package.json');
      
      if (fs.existsSync(localPackagePath)) {
          const pkg = JSON.parse(fs.readFileSync(localPackagePath, 'utf-8'));

          // Fusion des dépendances
          pkg.dependencies = { ...pkg.dependencies, ...newDependencies };
          
          // Tri
          pkg.dependencies = Object.keys(pkg.dependencies).sort().reduce((acc, key) => {
              acc[key] = pkg.dependencies[key]; return acc;
          }, {});

          fs.writeFileSync(localPackagePath, JSON.stringify(pkg, null, 2));
          console.log(`✅ package.json mis à jour.`);
      }
  }

  console.log(`🎉 Feature "${featureName}" appliquée !`);
  
  // Petit check pour voir si l'utilisateur est en état de merge
  try {
      const gitStatus = execSync('git status --porcelain').toString();
      if (gitStatus.includes('UU ')) { // UU = Unmerged (Conflit)
          console.log(`⚠️  ATTENTION : Il reste des conflits de code (marqués 'UU').`);
          console.log(`👉 Ouvre VS Code, résous les conflits, puis lance 'git add .' et 'git commit'.`);
      } else {
          console.log(`👉 Lance 'bun install' puis 'git add .' et 'git commit' pour valider.`);
      }
  } catch(e) {}

} catch (error) {
  console.error('❌ Erreur critique :', error.message);
}