# Millisecond Pulsar Parallax Program 🌌

[![Website Status](https://img.shields.io/badge/Website-Online-brightgreen)](https://codexnyctis.github.io/test-deploy/#/test-deploy)
[![VLBA](https://img.shields.io/badge/VLBA-Pulsar%20Astrometry-blueviolet)](https://public.nrao.edu/telescopes/vla/)

> Mapping the Galaxy's Most Precise Timekeepers with Very Long Baseline Interferometry

## 📡 Project Overview

Our multi-phase program (PSRπ, MSPSRπ, MSPSRπ2) uses Very Long Baseline Interferometry to measure millisecond pulsar positions throughout the Galaxy. The VLBA achieves parallax and proper motion accuracies of ~40 microarcseconds and ~40 microarcseconds/year for pulsars as faint as 1 mJy.

These precise measurements help us:
- Enhance gravitational wave detection
- Test Einstein's theories
- Map dark matter distribution
- Create a cosmic GPS network revealing the invisible structure of spacetime

## 🔗 Quick Links

- **Live Website:** [Millisecond Pulsar Parallax Program](https://codexnyctis.github.io/test-deploy/#/test-deploy)
- **System Requirements:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Current Status:** Desktop optimized (mobile version in development)

## 🛠️ Editing Content

### Local Editing (Recommended)

1. Clone the repository to your local machine
   ```bash
   git clone [repository-url]
   ```

2. Navigate to the `/public/data/` directory

3. Edit the relevant JSON files with your preferred text editor

4. Commit and push your changes
   ```bash
   git add .
   git commit -m "explanation of the change"
   git push origin main
   ```

5. The site will automatically rebuild with your changes (visible in the repository's Actions tab)

### JSON Formatting Tips

```json
{
  "date": "2023",
  "title": "Project Proposal",
  "description": "MSPSRπ2 proposal submitted to VLBA for observing time allocation."
}
```

- Items in a list need comma between them, but not after the last item
- All property names need double quotes
- Text values need double quotes
- Numbers don't need quotes

## 📊 Site Structure

### Home Page

The homepage introduces the VLBA pulsar astrometry project, highlighting its mission to measure precise distances to millisecond pulsars.

**Key Sections:**
- Research Title & Questions
- Key Discoveries
- Journey of a Pulsar
- Project Statistics
- Phase Progress

**Edit File:** `homePage.json`

### Project Page

**Key Sections:**
- Project Overview - MSPSRπ & MSPSRπ2 phases
- Phase Details
- Observation Status Tracker

**Edit Files:**
- `projectData.json` - Project descriptions, timeline, phase details
- `observationData.json` - Current observation status
- `mspsrpiDetails.json` - MSPSRπ details
- `mspsrpi2Details.json` - MSPSRπ2 details
- `mspsrpi2Pulsars.json` - Target pulsars

### Data Release Page

Displays comprehensive data for all observed pulsars.

**Edit Files:**
- `pulsars.json` - MSPSRπ pulsars
- `mspsrpi2Pulsars.json` - MSPSRπ2 pulsars

### Publications Page

Showcases research papers from the project with filtering and search.

**Edit File:** `publications.json`

### Team Page

Displays all project members with profiles and contact information.

**Edit File:** `teamMembers.json`

## 🚀 Upcoming Features

- **Home:** Mobile version optimization
- **Project:** Mobile navigation and responsive design
- **Data Release:** Dynamic data display, functional download buttons, visualization interface
- **Publications:** Mobile optimization
- **Team:** Global collaboration map showing geographic distribution

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| Content not updating | Save file and wait a few minutes |
| "Loading..." message | Verify files are in correct `/public/data/` folder |
| Progress statistics incorrect | Check pulsar status values ("scheduled", "in-progress", "complete", "issue") |
| Missing content | Verify JSON format (check commas, quotes, brackets) |
| Error messages | Create backup before editing; check JSON syntax |

---

*For additional support or to report issues, please contact the team.*
