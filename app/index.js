'use strict';
var util = require('util'),
  path = require('path'),
  htmlWiring  = require('html-wiring'),
  generators = require('yeoman-generator'),
  _  = require('lodash-addons'),
  mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
 
  constructor: function() {
    generators.Base.apply(this, arguments);
  },
  initializing: {
    readConfig:function() {
      this.pkg = JSON.parse(htmlWiring.readFileAsString(path.join(__dirname, '../package.json')));
    },
    // installDependencies: function() {
    //   console.log("Ensuring Grunt is installed...");
    //   this.spawnCommandSync('npm', ['install', 'grunt']);
    //   console.log("Ensuring Bower is installed...");
    //   this.spawnCommandSync('npm', ['install', 'bower']);
    // }
  },
  prompting: function() {
    var cb = this.async();
    var prompts = [{
      name: 'appName',
      message: 'What would you like to call the project?',
      default: "kattegat-project"
    }];

    this.prompt(prompts, function (props) {
      this.appName = _.slugify(props.appName);
      cb();
    }.bind(this));
  },
  writing: {
    directories: function() {
      mkdirp.sync('views');
      mkdirp.sync('routes');
      mkdirp.sync('public');
      mkdirp.sync('bower_components');
      mkdirp.sync('public/images');
      this.directory("images", "public/images");
      mkdirp.sync("public/demos");
      this.directory("demos", "public/demos")
      mkdirp.sync("public/samples");
    },
    templates: function() {
      this.template('_index.html', 'public/index.html');
      this.template('Gruntfile.js', 'Gruntfile.js');
      this.template('_app.js', 'app.js');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_config.json', 'config.json');
    },
    files: function() {
      this.copy("base.css", "public/base.css")
      this.copy('editorconfig', '.editorconfig');
      this.copy('jshintrc', '.jshintrc');
      this.copy("bowerrc", ".bowerrc");
      this.copy("gitignore", ".gitignore");
      this.copy("nodemon.json", "nodemon.json");
    }
  },
  install: {
    installDependencies1: function() {
      //this.spawnCommandSync('npm', ['install', 'grunt', 'matchdep', 'bower']);
    },
    installDependencies2: function() {
      var me = this;
      this.log("Ensuring dependencies are installed...");
      this.installDependencies({
        bower: true,
        npm: true,
        callback: function() {
          me.spawnCommandSync('grunt', ['build']);
        }
      });
    },
    makeSketch: function() {
      this.composeWith("kattegat:sketch", {
        options: {
          nested:true, 
          sketchName:"template"
        }
      });
    },
    // grunt: function() {
    //   console.log("install - grunt build");
    //   var cb = this.async();
    //   this.spawnCommand('grunt', ['build'])
    //   .on('error', function(e) {
    //     this.log("Error: " +e + " (do you have Grunt installed?)");
    //   })
    //   .on("exit", function() {
    //     cb();
    //   })
    // }
    // var cb = this.async();
    // this.installDependencies({ 
    //   callback: cb
    // });

  },

  end: function()  {
    this.log("\n");
    this.log("  /\\-/\\    /\\-/\\    /\\-/\\    /\\-/\\    /\\-/\\    /\\-/\\    /\\-/\\    /\\-/\\");
    this.log(" (=^Y^=)  (=^Y^=)  (=^Y^=)  (=^Y^=)  (=^Y^=)  (=^Y^=)  (=^Y^=)  (=^Y^=)");
    this.log("  (>o<)    (>o<)    (>o<)    (>o<)    (>o<)    (>o<)    (>o<)    (>o<)");
    this.log("");
    this.log("             Kattegat has generated a project for you");
    this.log("");
    this.log("                   Type 'npm start' to start.");
    this.log("");
  }
});

