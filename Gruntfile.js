var nightwatch = require('./lib/index.js');

module.exports = function(grunt) {

  'use strict';

  nightwatch.initGrunt(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      bin: {
        src: 'bin/*.js'
      },
      lib: {
        src: ['index.js', 'lib/**/*.js']
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      examples: {
        src: [
          'examples/*.js',
          'examples/tests/**/*.js',
          'examples/custom-commands/**/*.js'
        ]
      }
    },

    jsonlint: {
      src: ['tests/**/*.json', 'examples/**/*.json']
    },

    complexity: {
      lib: {
        src: ['lib/**/*.js'],
        options: {
          breakOnErrors: true,
          errorsOnly: false,
          cyclomatic: [12, 10, 8, 6, 4],
          halstead: [30.19, 25, 20, 16, 12, 6, 3],
          maintainability: 98.65, // should be 100+,
          hideComplexFunctions: false
        }
      },
      examples: {
        src: ['examples/**/*.js'],
        options: {
          breakOnErrors: true,
          errorsOnly: false,
          cyclomatic: [12, 10, 8, 6, 4],
          halstead: [30.19, 25, 20, 16, 12, 6, 3],
          maintainability: 98.65, // should be 100+,
          hideComplexFunctions: false
        }
      }
    },

    npmrelease: {
      options: {
        push: true,
        bump : true,
        pushTags: true,
        npm: true,
        silent : false,
        commitMessage : 'bump version number to %s'
      },
      patch : {

      }
    },

    nightwatch: {
      options: {
        cwd: './'
      },

      'default' : {

      },

      browserstack: {
        argv: {
          env: 'browserstack'
        },
        settings: {
          silent: true
        }
      }
    },
    jsdoc : {
        dist : {
            src: ['lib/**/*.js'],
            options: {
                configure: 'conf.json',
                destination: 'docs'
            }
        }
    }

  });

  grunt.loadNpmTasks('grunt-npm-release');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-jsdoc');

  // load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('doc', ['jsdoc']);
  grunt.registerTask('release', ['npmrelease']);
  grunt.registerTask('default', ['jshint', 'jsonlint']);
  grunt.registerTask('all', ['jshint', 'jsonlint', 'complexity']);
};
