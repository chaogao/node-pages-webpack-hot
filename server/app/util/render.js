let compiler = require('../../config/webpack');
let path = require('path');
let config = require('../../config');
let fs = require('fs');
let mkdirp = require('mkdirp');

module.exports = (res, template) => {
  if (config.env == 'dev') {
    let filename = compiler.outputPath + template;

    compiler.outputFileSystem.readFile(filename, function(err, result) {
      let fileInfo = path.parse(path.join(config.templateRoot, filename));


      mkdirp(fileInfo.dir, () => {
        fs.writeFileSync(path.join(config.templateRoot, filename), result);

        res.render(template);
      });
    });
  } else {
    res.render(template);
  }
}
