# 🚀 Calculateur Autopilot

Calculateur de calories pour le programme de transformation physique Autopilot.

## 📦 Déploiement sur Vercel (Méthode Simple)

### Étape 1 : Créer un compte Vercel
1. Va sur [vercel.com](https://vercel.com)
2. Clique sur "Sign Up" (Inscription)
3. Utilise ton compte GitHub, GitLab ou email

### Étape 2 : Préparer les fichiers
1. Télécharge tous les fichiers de ce dossier sur ton ordinateur
2. Crée un fichier ZIP contenant TOUS les fichiers (ou garde-les dans un dossier)

### Étape 3 : Déployer
1. Une fois connecté sur Vercel, clique sur "Add New..." → "Project"
2. Deux options :
   
   **Option A - Import de dossier (RECOMMANDÉ):**
   - Clique sur "Import Git Repository" en haut
   - Ou utilise "Deploy with Vercel CLI" si tu es à l'aise avec le terminal
   
   **Option B - Drag & Drop:**
   - Glisse-dépose simplement ton dossier dans la zone de déploiement
   - Vercel détectera automatiquement que c'est un projet Vite/React

3. Configure le projet :
   - **Framework Preset**: Vite (détecté automatiquement)
   - **Build Command**: `npm run build` (par défaut)
   - **Output Directory**: `dist` (par défaut)
   - Clique sur "Deploy"

4. Attends 1-2 minutes... et c'est en ligne ! 🎉

### Étape 4 : Récupérer ton URL
- Vercel te donne une URL automatique : `ton-projet.vercel.app`
- Tu peux personnaliser le nom dans les settings
- Tu peux aussi ajouter ton propre nom de domaine (ex: calculateur.autopilot.com)

## 🔄 Faire des modifications après déploiement

### Méthode 1 : Redéploiement manuel (Simple)
1. Modifie les fichiers en local (notamment `src/App.jsx` pour le calculateur)
2. Retourne sur Vercel → ton projet → onglet "Deployments"
3. Clique sur les 3 points → "Redeploy"
4. Ou glisse-dépose à nouveau tes fichiers modifiés

### Méthode 2 : Via GitHub (Automatique - RECOMMANDÉ)
1. Crée un repository GitHub
2. Push ton code dessus
3. Dans Vercel, connecte ton repo GitHub
4. À chaque modification pushée sur GitHub → déploiement automatique !

## 📝 Modifications courantes

### Ajouter des mentions légales
Modifie `src/App.jsx`, ajoute une section avant le disclaimer :

```jsx
{/* Mentions légales */}
<div className="text-center mt-8">
  <a href="/mentions-legales" className="text-gray-400 hover:text-white">
    Mentions légales
  </a>
</div>
```

### Ajouter un lien vers ton site
Dans `src/App.jsx`, modifie le header pour ajouter un lien :

```jsx
<div className="text-center mb-12">
  <a href="https://ton-site.com" className="text-red-500 hover:text-red-400 mb-4 inline-block">
    ← Retour au site
  </a>
  <h1>Calculateur Autopilot</h1>
</div>
```

### Modifier les couleurs
Dans `src/App.jsx`, cherche les classes Tailwind avec "red" et change-les :
- `text-red-500` → `text-blue-500`
- `bg-red-600` → `bg-blue-600`
- etc.

## 🛠 Développement en local (optionnel)

Si tu veux tester avant de déployer :

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build
```

## 📊 Ajouter Google Analytics

1. Ajoute dans `index.html` avant `</head>` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

2. Redéploie sur Vercel

## 🎨 Personnalisation du nom de domaine

1. Dans Vercel → ton projet → Settings → Domains
2. Ajoute ton domaine personnalisé
3. Configure les DNS selon les instructions Vercel

## 💡 Astuces

- **Preview deployments** : Chaque branche GitHub crée une URL de preview
- **Rollback** : Tu peux revenir à une version précédente en 1 clic
- **Variables d'environnement** : Settings → Environment Variables
- **Analytics intégré** : Vercel Analytics disponible gratuitement

## 📞 Support

Si tu as des questions sur le déploiement :
- Documentation Vercel : [vercel.com/docs](https://vercel.com/docs)
- Support Vercel : [vercel.com/support](https://vercel.com/support)

---

Créé avec ❤️ pour le programme Autopilot
