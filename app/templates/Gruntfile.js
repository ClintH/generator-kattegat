// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var moment = require('moment'),
 _ = require("lodash")
 
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
 
module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  grunt.initConfig({
    bower_concat: {
      all: {
        exclude: ['pure'],
        dest: 'bower_components/libraries.js',
        callback: function(mainFiles, component) {
          return _.map(mainFiles, function(filepath) {
            // Use minified files is available
            var min = filepath.replace(/\.js$/, '.min.js');
            return grunt.file.exists(min) ? min : filepath;
          });
        }
      }
    },
  });
 
 grunt.registerTask('default', ['bower_concat']);
 grunt.registerTask('build', ['default']);
};