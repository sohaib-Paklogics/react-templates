# Environment setup (Expo)

This template uses **runtime-safe** Expo environment variables (`EXPO_PUBLIC_*`).

## Required variables

- `EXPO_PUBLIC_APP_ENV` = `development | staging | production`
- API URL (choose ONE approach):
  1) Recommended (one variable per build/profile):
     - `EXPO_PUBLIC_API_URL`
  2) Alternative (set all 3 and switch using APP_ENV):
     - `EXPO_PUBLIC_API_URL_DEV`
     - `EXPO_PUBLIC_API_URL_STAGING`
     - `EXPO_PUBLIC_API_URL_PROD`

## Optional

- `EXPO_PUBLIC_AUTH_TOKEN_KEY` (default: `access_token`)
- `EXPO_PUBLIC_ONBOARDING_PERSIST` (`1/0`, default: `1` for staging/prod, `0` for dev)

## Example (.env)

```env
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_API_URL=http://localhost:4000
EXPO_PUBLIC_AUTH_TOKEN_KEY=access_token
EXPO_PUBLIC_ONBOARDING_PERSIST=0
```

## Example (eas.json profiles)

Set env per profile (recommended):

- development: `EXPO_PUBLIC_APP_ENV=development`, `EXPO_PUBLIC_API_URL=...`
- staging: `EXPO_PUBLIC_APP_ENV=staging`, `EXPO_PUBLIC_API_URL=...`
- production: `EXPO_PUBLIC_APP_ENV=production`, `EXPO_PUBLIC_API_URL=...`
