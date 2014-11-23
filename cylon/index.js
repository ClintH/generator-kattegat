'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var CylonGenerator = module.exports = function CylonGenerator(args, options, config) {
  if (args.length != 0) {
    this.cylonName = args['0'];
  } else if (options.cylonName) {
    this.cylonName = options.cylonName;
  }
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(CylonGenerator, yeoman.generators.NamedBase);

CylonGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  if (this.cylonName) {
  	cb();
    return;
  }

  var prompts = [{
    name: 'cylonName',
    message: 'What would you like to call the Cylon project?',
    default: "cylon0"
  }];

  this.prompt(prompts, function (props) {
    this.cylonName = props.cylonName;
    cb();
  }.bind(this));
};

CylonGenerator.prototype.files = function files() {
  this.cylonName = this.cylonName
    .replace(' ', '')
    .replace('/', '-')
    .replace('\\', '-')
    .replace(":", '')
    .replace("\"", "")
    .replace("'", "");

  var base = 'public/' + this.cylonName + "/";
  
  this.mkdir('public');
  this.mkdir(base);
  this.template('_index.html', base + 'index.html');
  this.template('_style.css', base + 'style.css');
  this.template('_script.js',   base + 'script.js');

};


CylonGenerator.prototype.done = function done() {
  this.log.ok("Cylon project generated.");
}