const autoprefixer = require("autoprefixer");
module.exports = {
  plugins: [
    autoprefixer({
      autoprefixer: true,
      browsers: ["> 1%", "last 3 versions", "android 4.2", "ie 8"]
    })
  ]
};
