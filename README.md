<!--
  File: README.md
  Project: TonicTwo (formerly Supertonic)
  Description: Main documentation and project history (curated from the original Supertonic documentation).
  Original authors: Arantxa Garayzar Cristerna, ANR
  Updated: 2026-02-20
-->

# TonicTwo

TonicTwo is a modernized continuation of the original project **Supertonic**: a browser-based grid sequencer (“musical boxes”) that lets you build simple note patterns and record the result.

## What is it?

A minimal step sequencer with 7 notes (C, D, E, F, G, A, B) and 8 steps per bar. You can toggle steps on the grid, control tempo (BPM), transpose pitch globally, and record/export the audio output.

## Origins and academic context (Supertonic, 2019)

**Supertonic** was developed at **Universidad Autónoma Metropolitana (UAM), Unidad Cuajimalpa**, within the **B.S. in Information Technologies and Systems**, as part of the course **Laboratorio Temático II**, under the guidance of **Prof. Alba R. Núñez Reyes**. and **Prof. Wulfrano Arturo Luna** The final documentation is dated **November 26, 2019**.

Its core motivation was to show that music and art are not “outside” computing, and to bring music technology closer to people: creative making can also happen “on a screen”.

### Authorship and collaboration

The original Supertonic project was built collaboratively by:
- **Arantxa Garayzar Cristerna**
- **ANR**

The documented workflow assigned roles: **ANR** focused on **front-end** development, while **Arantxa** focused on **back-end** development.

## Original project goals

General goal: develop a music-technology project at UAM Cuajimalpa to give this field a place within Information Technologies and Systems projects.

Specific goals:
1. Use computational tools for sound handling and creation.  
2. Bring users closer to music technology.  
3. Strengthen skills in web application development.

## Technology and implementation approach (2019)

Development started on the front end using **HTML, CSS, and JavaScript**, with **Tone.js** as the library used to create sounds, schedule them in time, and play them in web browsers.

The project followed **weekly deliveries**, learning tools as needed, and planning features and improvements continuously. Planning was supported with **ClickUp**, and the documentation references a **12-week** schedule aligned with the academic term.

> Database note: the original scope included a MySQL database (`SUPERTONIC`) with tables for admin, general users, and comments. In TonicTwo, this component can be omitted if the focus is purely musical and local (no login).

## Validation and UX findings (2019)

Validation took place on **Monday, November 25, 2019**, during a final projects exhibition. A user unfamiliar with the project tested three tasks: play with the boxes, register, and submit a comment.

Notable findings included:
- The grid interaction felt intuitive; however, English note names were confusing for users without musical background.
- Registration was easy to find, but the birth-date input was inconvenient for selecting a birth year; suggestions included larger fields and better space usage.
- Some users pressed play/clear/record almost at random, likely due to small button text, plus a few responsive proportion issues.

The original site also included onboarding elements: a carousel introducing the developers and a video explaining the page components and usage steps.

## What changes with TonicTwo?

TonicTwo keeps Supertonic’s core idea (making music with a simple grid) and prioritizes:
- clearer UI (grouped controls and consistent labels),
- obvious recording feedback (REC indicator),
- simple-but-musical controls (global transpose),
- more maintainable code (modern Tone.js usage).

## Run it (simple mode)

1. Put these files in the same folder:
   - `index.html`
   - `style.css`
   - `app.js`
2. Open `index.html` in a modern browser.

Practical tip: if the browser blocks features due to local file policies, use a simple local server (e.g., VS Code “Live Server”).

## Credits

- **Supertonic (2019):** Arantxa Garayzar Cristerna and **ANR**.  
- **TonicTwo (modernization):** Arantxa Garayzar Cristerna.

## License

This project is licensed under the **GNU General Public License v3.0 (GPLv3)**.  
See `LICENSE` for details.
