# M Taha Amin — Portfolio

A responsive, static portfolio for M Taha Amin, a student, web developer, AI explorer and visual creator in Islamabad. Built with semantic HTML, CSS and vanilla JavaScript for GitHub Pages.

## Preview locally

Open `index.html` in a browser, or serve the folder with any static file server. For example, with Python installed:

```powershell
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Project structure

```text
index.html       Homepage and page metadata
style.css        Design system, responsive layouts and motion
script.js        Navigation, project dialogs, gallery lightbox and interactions
projects.js      Project and gallery content
favicon.svg      MTA monogram favicon
images/          Supplied portrait, project previews and interface study
```

## Update the portfolio

### Add or edit a project

Edit the `window.portfolioProjects` array in `projects.js`. Each entry has a name, category, factual description, preview image path and alt text, technologies, and source repository URL. Add a `preview` property only after confirming a working demo; the live-preview button stays hidden without it. Place any new project screenshots in `images/` and use relative paths.

### Update creative work

Edit `window.portfolioGallery` in `projects.js` to add an image path, category, meaningful alt text and a factual caption. Add the image to `images/`. The image viewer supports keyboard arrows when more than one item is present.

### Replace the portrait or add creative assets

Replace `images/main.png` with the portrait you want to use, keeping the same path or updating `index.html`. The current gallery has one supplied interface study; no sketch or science-project images were included. Add those assets before describing or displaying them.

### Add a CV

No CV PDF was present in the supplied files. Add the real PDF (for example, `documents/CV.pdf`) and add a download link to the hero only when that file is available. Do not add placeholder qualifications.

### Social links and SEO

Social links are in the contact section of `index.html`. Update them there if needed. Update the title, description and Open Graph/Twitter metadata in the `<head>` when the public-facing identity changes. After deployment, add an absolute canonical URL and absolute `og:url`/`og:image` values for the published site.

## GitHub Pages deployment

1. Choose an existing repository or create a new repository on GitHub.
2. Upload or push the website files, preserving the `images/` folder structure.
3. Open the repository’s **Settings**.
4. Select **Pages** in the sidebar.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the branch containing the site (commonly `main`) and the `/ (root)` folder, then save.
7. Wait for GitHub Pages to finish publishing. Use the URL shown in **Settings → Pages** to confirm the published site.
8. Add the final URL as the canonical URL and use absolute URLs for the social-sharing metadata.

For a project repository, the Pages URL is usually `https://<username>.github.io/<repository>/`. For a user site repository named `<username>.github.io`, the URL is usually `https://<username>.github.io/`. The final URL is not configured or claimed here because deployment has not been performed.

## Verified project references and limitations

The project cards reference the public repositories [T-Attendie](https://github.com/tahaamindev/T-Attendie), [AIMZ](https://github.com/tahaamindev/AIMZ) and [JK-Collection](https://github.com/tahaamindev/JK-Collection), and use their corresponding supplied GIF previews. Their repository root files confirmed HTML, CSS and JavaScript usage; T-Attendie also includes PWA-related files. No README files or verified hosted demos were available during inspection, so no live-preview buttons are shown.

The supplied portrait files are `images/main.png` and `images/about.png`; this page uses `main.png`. The supplied project previews are the three GIFs in `images/`. `images/ice.jpg` is used as an interface study in the creative gallery. No CV PDF, sketch images or science-project photos were present. Travel is presented only as an interest; no destinations or trips are claimed.
