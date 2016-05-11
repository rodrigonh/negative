# Negative

> An app for making visual comparison.

![Negative Demo](negative-demo.gif)

## Documentation

- [Usage](docs/usage.md)

## Build Negative.app

Currently only Mac OS X is supported.

1. [Install Node.js](https://nodejs.org/en/) v4 or v5
2. `git clone https://github.com/atdrago/negative.git`
3. `cd negative`
4. `npm install`
5. `npm run build`
6. Locate and copy `dist/Negative-darwin-x64/Negative.app` to your `Applications` folder

## Testing

*Important:* Tests gets run against the **built app**. If you are attempting to run tests and the results are not what you expected, you need to run `npm run build` again.

1. `npm run build`
2. `npm run test`

## Developing

- `gulp` - Files in the renderer process are combined and minified, so you'll need to be running gulp to see your changes. This isn't necessary for files in the main process.
- `npm start` - This opens the app.

## About
Created by [Adam Drago](http://adamdrago.com). Icon by [Tiffany Wang](mailto:wangtiff@gmail.com). Built on [Electron](http://electron.atom.io/).
