# 🔧 Guide Administrateur — Partia

> Interface backend · Production : `https://partia-backend-production.up.railway.app/admin`  
> Identifiants privés : `ADMIN_EMAIL` / `ADMIN_PASSWORD` dans Railway

---

## Connexion

1. Ouvrir l’URL de production ci-dessus, ou `http://localhost:3000/admin` en local
2. Saisir l'email et le mot de passe admin
3. La session est conservée dans un cookie signé HttpOnly/Secure/Strict et expire après 12 heures

La signature utilise `ADMIN_JWT_SECRET`, distinct de `JWT_SECRET`. Les onglets Santé et Requêtes sont eux aussi protégés.

---

## Onglet 👥 Utilisateurs

Vue complète de tous les comptes inscrits.

**Colonnes :** ID · Prénom · Email · Ville · Créneaux créés · Participations · Notes reçues · Signalements · Inscrit le · Actions

**Filtres disponibles :**
- Barre de recherche : filtre sur n'importe quelle colonne (nom, email, ville…)
- Dropdown : Tous / Actifs / Bannis / Premium / Signalés
- Clic sur un en-tête de colonne : tri croissant / décroissant ▲▼

**Détail utilisateur** (clic sur une ligne) :
- Email, ville, genre, créneaux, participations, notes reçues
- **Badges reçus** : compteurs par badge (⏰ Ponctuel, ✅ Fiable, 🏅 Bon joueur, 😊 Cool, 🤝 Fairplay)
- Signalements reçus / émis
- Statut (Actif / Banni)
- Niveau Free / Premium / Premium+
- **Bouton Bannir / Débannir**
- **Boutons 🆓 Free / ⭐ Premium / 🚀 Premium+**
- **Bouton 🗑️ Supprimer définitivement** avec confirmation par l’adresse e-mail exacte

**Bannir un utilisateur :**
- Depuis le modal de détail **ou** directement depuis la colonne Actions
- Un user banni reste visible mais ne peut plus se connecter

**Changer le niveau :**
- Depuis le modal de détail → bouton Free, Premium ou Premium+
- Le badge ⭐ apparaît sur le profil de l'utilisateur dans l'app au prochain chargement
- Au lancement Google Play, Premium et Premium+ ne sont pas vendus : cette action constitue une attribution gratuite et manuelle réservée aux tests, démonstrations ou décisions administratives.

---

## Onglet 📅 Créneaux

Vue de tous les créneaux (200 derniers).

**Colonnes :** ID · Sport · Titre/Zone · Date · Créateur · Participants (profils) · Places · Statut · Signalements · Créé le

**Filtres :** recherche libre + dropdown (Tous / À venir / Passés / Complets / Signalés)

**Détail créneau** (clic sur une ligne) : sport, zone, date, durée, places, mode, créateur, participants et signalements.

Un enfant est affiché sous la forme `Prénom (enfant de Parent)`. Si un parent et son enfant de 15–17 ans autorisé rejoignent le même créneau adulte tiers, ils occupent deux places et apparaissent séparément. Les enfants de 3–14 ans restent limités aux créneaux de leur tranche d’âge. Les présences, désinscriptions, notations et badges restent propres à chaque profil, mais le parent demeure l’unique titulaire responsable du compte. Toute sanction administrative vise donc le compte adulte.

---

## Onglet 🚩 Modération

Gestion des signalements.

**Sous-onglets :** Tous · 🔴 Ouverts · ✅ Traités · ⬜ Ignorés

**Colonne Banni?** : affiche le statut ban du signalé + bouton Bannir/Débannir directement sur la ligne

**Actions par signalement :**
- **✅** → marquer Traité
- **⬜** → Ignorer
- **🔴** → Rouvrir

**Signalements multiples :** badge rouge indiquant le nombre total de signalements reçus par l'utilisateur signalé.

Lorsqu’un signalement vient du chat, la ligne affiche également le contenu précis du message concerné. Vérifier cet extrait, le motif, la description et le contexte avant de classer le dossier ou de bannir le compte.

Le blocage entre membres est distinct de la modération administrative : il masque immédiatement leurs messages et créneaux Explorer respectifs et empêche une nouvelle participation entre eux. Il ne bannit aucun compte. Chaque membre gère ses déblocages depuis son propre profil.

---

## Onglet 🚫 Blocages

Cette vue affiche les 200 blocages actifs les plus récents avec le bloqueur, l’utilisateur bloqué et la date. La navigation et la tuile de synthèse indiquent le nombre total de relations actives.

La fiche d’un utilisateur affiche aussi :

- le nombre de blocages qu’il a effectués ;
- le nombre de blocages qu’il a reçus.

Ces informations servent à repérer une situation répétée, mais un blocage ne constitue pas automatiquement un signalement ni une preuve justifiant une sanction.

---

## Onglet 🔍 Requêtes SQL

Requêtes prédéfinies, exécutables en un clic. Aucun SQL libre possible.

| Requête | Description |
|---|---|
| 👤 10 derniers inscrits | Derniers comptes créés |
| 📅 Créneaux cette semaine | Créneaux des 7 prochains jours |
| 🚩 Users les plus signalés | Classement par nb de signalements reçus |
| 🏃 Users actifs (30j) | Utilisateurs avec activité récente |
| 🏅 Sports les plus pratiqués | Classement des sports par nb créneaux/participants |
| 🔴 Signalements ouverts | Détail complet des signalements non traités |
| 🔒 Créneaux complets à venir | Créneaux full qui ne peuvent plus être rejoints |
| ⭐ Notations (7 derniers jours) | Activité de notation récente avec badges |

Les résultats s'affichent en tableau sous les boutons. Valeurs `1/true` → ✅, `0/false` → ❌.

---

## Onglet 🟢 Santé

Monitoring du système à la demande.

**Tuiles :** Dernier statut · Uptime % · Réponse moyenne

**Bouton ▶️ Lancer le diagnostic** — exécute automatiquement :

| Test | Ce qui est vérifié |
|---|---|
| DB ping | MySQL répond |
| DB metrics | Compteurs users actifs, créneaux ouverts, notations, signalements |
| GET /health | Endpoint serveur répond + status ok |
| GET /api/sports | Liste sports non vide |
| POST /api/auth/login | Login du compte smoke privé → token reçu |
| GET /api/users/me | Retourne l'user avec champ `premium` |
| GET /api/creneaux | Liste accessible |
| GET /api/creneaux/mine | Retourne created + joined |
| GET /api/creneaux/history | Historique accessible |
| GET /api/notations/badges/1 | Badges avec fairplay |
| GET /api/children | Liste enfants accessible |
| GET /api/users/me (no token) | Doit retourner 401 |

**Statuts :**
- 🟢 `ok` — tout passe
- 🟡 `degraded` — DB ok mais ≥1 test échoué
- 🔴 `down` — DB inaccessible

**⚠️ Voir détail** (sur une ligne dégradée) : modal avec ✅/❌ par test, message d'erreur et temps de réponse.

> À lancer avant/après chaque session de développement ou modification backend.

---

## Procédures courantes

### Bannir un utilisateur suite à signalement
1. Onglet **🚩 Modération** → ligne du signalement concerné ; si un message est joint, lire son contenu
2. Colonne **Banni?** → clic **🚫 Bannir**
3. Marquer le signalement **✅ Traité**

### Supprimer un compte après une demande par e-mail

1. Vérifier que la demande provient de l’adresse associée au compte ; ne jamais demander le mot de passe.
2. Onglet **👥 Utilisateurs** → rechercher l’adresse → ouvrir la fiche.
3. Cliquer **🗑️ Supprimer définitivement**.
4. Confirmer l’avertissement puis saisir exactement l’adresse e-mail du compte.
5. Vérifier la disparition du compte et la ligne créée dans le journal des suppressions.

Les créneaux futurs du compte disparaissent de « À venir » et les participants sont notifiés après le succès. Les créneaux passés disparaissent aussi des historiques liés. Ne jamais effectuer un `DELETE FROM users` manuel.

### Vérifier la santé après un déploiement
1. Onglet **🟢 Santé** → **▶️ Lancer le diagnostic**
2. Tous les tests doivent être ✅ et statut 🟢 ok
3. Si un test ❌ → consulter le détail, corriger le bug, relancer

### Changer le niveau d’un utilisateur
1. Onglet **👥 Utilisateurs** → clic sur la ligne
2. Modal → choisir **Free**, **Premium** ou **Premium+**
3. L'utilisateur doit rouvrir l'app (ou naviguer sur l'écran Profil) pour voir le badge

### Consulter l'activité récente
1. Onglet **🔍 Requêtes** → **🏃 Users actifs (30j)** ou **⭐ Notations (7 derniers jours)**

---

## Structure des fichiers admin

```
partia-backend/
├── src/
│   ├── routes/
│   │   ├── admin.js      ← Interface web HTML (cookie auth)
│   │   ├── health.js     ← Routes /admin/health/run + /logs
│   │   └── query.js      ← Routes /admin/query/:key
│   └── app.js            ← Montage des routes admin
├── migrations/
│   ├── MIGRATION_USER_PREMIUM.sql
│   └── MIGRATION_HEALTH_LOGS.sql
└── .env                  ← variables locales, jamais committées
```

---

*Dernière mise à jour : 28 juillet 2026*
---

## Monitoring Sentry (Production)

Sentry capture automatiquement toutes les crashs et erreurs JS non-gérées de l'app mobile.

**Dashboard :** [sentry.io](https://sentry.io) → projet **partia-app**

### Ce que Sentry capture
- Crashs natifs et erreurs JavaScript non-catchées
- Stack trace complète avec fichier + ligne
- Infos device : OS, version app, modèle
- Environnement et version de la build

### Configuration
- DSN et plugin configurés dans les fichiers Expo prévus, sans publier de token d’authentification

### Workflow crash en prod
1. Sentry reçoit l'erreur automatiquement
2. Email d'alerte si configuré (Settings → Alerts)
3. Consulter le détail : stack trace, fréquence, users impactés
4. Corriger le bug → déployer → marquer l'issue **Resolved** sur Sentry

> Sentry est complémentaire au diagnostic admin : le diagnostic vérifie que le backend répond, Sentry capture ce qui crashe côté app.
