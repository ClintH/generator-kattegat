'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var PageGenerator = module.exports = function PageGenerator(args, options, config) {
  if (args.length != 0) {
    this.pageName = args['0'];
  } else if (options.pageName) {
    this.pageName = options.pageName;
  }
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(PageGenerator, yeoman.generators.NamedBase);

PageGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  if (this.pageName) {
  	cb();
    return;
  }

  var prompts = [{
    name: 'pageName',
    message: 'What would you like to call the page?',
    default: "page0"
  }];

  this.prompt(prompts, function (props) {
    this.pageName = props.pageName;
    cb();
  }.bind(this));
};

PageGenerator.prototype.files = function files() {
  this.pageName = this.pageName
    .replace(' ', '')
    .replace('/', '-')
    .replace('\\', '-')
    .replace(":", '')
    .replace("\"", "")
    .replace("'", "");

  var base = 'public/' + this.pageName + "/";
  
  this.mkdir('public');
  this.mkdir(base);
  this.template('_index.html', base + 'index.html');
  this.template('_style.css', base + 'style.css');
  this.template('_script.js',   base + 'script.js');

};


PageGenerator.prototype.done = function done() {
  this.log.ok("Page generated. If your server is running, you can access it: /" + this.pageName + "/")
}