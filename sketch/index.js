'use strict';
var util = require('util'),
  mkdirp = require('mkdirp'),
  generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },
  initializing: function() {
    this.sketchName = this.options.sketchName;
  },
  askFor: function() {
    var cb = this.async();
    if (this.sketchName) {
      cb();
      return;
    }
    var prompts = [{
      name: 'sketchName',
      message: 'What would you like to call the sketch?',
      default: "sketch0"
    }];

    this.prompt(prompts, function (props) {
      this.sketchName = props.sketchName;
      cb();
    }.bind(this));
  },
  files: function() {
    this.sketchName = this.sketchName
      .replace(' ', '')
      .replace('/', '-')
      .replace('\\', '-')
      .replace(":", '')
      .replace("\"", "")
      .replace("'", "");
    
    var base = 'public/' + this.sketchName + "/";
    mkdirp.sync('public');
    mkdirp.sync(base);
    this.template('_index.html', base + 'index.html');
    this.template('_style.css', base + 'style.css');
    this.template('_script.js',   base + 'script.js');
    this.copy("_.jshintrc", base + ".jshintrc");

  },
  done: function() {
    this.log.ok("Sketch generated. If your server is running, you can access it: /" + this.sketchName + "/")
  }
});