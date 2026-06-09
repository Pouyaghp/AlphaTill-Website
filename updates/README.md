# /updates/ — AlphaTill self-hosted update feed

This folder is the update server for the AlphaTill desktop app. Installed copies
check `https://www.alphatill.store/updates/latest.yml` on launch and from
**Admin → Settings → Software updates → Check for updates**.

`index.html` is the human-facing download page — it reads `latest.yml` automatically
and shows the newest version + download button, so you don't edit it per release.

## Publishing a new release

In the **AlphaTill program** folder (not this website):

1. First time only: `npm install`
2. Bump the version in `package.json` (e.g. `0.1.0` → `0.1.1`).
3. `npm run dist` — this writes three files into `dist/`:
   - `AlphaTill Setup X.Y.Z.exe`
   - `AlphaTill Setup X.Y.Z.exe.blockmap`
   - `latest.yml`

Then copy those **three files into this `updates/` folder** and deploy the website:

```powershell
# from the website folder
copy "..\AlphaTill\dist\AlphaTill Setup X.Y.Z.exe"          updates\
copy "..\AlphaTill\dist\AlphaTill Setup X.Y.Z.exe.blockmap" updates\
copy "..\AlphaTill\dist\latest.yml"                          updates\
git add updates
git commit -m "Release X.Y.Z"
git push
```

Vercel redeploys automatically and the new version is live at
`https://www.alphatill.store/updates/`. Every client picks it up on next launch.

## Keep only what you need
You don't have to keep every old `.exe` here. Keep at least the **current**
`latest.yml`, `.exe` and `.exe.blockmap`. Keeping the previous version's files too
lets electron-updater do faster differential (delta) downloads.

## Requirements (already handled)
- Served over HTTPS ✓ (Vercel)
- `latest.yml` served fresh, installers cached long ✓ (see `../vercel.json`)
- `https://www.alphatill.store/updates/latest.yml` must open/download directly ✓

## ⚠️ Note on hosting large installers via Git/Vercel
Vercel deploys whatever is committed to the repo, so the `.exe` gets pushed through
git. Installers are large (tens of MB) and bloat the repo over time. If that becomes
a problem, options are:
- Use **Git LFS** for `updates/*.exe`, or
- Host the installers on object storage (e.g. Vercel Blob, Cloudflare R2, S3) and
  point `latest.yml`'s URL at that bucket, keeping only `latest.yml` here.
For occasional releases, committing directly is fine to start.
