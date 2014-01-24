'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var KattegatGenerator = module.exports = function KattegatGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.on('end', function() {
    console.log("\n");
    console.log("  /\\-/\\    /\\-/\\    /\\-/\\    /\\-/\\    /\\-/\\    /\\-/\\    /\\-/\\    /\\-/\\");
    console.log(" (=^Y^=)  (=^Y^=)  (=^Y^=)  (=^Y^=)  (=^Y^=)  (=^Y^=)  (=^Y^=)  (=^Y^=)");
    console.log("  (>o<)    (>o<)    (>o<)    (>o<)    (>o<)    (>o<)    (>o<)    (>o<)");
    console.log("");
    console.log("             Kattegat has generated an app for you");
    console.log("");
    console.log("                   Type 'node app' to start.");
    console.log("");

  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(KattegatGenerator, yeoman.generators.Base);



KattegatGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var prompts = [{
    name: 'appName',
    message: 'What would you like to call the app?',
    default: "kattegat-app"
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    cb();
  }.bind(this));
};


KattegatGenerator.prototype.app = function app() {
  this.mkdir('views');
  this.mkdir('routes');
  this.mkdir('public');
  this.template('_index.html', 'public/index.html');

  this.mkdir('public/images');
  this.directory("images", "public/images");

  this.mkdir("public/demos");
  this.directory("demos", "public/demos")
  this.copy("base.css", "public/base.css")

  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('_app.js', 'app.js');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_config.json', 'config.json');
};

KattegatGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy("bowerrc", ".bowerrc");
  this.copy("gitignore", ".gitignore");
};

KattegatGenerator.prototype.generateTemplate = function generateTemplate() {
  var cb = this.async();
  this.invoke("kattegat:page", {options: {nested:true, pageName:"template"}}, cb);

}
KattegatGenerator.prototype.install = function install() {
  var cb = this.async();
  this.installDependencies({ 
    callback: cb
  });
}

KattegatGenerator.prototype.grunt = function grunt() {
  var cb = this.async();
  this.spawnCommand('grunt', ['build'])
  .on("exit", function() {
    cb();
  })
}

