# Cabinet de Soins Infirmiers « Believe »

Site vitrine du cabinet de soins infirmiers « Believe », à Adétikopé – Amlakopé (Togo) :
présentation des services et prestations, prix des analyses, locaux, équipe, actualités santé,
demande de rendez-vous par WhatsApp, FAQ, contact et carte.

Site statique : une seule page en HTML, CSS et JavaScript, sans framework ni outil de build.

**Adresse publique :** https://cabinetbelieve.github.io/site-cabinet/

## Contenu du dépôt

| Fichier / dossier | Rôle |
|---|---|
| `index.html` | La page (contenu, référencement, données structurées) |
| `style.css` | Mise en forme (bleu/vert, mode sombre, responsive) |
| `script.js` | Menu mobile, recherche des analyses, actualités, statut ouvert/fermé, formulaire de rendez-vous |
| `images/` | Logo, icônes, image d'aperçu des réseaux sociaux, photos |
| `sitemap.xml`, `robots.txt` | Référencement |
| `.nojekyll` | Demande à GitHub Pages de publier les fichiers tels quels (sans Jekyll) |

## Publier avec GitHub Pages

1. Déposer tous les fichiers à la **racine** de la branche `main`.
2. Dépôt GitHub → **Settings → Pages** → *Build and deployment* :
   **Source : Deploy from a branch**, branche **main**, dossier **/ (root)**, puis *Save*.
3. Onglet **Actions** : attendre la fin du déploiement « pages build and deployment » (1 à 2 minutes).
4. Ouvrir https://cabinetbelieve.github.io/site-cabinet/ (si l'ancienne version s'affiche, vider le cache ou ajouter `?v=2` à l'adresse).

## Modifier le contenu

- **Numéros, WhatsApp** : `index.html` (liens `tel:`) et `script.js` (`CENTRE.whatsapp`).
- **Analyses et prix** : tableau `ANALYSES` en haut de `script.js` (nom complet, prix, mots-clés de recherche).
- **Actualités** : tableau `NEWS` en haut de `script.js`.
- **Prestations de soins** : liste « Nos prestations de soins » dans `index.html` (sans prix).
- **Photos** : remplacer les fichiers de `images/` en gardant le même nom (WebP conseillé, moins de 150 Ko chacune) :
  `facade.webp` (3:2, 1200×800), `accueil.webp` (4:3, 800×600), `responsable.webp` (carré, 480×480).
  Pour convertir : https://squoosh.app
- **Mode édition** : ouvrir la page avec `?edition` à la fin de l'adresse
  (`…/site-cabinet/?edition`) pour voir en jaune tous les champs marqués **À COMPLÉTER**.
  Dans le code, chercher « À COMPLÉTER » ou l'attribut `data-todo`.

## Champs à compléter

- Photos : façade, accueil et responsable (voir `images/`).
- Équipe : noms du personnel, si vous souhaitez les afficher (section Notre équipe).
- JSON-LD (`index.html`) : remplacer l'image par la photo réelle de la façade.

## Notes

- `robots.txt` n'est lu par les moteurs de recherche que s'il est à la racine du domaine
  (par exemple avec un nom de domaine personnalisé). Sur `cabinetbelieve.github.io/site-cabinet/`,
  soumettre plutôt `sitemap.xml` dans Google Search Console.
- Le formulaire de rendez-vous n'envoie rien tout seul : il prépare un message que le patient envoie lui-même par WhatsApp.
