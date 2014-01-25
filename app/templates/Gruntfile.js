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
    clean: ['bower_components/bower_libs.js', 'bower_components/libraries.js'],
    bower_concat: {
      all: {
        exclude: ['pure'],
        dest: 'bower_components/bower_libs.js',
        callback: function(mainFiles, component) {
          return _.map(mainFiles, function(filepath) {
            // Use minified files is available
            var min = filepath.replace(/\.js$/, '.min.js');
            return grunt.file.exists(min) ? min : filepath;
          });
        }
      }
    },
    concat: {
      all: {
        src: ['bower_components/*.js'],
        dest: 'bower_components/libraries.js'
      }
    },
  });
 
 grunt.registerTask('default', ['clean', 'bower_concat', "concat"]);
 grunt.registerTask('build', ['default']);
};