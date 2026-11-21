# Academic homepage — Civil / Transportation Engineering PhD

A professional one-page academic website. Works on phones, tablets and laptops, has a light/dark mode, and needs no build tools.

## 1. Put in her real information (5–10 minutes)

Open **`js/content.js`** in any text editor (Notepad works) and replace the sample text:

| Section in the file | What to put there |
|---|---|
| `profile` | Name, title, university, lab, advisor, city, email, and links to Google Scholar / ORCID / LinkedIn (set a link to `""` to hide it). `route` is the line of degrees under her name. |
| `about`, `interests` | 2 short paragraphs about her, and her research interests |
| `news` | Dated updates, newest first, e.g. paper accepted, conference talk, award |
| `research` | 3–4 research areas. Icons come from [fontawesome.com/icons](https://fontawesome.com/search?ic=free) |
| `publications` | Papers. `featured: true` shows the paper as a highlighted card |
| `education`, `experience` | B.S., M.S. and Ph.D., plus jobs and assistantships |
| `skills`, `awards`, `teaching`, `service` | Self-explanatory lists |

Her real details (name, degrees, jobs, email, LinkedIn) are already filled in. Empty lists such as `news`, `research`, `publications` and `awards` hide their section; add an item and the section appears by itself.

## 2. Add her photo and CV

Put these two files in the **`assets`** folder:
- `photo.jpg`: a square headshot, ideally 600×600 px or larger
- `cv.pdf`: her CV

`photo.jpg` is already in place. Until `cv.pdf` is added, the "Download CV" button stays hidden.

## 3. Preview it on your computer

Double-clicking `index.html` works. Some features, such as copying citations, work best through a local server:

```powershell
python -m http.server 5520
```

Then open http://localhost:5520.

## 4. Put it online (free)

**Option A: GitHub Pages** (gives an address like `username.github.io`)
1. Create a free account at github.com. Then create a repository named `username.github.io`, using her username.
2. Upload all the files in this folder, keeping the `css`, `js` and `assets` folders.
3. In the repository, go to **Settings → Pages**, choose branch `main`, and save. The site goes live within a minute or two.

**Option B: Netlify Drop**
Go to app.netlify.com/drop and drag this whole folder onto the page. A custom domain such as `herName.com` can be connected later in either option.

## Files

```
index.html        page layout (rarely needs editing)
css/style.css     design: colors, fonts and spacing (the colors are at the top)
js/content.js     ← ALL the text. Edit this one.
js/main.js        builds the page from content.js
assets/           photo, cv.pdf, and hero-bridge.jpg (header photo by Mo on Unsplash, Unsplash License)
```
