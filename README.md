# ElectroMech Engineering — Website

**Domain:** [electromechbd.net](https://electromechbd.net/)  
**Stack:** HTML, Tailwind CSS (Play CDN), Vanilla JS  
**Last Updated:** September 2026

---

## Project Structure

```
├── Home.html                         # Homepage (hero, about, stats, services, projects, products, clients, news, gallery, contact)
├── Products.html                     # Product catalogue (10 product lines with category filters)
├── Projects.html                     # Completed projects (filter by sector)
├── Solutions.html                    # Engineering solutions and EPC services
├── News.html                         # Press & news articles
├── Gallery.html                      # Visual archive (masonry grid with filters)
├── WhyChooseUs.html                  # About — Why Choose Us
├── CompanyHistory.html               # About — Company timeline (2007–present)
├── BoardOfDirectors.html             # About — Leadership team
├── OurCustomers.html                 # About — Client portfolio with marquee
├── certifications.html               # About — ISO & type test certificates
├── company-profile-and-brochure.html # About — Embedded PDF viewer
├── 404.html                          # Custom error page
├── css/
│   └── style.css                     # Global stylesheet (design tokens, scrollbar, animations, components)
├── js/
│   └── script.js                     # Global script (mobile menu, scroll effects, counter animations, filters)
├── img/
│   ├── logo.png                      # Company logo (local)
│   └── favicon.png                   # Favicon source
├── resources/
│   └── ElectroMech Company Profile.pdf   # Company brochure PDF
├── sitemap.xml                       # XML sitemap for search engines
├── robots.txt                        # Crawler instructions
├── site.webmanifest                  # PWA manifest
├── .htaccess                         # Apache: HTTPS redirect, caching, compression, 404
├── favicon.ico                       # Root favicon (copy of img/favicon.png)
└── DESIGN.md                         # Design system tokens (colors, typography, spacing)
```

## Technology Notes

- **Tailwind CSS** is loaded via the Play CDN (`cdn.tailwindcss.com`). The inline `tailwind.config` script is **identical** across all pages.
- **All images** except `logo.png` and `favicon.png` are served from Google's CDN (`lh3.googleusercontent.com`).
- **No build tools, npm, or framework** — this is a pure static site.
- The homepage (`Home.html`) is set as the default via `.htaccess` `DirectoryIndex`.

## Maintenance Guide

### Adding a New Page
1. Copy any existing inner page (e.g., `WhyChooseUs.html`)
2. Update `<title>`, `<meta name="description">`, `<link rel="canonical">`, and OG/Twitter meta tags
3. Set the correct active nav link class (`nav-link-active` for desktop, `mobile-link-active` for mobile)
4. Update `sitemap.xml` with the new URL

### Updating the Navbar or Footer
The navbar and footer are **inline on every page** (not JS-injected). When changing navigation links, update ALL pages.

### Design Tokens
Colors, typography, and spacing are defined in two places:
1. `DESIGN.md` — Source of truth documentation
2. `css/style.css` — CSS custom properties (`:root` variables)
3. Inline `tailwind.config` — Tailwind color/font/spacing tokens (identical on every page)

### SEO
- Each page has unique `<title>`, `<meta description>`, canonical URL, Open Graph, and Twitter Card tags
- JSON-LD structured data: Organization + WebSite on Home, BreadcrumbList on inner pages
- `sitemap.xml` and `robots.txt` are at the root
- `.htaccess` handles HTTPS redirect and `www` → non-www canonicalization

### Google Search Console
1. Verify the site using the HTML tag method — add your verification `<meta>` tag in `<head>` (placeholder comment exists)
2. Submit `sitemap.xml` in Search Console
3. The `robots.txt` already references the sitemap
