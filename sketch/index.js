'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var SketchGenerator = module.exports = function SketchGenerator(args, options, config) {
  if (args.length != 0) {
    this.sketchName = args['0'];
  } else if (options.sketchName) {
    this.sketchName = options.sketchName;
  }
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(SketchGenerator, yeoman.generators.NamedBase);

SketchGenerator.prototype.askFor = function askFor() {
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
};

SketchGenerator.prototype.files = function files() {
  this.sketchName = this.sketchName
    .replace(' ', '')
    .replace('/', '-')
    .replace('\\', '-')
    .replace(":", '')
    .replace("\"", "")
    .replace("'", "");

  var base = 'public/' + this.sketchName + "/";
  
  this.mkdir('public');
  this.mkdir(base);
  this.template('_index.html', base + 'index.html');
  this.template('_style.css', base + 'style.css');
  this.template('_script.js',   base + 'script.js');

};


SketchGenerator.prototype.done = function done() {
  this.log.ok("Sketch generated. If your server is running, you can access it: /" + this.sketchName + "/")
}