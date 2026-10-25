# nitheesh920.qd.je

Personal site, hosted free on **GitHub Pages** and served on the custom domain
**nitheesh920.qd.je**.

No build step, no framework, no `npm install`. It is three files:

| File | What it is |
| --- | --- |
| `index.html` | All the text and structure. Start here. |
| `styles.css` | Colours, fonts, spacing. The `:root` block at the top is your palette. |
| `script.js` | Dark-mode toggle and the auto-updating copyright year. |

`CNAME` tells GitHub Pages which domain to answer on. Do not delete it.

> **Status:** the site is deployed and GitHub is already answering on
> `nitheesh920.qd.je` (verified by sending a request to GitHub's page servers with that
> hostname). The only thing missing is the DNS records at DigitalPlat — see
> [DNS records](#dns-records-that-must-exist-at-digitalplat) below.

---

## 0. Check whether go-live is done

```powershell
cd C:\Users\HP\Downloads\nitheesh920-site
powershell -ExecutionPolicy Bypass -File .\check-dns.ps1
```

It reports A records, the `www` CNAME, and whether HTTPS is answering yet.

---

## 1. Edit it in VS Code

Open the folder:

```powershell
cd C:\Users\HP\Downloads\nitheesh920-site
code .
```

Then just edit `index.html`. Text lives between tags:

```html
<h1>Hi, I'm Nitheesh.</h1>
```

Change the words between `>` and `<`, save with `Ctrl+S`, and you are done.

## 2. Preview locally before publishing

**Option A — VS Code Live Server (recommended)**

1. Extensions panel (`Ctrl+Shift+X`) → install **Live Server** by Ritwick Dey.
2. Right-click `index.html` → **Open with Live Server**.
3. It opens `http://127.0.0.1:5500` and reloads on every save.

**Option B — no extension**

```powershell
cd C:\Users\HP\Downloads\nitheesh920-site
python -m http.server 8000
```

Then open <http://localhost:8000>.

> Don't judge the site by double-clicking `index.html`. Opening via `file://` breaks some
> things; use one of the two options above.

## 3. Publish a change

Every push to `main` redeploys the site. Takes about 30 to 60 seconds.

```powershell
cd C:\Users\HP\Downloads\nitheesh920-site
git add -A
git commit -m "update homepage text"
git push
```

Watch the deploy at <https://github.com/Nitheesh-Purnanand/Nitheesh-Purnanand.github.io/actions>.

---

## How the hosting actually works

```
Your browser
    │  asks DNS: where is nitheesh920.qd.je?
    ▼
DigitalPlat DNS  ──A records──►  185.199.108-111.153   (GitHub's page servers)
    │
    ▼
GitHub Pages reads the CNAME file, serves index.html over HTTPS
```

Two accounts involved:

1. **DigitalPlat** (where you bought the domain) only answers "which server is this
   domain?" via DNS records. It does not store your website.
2. **GitHub** stores the files and serves them.

### DNS records that must exist at DigitalPlat

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |
| CNAME | `www` | `nitheesh-purnanand.github.io` | 3600 |

Leave the two existing `NS` records alone.

Verify from a terminal:

```powershell
nslookup nitheesh920.qd.je 8.8.8.8
```

You want four GitHub IPs back, not "non-existent domain".

### HTTPS

GitHub issues a free Let's Encrypt certificate once DNS resolves. In
**Settings → Pages**, wait for the certificate to appear, then tick **Enforce HTTPS**.
This can take anywhere from 5 minutes to a few hours after DNS is correct.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| "Domain does not resolve" | A records missing or still propagating. Check with the `nslookup` above. |
| 404 at the domain | CNAME file missing from the repo, or Pages source set to the wrong branch. |
| Works without `www`, fails with it | Missing `www` CNAME record. |
| Changes not showing | Hard refresh (`Ctrl+Shift+R`), or check the Actions tab for a failed run. |
| "Not secure" warning | Certificate not issued yet. DNS first, then wait. |

---

## Replacing this with a framework later

You do not need to. But if you ever want React, Vite, Astro, etc., the deploy becomes
"build the site, publish the `dist/` folder". GitHub Pages supports that through a
GitHub Actions workflow, and the domain setup above stays exactly the same.
