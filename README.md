# Sentinel OSINT

Sentinel is a local-first OSINT workspace for public, permitted lookups. It does not require API keys and does not attempt authentication bypasses, mailbox probing, scraping behind bot protection, or subscriber identification.

## Features

- Universal search for usernames, email addresses, phone numbers, domains, IP addresses, and URLs.
- Local phone metadata using `libphonenumber-js`.
- IPv4/IPv6 validation and private, loopback, link-local, multicast, and public classification.
- DNS A, AAAA, MX, NS, TXT, and CNAME resolution through the server resolver.
- Public-source links for GitHub, web search, RDAP, and DNS inspection.
- Safe URL parsing with private/local destination blocking.
- Explicit live, local, unavailable, inconclusive, and demo-style evidence labels.
- Dark responsive dashboard with provider and investigation workspaces.

## Setup on Kali Linux

Requires Node.js 18.17+ (Node 20 LTS recommended).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. No database or credentials are required for the local demo. `npm run build` creates the production build and `npm test` runs validation tests.

## Deploying to Vercel

1. Push this folder to a Git provider and import the repository in Vercel.
2. Keep the framework preset as **Next.js** and use the default build command.
3. Add these environment variables if you want to override defaults:
   - `OSINT_MODE=live`
   - `PROVIDER_TIMEOUT_MS=10000`
   - `RATE_LIMIT_MAX_REQUESTS=30`
   - `RATE_LIMIT_WINDOW_SECONDS=60`
4. Deploy. No API keys, database, or custom server are required.

Saved investigations use browser `localStorage` by design. The Vercel deployment does not create accounts, cookies, server-side case storage, or a shared database. Searches are sent to the server only while they are being analyzed, and saved records remain in the browser that created them. Clearing browser storage removes them. Do not use this anonymous mode for shared casework or highly sensitive data.

## Modes and sources

DNS lookups use the operating system resolver and require internet access for live domains. Phone and IP classification are offline/local. RDAP and Certificate Transparency are represented as attributable public links so operators can manually verify them without Sentinel silently scraping or fabricating unavailable results. Public source availability and rate limits can change.

The current UI intentionally does not claim that a profile, mailbox, person, or location is confirmed from a matching identifier. Providers implement the `Finding` contract in `lib/types.ts` and are registered in `lib/providers.ts`.

## Expanded provider roadmap

The current public layer includes DNS mail/security signals (MX, SPF, DMARC, CAA), Certificate Transparency hostname observations, GitHub public profile discovery, public IP RDAP, reverse-safe URL header inspection, and provider health metadata. Search results are bounded by timeouts and do not bypass authentication, CAPTCHAs, robots restrictions, or rate limits.

For an authenticated multi-user deployment, Supabase is supported as an optional next layer. Apply [supabase/schema.sql](./supabase/schema.sql), add Supabase Auth, and keep `SUPABASE_URL` and `SUPABASE_ANON_KEY` server configuration out of client-visible logs. The default deployment remains anonymous/local and does not use this schema.

## Privacy and security

Queries are sent to the local Next.js server for analysis. Do not enter credentials, secrets, private leaked data, or sensitive personal data. Network requests are bounded and unsafe URL destinations are rejected. The app sets defensive security headers and never automatically opens suspicious URLs. This is a research aid, not proof of identity.
