const express = require("express");
const app = express();

app.get("/predict", (req, res) => res.send("ho!"));

// app.listen(5000)// const path = require('path');
const port = process.env.PORT || 5000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${port}`);
});
// module.exports = {
//   entry: './client.js',
//   mode: process.env.NODE_ENV || 'development',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'bundle.js',
//     publicPath: '/',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//       },
//     ],
//   },
// };
