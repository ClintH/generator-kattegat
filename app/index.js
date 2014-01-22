'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var KattegatGenerator = module.exports = function KattegatGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ 
      skipInstall: options['skip-install'],
      callback: function() {
        this.emit("installed");
      }.bind(this)
    });
  });
  this.on('installed', function() {
    console.log("\n\nKattegat app generation done. Type 'node app' to start.");

  })
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(KattegatGenerator, yeoman.generators.Base);


KattegatGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

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

  this.mkdir('public');
  this.template('_index.html', 'public/index.html');
  this.copy("template.html", "public/template.html");

  this.mkdir('public/images');
  this.directory("images", "public/images");
  
  this.mkdir('public/js');
  this.directory("js", "public/js");

  this.mkdir('public/css');
  this.directory("css", "public/css");

  this.mkdir("public/demos");
  this.directory("demos", "public/demos")
  this.mkdir('routes');

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
