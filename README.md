# Agile Space for AltspaceVR

This is a clientside 3D app meant to be loaded inside the [AltspaceVR](http://altvr.com/) client.

The app consists of two parts: The main 3D part which is loaded in a 3D placeholder in Altspace, and an overview part which is standard "2D" html. The overview is loaded in a "2D" placeholder in AltspaceVR.

A-Frame and React is used for rendering and interaction, Redux for statekeeping and Firebase for persistence and syncronization.

## Details

This app is meant to evolve into a full suite of tools to support remote agile teams using AltspaceVR. This first iteration consists of a specific retrospective activity called the [Squad Health Check Model](https://labs.spotify.com/2014/09/16/squad-health-check-model/) (click link to learn more).

## Development

### Installation

```
npm install
```

### Running

```
npm run serve
npm run serve-js
```

Navigate to [http://localhost:8082](http://localhost:8082) in the browser.

### Structure

* `src/js/entrypoint.js` is the sole entrypoint for the app loaded by `index.html`.
* `src/js/containers/Root.js` loads either the 3D game manager or the overview manager, depending on whether the `overview=true` querystring is present.
* Following Redux conventions, `containers` are React components that directly accesses the state of the app, while `components` are "dumb", and can only access the data they get provided via properties from a parent container or component.

