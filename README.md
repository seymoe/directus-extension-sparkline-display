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
  // Array Object, should set key "power"
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
  // Array, don't need set key.
  [ 10, 2, 10, 30 ]
  ```
- Enjoy ! 🎉

## Building locally and contributing

You can also clone this repository and build it by yourself.

```
npm i
npm run build
```

Then use `index.js` in your custom `/extensions/displays` directory or in whatever you want.
