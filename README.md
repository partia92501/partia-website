# Partia — Website

Site vitrine statique multilingue de Partia. Le backend et l’application mobile vivent dans les dossiers voisins.

| Dossier | Rôle |
|---|---|
| `partia-app/` | application React Native / Expo |
| `partia-backend/` | API Node/Express, dashboard admin et MySQL Railway |
| `partia-website/` | site vitrine statique |

## Contenu

```text
partia-website/
├── index.html              site vitrine FR/SK/EN
├── privacy.html            politique de confidentialité publique FR/SK/EN
├── delete-account.html     procédure publique de suppression de compte FR/SK/EN
├── assets/legal.css        styles communs des pages juridiques
├── assets/legal.js         sélection de langue des pages juridiques
├── admin/NOTE.md           emplacement et sécurité du dashboard
└── docs/
    ├── GUIDE_ADMIN.md
    └── GUIDE_UTILISATEUR.md
```

Le dashboard n’est pas construit dans ce dépôt : il est rendu par `partia-backend/src/routes/admin.js` à l’adresse `https://partia-backend-production.up.railway.app/admin`.

Les identifiants admin restent exclusivement dans les variables Railway. La session admin est un cookie JWT signé valable 12 heures ; les pages santé et requêtes sont protégées.

Le site vitrine peut être prévisualisé en ouvrant `index.html`. Toute fonctionnalité web qui appelle l’API doit avoir son origine exacte ajoutée à `CORS_ORIGINS` sur Railway.

Les pages juridiques principales sont accessibles sans connexion sur Netlify :

- `https://partia-website.netlify.app/privacy.html?lang=fr`
- `https://partia-website.netlify.app/delete-account.html?lang=fr`

Netlify est l'hébergement public principal communiqué aux utilisateurs et à Google Play. GitHub Pages reste une copie de secours.

Ces deux URL doivent être renseignées dans Google Play Console, respectivement pour la politique de confidentialité et la suppression de compte.
