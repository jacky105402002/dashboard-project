# Claude Design Export: GitHub Dashboard

This folder stores the Claude Design UIUX export for Dashboard Project.

## Entry Point

- `index.html`: design canvas entry point.

Open this through a local web server from this folder so the React/Babel script files load correctly.

Example:

```powershell
cd docs\design-assets\claude-design\github-dashboard
python -m http.server 4173
```

Then open:

```txt
http://localhost:4173
```

## Files

- `index.html`: exported design surface.
- `xenon-grid.css`: visual system styles used by the export.
- `design-canvas.jsx`: artboard/canvas wrapper.
- `components.jsx`: shared Xenon Grid UI components.
- `data.jsx`: mock project data.
- `screens-public.jsx`: public dashboard screens and states.
- `screens-admin.jsx`: admin dashboard screens and states.
- `screens-mobile.jsx`: mobile dashboard/editor screens.
- `.design-canvas.state.json`: design canvas state.

## Covered Screens

- Public mission grid.
- Public project detail drawer.
- Public loading, empty, and error states.
- Admin login and invalid credential states.
- Admin project registry.
- Admin project editor dirty and validation states.
- Admin delete confirmation.
- Mobile public dashboard.
- Mobile project detail.
- Mobile admin editor.
