# 🚀 DÉMARRAGE RAPIDE - Calculateur Autopilot

## 📥 ÉTAPE 1 : Télécharger les fichiers

Tu as déjà tous les fichiers ! Ils sont dans le dossier `calculateur-autopilot`.

## 🌐 ÉTAPE 2 : Créer un compte Vercel

1. Va sur **https://vercel.com**
2. Clique sur **"Sign Up"**
3. Choisis ton option préférée :
   - **Avec GitHub** (recommandé pour les déploiements automatiques)
   - **Avec GitLab**
   - **Avec Email**

## 🚀 ÉTAPE 3 : Déployer (2 méthodes au choix)

### MÉTHODE A : Import Git (Recommandée - Automatique)

1. **Crée un repository GitHub :**
   - Va sur github.com
   - Clique sur "New repository"
   - Nomme-le "calculateur-autopilot"
   - Clique sur "Create repository"

2. **Upload les fichiers sur GitHub :**
   - Glisse-dépose tous les fichiers du dossier dans ton repo
   - Commit les changements

3. **Dans Vercel :**
   - Clique sur "Add New..." → "Project"
   - Sélectionne "Import Git Repository"
   - Choisis ton repo "calculateur-autopilot"
   - Clique sur "Deploy"
   - ✅ C'est fait !

**Avantage :** Chaque modification sur GitHub = déploiement automatique

---

### MÉTHODE B : Vercel CLI (Drag & Drop)

1. **Ouvre ton terminal dans le dossier `calculateur-autopilot`**

2. **Installe Vercel CLI** (première fois seulement) :
   ```bash
   npm install -g vercel
   ```

3. **Déploie en une commande :**
   ```bash
   vercel
   ```

4. **Suis les instructions :**
   - Login avec ton compte Vercel
   - Confirme le nom du projet
   - Confirme les settings (tout est déjà configuré)
   - ✅ C'est déployé !

---

## 🎯 ÉTAPE 4 : Récupérer ton URL

Une fois déployé, Vercel te donne :
- Une URL automatique : **https://calculateur-autopilot.vercel.app**
- Tu peux la personnaliser dans Settings → Domains

## ✏️ MODIFIER LE SITE APRÈS DÉPLOIEMENT

### Si tu as utilisé GitHub (Méthode A) :
1. Modifie les fichiers en local
2. Push sur GitHub
3. ✅ Vercel redéploie automatiquement !

### Si tu as utilisé CLI (Méthode B) :
1. Modifie les fichiers en local
2. Lance `vercel --prod`
3. ✅ Mis à jour !

---

## 🎨 MODIFICATIONS COURANTES

### Ajouter un header avec lien vers ton site :

Dans `src/App.jsx`, après la ligne 198 (dans le `<div className="max-w-4xl mx-auto">`), ajoute :

```jsx
{/* Header avec lien retour */}
<div className="text-center mb-8">
  <a 
    href="https://ton-site-principal.com" 
    className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
  >
    ← Retour au site principal
  </a>
</div>
```

### Ajouter des mentions légales :

Avant le disclaimer final (ligne ~530), ajoute :

```jsx
{/* Liens footer */}
<div className="flex justify-center gap-6 mt-8 mb-4">
  <a href="/mentions-legales" className="text-sm text-gray-400 hover:text-white transition-colors">
    Mentions légales
  </a>
  <span className="text-gray-600">•</span>
  <a href="/cgv" className="text-sm text-gray-400 hover:text-white transition-colors">
    CGV
  </a>
  <span className="text-gray-600">•</span>
  <a href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
    Contact
  </a>
</div>
```

---

## 📊 AJOUTER GOOGLE ANALYTICS

Dans `index.html`, avant `</head>`, ajoute :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TON-ID-GA"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TON-ID-GA');
</script>
```

Remplace `TON-ID-GA` par ton vrai ID Google Analytics.

---

## 🆘 BESOIN D'AIDE ?

**Problème de déploiement :**
- Vérifie que tous les fichiers sont présents
- Lis le README.md pour plus de détails
- Consulte la doc Vercel : https://vercel.com/docs

**Questions sur le code :**
- Le calculateur est dans `src/App.jsx`
- Les styles sont avec Tailwind CSS
- Tout est commenté et expliqué

---

## ✅ CHECKLIST DÉPLOIEMENT

- [ ] Compte Vercel créé
- [ ] Fichiers téléchargés
- [ ] Projet déployé (méthode A ou B)
- [ ] URL récupérée
- [ ] Site testé en ligne
- [ ] (Optionnel) Google Analytics ajouté
- [ ] (Optionnel) Nom de domaine personnalisé

---

**C'est tout ! Ton calculateur est maintenant en ligne et accessible au monde entier ! 🎉**
