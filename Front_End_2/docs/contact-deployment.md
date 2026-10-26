# Consultation form on Netlify

`POST /api/contact` inserts into `dbo.Consultations` in SQL Server. A successful response is returned only after the INSERT completes.

Configure these environment variables for the **production deploy context** and **Functions runtime** in the Netlify project:

- `DB_SERVER`: reachable SQL Server hostname, not the developer computer's localhost.
- `DB_USER`, `DB_PASSWORD`: SQL login with INSERT permission on `dbo.Consultations`.
- `DB_NAME`: database containing the table defined in `database.sql`.
- `DB_PORT`: optional TCP port; defaults to 1433.

Local `.env.local` settings are not automatically copied into the Netlify environment. Redeploy after updating runtime environment variables. Never put database credentials into `NEXT_PUBLIC_*` variables or commit them to Git.

If submission fails, inspect the Netlify function log for `Contact submission failed`:

| Code | Check |
| --- | --- |
| `CONTACT_CONFIG` | Missing database variables or invalid port. |
| `CONTACT_DATABASE` | SQL authentication, TCP reachability, database availability and firewall rules for the deployed function. Driver codes such as ELOGIN, ESOCKET or ETIMEOUT narrow down the failure. |
| `CONTACT_SCHEMA` | `dbo.Consultations` is missing from the configured database. |
| `CONTACT_SAVE` | SQL INSERT permissions, constraints or other server errors. |

Use the provider's supported network access configuration; do not disable the database firewall as a workaround. A successful database connection from a developer laptop does not prove that a Netlify function can reach the database.

Verification without storing customer data: POST `{}` should return 400. Local input regression checks: `node --test tests/contact-input.test.mjs`.
