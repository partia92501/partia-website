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

Les pages juridiques principales sont accessibles sans connexion sur GitHub Pages :

- `https://partia92501.github.io/partia-website/privacy.html?lang=fr`
- `https://partia92501.github.io/partia-website/delete-account.html?lang=fr`

GitHub Pages est l'hébergement public principal communiqué aux utilisateurs et à Google Play depuis le 2026-09-01 (bascule décidée après une suspension du site sur le nouveau modèle à crédits mutualisés de Netlify — voir mémoire `partia_netlify_no_build_credit`). Netlify (`partia-website.netlify.app`) n'est plus utilisé.

Ces deux URL doivent être renseignées dans Google Play Console, respectivement pour la politique de confidentialité et la suppression de compte.
