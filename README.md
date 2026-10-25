# nitheesh920.qd.je

Personal portfolio for **Chalumuri Nitheesh Purnanand**, built as a **Phineas and Ferb**
themed page: triangle-headed kids, a rollercoaster, "-inator" project names, and an
Agent P night mode.

Live on **GitHub Pages** at <http://nitheesh920.qd.je> (custom domain), with the repo at
<https://github.com/Nitheesh-Purnanand/Nitheesh-Purnanand.github.io>.

No framework, no build step, no `npm install`. Four files:

| File | What it is |
| --- | --- |
| `index.html` | All the content: hero, projects, experience, skills, education, contact. |
| `styles.css` | The whole look. Palette lives in the `:root` block at the top. |
| `script.js` | Agent P mode, scroll reveals, the Perry button, copyright year. |
| `CNAME` | Tells GitHub Pages which domain to answer on. Do not delete it. |

Drawing is done with inline SVG (Phineas, Ferb, Perry, the rollercoaster, the
Doofenshmirtz tower), so there are no image files to manage.

---

## Editing the content

Open the folder:

```powershell
cd C:\Users\HP\Downloads\nitheesh920-site
code .
```

Then edit `index.html`. The sections are commented:

| Section | Anchor | Theme name |
| --- | --- | --- |
| Intro / hero | `#top` | "Hey, Ferb, I know what we're gonna build today!" |
| About | `#idea` | Today's big idea |
| Projects | `#inventions` | The -inator files |
| Experience | `#missions` | Field missions |
| Skills | `#gadgets` | Agent P's gadget belt |
| Education | `#school` | Summer school report card |
| Contact | `#contact` | Call the agency |

Changing a colour is a one-line edit: the palette at the top of `styles.css`.

```css
--sun:    #FFC93C;   /* ribbon, badges, highlights */
--orange: #F4732A;   /* Phineas' hair, primary buttons */
--teal:   #00A6A6;   /* Perry, section accents */
--grass:  #66C46B;   /* the hills under the hero */
```

Two things are deliberately left out of the HTML: your **phone number** (public pages
collect spam) and any address detail beyond the city. If you want the number on the page,
add it inside the `.contact__links` block in `index.html`.

### The link preview image

`og-image.png` is the 1200×630 card that shows up when the link is shared on Discord,
Slack, WhatsApp or LinkedIn. It is a screenshot of this page's hero, so it drifts out of
date if you change the headline. To regenerate it after edits, open the page in a browser
at 1600×840 with the zoom set so the output is 1200×630, or re-render headlessly:

```powershell
# hide the sections below the hero first, then screenshot
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu `
  --hide-scrollbars --force-device-scale-factor=0.75 --window-size=1600,840 `
  --virtual-time-budget=6000 --screenshot="og-image.png" "file:///$PWD/_card.html"
```

Where `_card.html` is a copy of `index.html` with `.gag, main > .section, .footer` hidden.

## Preview locally

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>. Or install the **Live Server** VS Code extension and
right-click `index.html` → *Open with Live Server*.

Do not judge the page by double-clicking `index.html`; the `file://` protocol breaks some
browser behaviour.

## Publish a change

```powershell
git add -A
git commit -m "update projects"
git push
```

GitHub rebuilds in about a minute. Hard refresh (`Ctrl+Shift+R`) if the old page sticks.

---

## How the hosting works

```
Browser  →  DNS: where is nitheesh920.qd.je?
             ↓
        DigitalPlat DNS  ──A records──►  185.199.108–111.153  (GitHub Pages servers)
             ↓
        GitHub Pages serves index.html from the CNAME in this repo, over HTTPS
```

* **DigitalPlat** (where the domain is registered) only holds DNS records. It does not
  store the website.
* **GitHub** stores the files and serves them.

### DNS records at DigitalPlat

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `nitheesh-purnanand.github.io.` |

The trailing dot on the CNAME matters: without it the panel appends the zone and you end
up with `nitheesh-purnanand.github.io.nitheesh920.qd.je`, which resolves to nothing.

Leave the two `NS` records alone.

Check it with:

```powershell
powershell -ExecutionPolicy Bypass -File .\check-dns.ps1
```

### HTTPS

GitHub issues a free Let's Encrypt certificate after DNS resolves, then you can tick
**Enforce HTTPS** in the repo's *Settings → Pages*. That can take from a few minutes to a
few hours to settle.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| "Domain does not resolve" | A records missing or propagating. Run the check script. |
| 404 at the domain | `CNAME` file deleted from the repo, or Pages source set to another branch. |
| Changes not showing | Hard refresh, or check the Actions tab for a failed Pages build. |
| "Not secure" warning | Certificate not issued yet. Fix DNS first, then wait. |
| HTTPS never arrives, API says "The certificate does not exist yet" | Check `www` resolves. GitHub issues one certificate covering the apex **and** `www`, so a dangling `www` CNAME (for example `nitheesh-purnanand.github.io.nitheesh920.qd.je`) can stall issuance. Point it at `nitheesh-purnanand.github.io.` with the trailing dot. |
| Fonts look like Times New Roman | Google Fonts blocked offline; the site still works with fallback fonts. |
