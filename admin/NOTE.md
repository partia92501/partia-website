# Admin Panel

L’interface admin est rendue côté serveur par `partia-backend/src/routes/admin.js`. Aucun build séparé n’est nécessaire.

- Production : `https://partia-backend-production.up.railway.app/admin`
- Local : `http://localhost:3000/admin`
- Identifiants : variables privées `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- Signature de session : variable distincte `ADMIN_JWT_SECRET`

Le cookie de session est HttpOnly, Secure en production, SameSite Strict et expire après 12 heures. `/admin/health` et `/admin/query` exigent la même authentification. Ne jamais placer les valeurs réelles des variables dans ce dépôt.
