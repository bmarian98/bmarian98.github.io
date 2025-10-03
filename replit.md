# Marian Bodnar - Personal Portfolio & DevOps Website

## Overview
This is a personal portfolio website for Marian Bodnar, a Junior DevOps engineer. The website showcases professional experience, educational background, certifications, technical skills, projects, and includes an interactive courses section with educational content.

**Current Status**: Fully functional and deployed on Replit
**Last Updated**: October 3, 2025

## Project Architecture

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, and JavaScript (no build process required)
- **UI Framework**: Tailwind CSS (via CDN)
- **JavaScript Libraries**:
  - Alpine.js - for reactive components
  - Particles.js - for animated background effects
  - Prism.js - for code syntax highlighting
  - Font Awesome & Devicons - for icons
- **Server**: Python HTTP server (simple static file serving)

### Project Structure
```
/
├── index.html              # Main portfolio page
├── courses.html            # Educational courses explorer
├── assets/
│   ├── css/
│   │   ├── style.css       # Main styles
│   │   └── explorer.css    # Course explorer styles
│   ├── js/
│   │   ├── script.js       # Main page functionality
│   │   └── explorer.js     # Course explorer functionality
│   ├── data/
│   │   └── courses.json    # Course structure data
│   └── images/
│       ├── favicon.svg
│       └── image_profile.png
├── courses/
│   ├── bash/               # Bash scripting courses
│   ├── python/             # Python courses (notebooks & markdown)
│   │   └── module_1/       # Python module 1 content
│   └── vim/                # Vim editor commands
├── .gitignore
└── replit.md
```

## Features

### Main Portfolio (index.html)
1. **Hero Section** - Introduction with animated particle background
2. **Work Experience** - Timeline visualization of professional roles
3. **Studies** - Educational background timeline
4. **Certifications** - Grid display with Credly badge embeds
5. **Skills** - Visual grid of technical proficiencies (Docker, Kubernetes, Python, Terraform, AWS, GCP, etc.)
6. **Projects** - YouTube video embeds and project links
7. **Contact** - Contact information and social links
8. **Light/Dark Mode** - Theme toggle functionality

### Courses Explorer (courses.html)
- Interactive file tree navigation
- Displays multiple content types:
  - Jupyter notebooks (.ipynb)
  - Markdown files (.md)
  - Shell scripts (.sh)
- Code syntax highlighting
- Copy-to-clipboard functionality
- Responsive mobile-friendly design

## Development Setup

### Running Locally
The website runs using Python's built-in HTTP server on port 5000:
```bash
python -m http.server 5000
```

### Workflow Configuration
- **Name**: Server
- **Command**: `python -m http.server 5000`
- **Port**: 5000 (required for Replit webview)
- **Output Type**: webview

## Deployment Configuration
- **Type**: Autoscale (stateless static website)
- **Run Command**: `python -m http.server`
- Suitable for production as a simple static site

## Content Management

### Adding/Editing Course Content
1. Add files to the appropriate directory in `/courses/`
2. Update `/assets/data/courses.json` with the new file metadata:
   ```json
   {
     "name": "filename",
     "path": "courses/folder/filename",
     "type": "notebook|script|markdown"
   }
   ```
3. Supported file types:
   - `.ipynb` - Jupyter notebooks (type: "notebook")
   - `.sh` - Shell scripts (type: "script")
   - `.md` - Markdown files (type: "markdown")

### Updating Portfolio Content
Portfolio data is embedded in `/assets/js/script.js`:
- `workTimelineData` - Professional experience
- `studiesTimelineData` - Educational background
- `credlyEmbedCodes` - Certification badges
- `skills` - Technical skills list
- `videoUrls` - Project videos
- `projectLinks` - Project repository links

## User Preferences
- Prefers clean, professional design with cyan accent colors (#00f0ff)
- Dark mode as default theme
- Animated, interactive UI elements
- Focus on DevOps and cloud technologies

## Recent Changes
- **Oct 3, 2025**: Initial Replit setup
  - Configured Python HTTP server on port 5000
  - Created .gitignore for Python
  - Configured deployment for autoscale
  - Verified all pages and features working correctly

## Notes
- The site uses Tailwind CSS via CDN (shows warning in console - this is expected for development)
- All external assets loaded via CDN (no npm/build process needed)
- Simple static hosting makes it easy to deploy anywhere
- No database or backend API required
