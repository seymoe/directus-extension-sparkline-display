# SparkLine Display - Directus extension

A directus display extension with `apexcharts`, display the data of the field as a chart.

## Installation

In your Directus installation root

```
npm install directus-extension-sparkline-display
```

Restart directus

## Usage

To use this custom display into a data model, you have to:

- Add a simple field with **JSON** type, like:
  ```
  [
    {
      time: '2021',
      power: 10
    },
    {
      time: '2022',
      power: 20
    }
  ]
  ```
- Config field's display in advanced mode, choose sparkline type and data key, if you want show data with 'power', just fill in 'power'.
- Enjoy ! 🎉

## Building locally and contributing

You can also clone this repository and build it by yourself.

```
npm i
npm run build
```

Then use `index.js` in your custom `/extensions/displays` directory or in whatever you want.
