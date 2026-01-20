This project expects Firebase client configuration to be provided via environment variables.

Create a `.env.local` file in the project root (do NOT commit it) and add the following values from the Firebase Console (Project settings > General > Your apps > Web API Key and Firebase config):

```env
# .env.local (example - do NOT commit)
NEXT_PUBLIC_FIREBASE_API_KEY=your_web_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

Notes:
- The API key must be the Web API Key from the Firebase console (not a server key or other secret).
- The `NEXT_PUBLIC_` prefix is required so Next.js exposes the variable to client-side code.
- After creating or updating `.env.local`, restart the dev server.

If you see an error like:

  "auth/api-key-not-valid.-please-pass-a-valid-api-key."

Then either the API key is missing, incorrectly copied, or you're using a placeholder value. Double-check the value in `.env.local` and restart the dev server.
