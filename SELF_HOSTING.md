# Nefor self-hosting

This fork runs Dub as an internal service:

- dashboard: `https://qr.nefor.vip`;
- short links and QR redirects: `https://qrlink.nefor.vip`;
- access: GitHub OAuth or email, restricted to `@nefor.vip`;
- billing: disabled; new workspaces receive the Enterprise feature limits;
- runtime: Coolify Compose using a prebuilt GHCR image;
- state: MySQL and Redis volumes, plus daily compressed MySQL backups;
- analytics/workflows/storage: Tinybird, QStash, and Cloudflare R2.

Production secrets belong in `/opt/.secrets/dub-nefor.env` and in Coolify's
environment. Do not commit them. Copy the names from `.env.self-hosted.example`.

The application container is capped at 1.5 GiB and 1 CPU. MySQL is capped at
768 MiB and 0.5 CPU; Redis and its HTTP bridge at 128 MiB and 0.25 CPU each.
The backup worker receives 96 MiB and 0.1 CPU. Building happens in GitHub
Actions, not on the production host.

Before deployment:

1. Create the GitHub OAuth app with callback
   `https://qr.nefor.vip/api/auth/callback/github`.
2. Create Tinybird and QStash projects and copy their production credentials.
3. Create public/private R2 buckets and S3 API credentials.
4. Create the `qr@nefor.vip` Mailcow mailbox.
5. Add both proxied DNS records and enable Cloudflare visitor-location headers.
6. Create a Coolify Docker Compose resource from `compose.self-hosted.yaml`,
   attach `https://qr.nefor.vip` to the `app` service, and deploy `latest`.

