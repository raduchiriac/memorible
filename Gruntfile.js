module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      app: {
        src: 'src/js/app.js',
        dest: 'dist/js/app.bundle.js',
        options: {
          browserifyOptions: {
            debug: true,
            transform: ['hbsfy']
          }
        }
      },
      test: {
        src: 'spec/**/*.spec.js',
        dest: 'tmp/spec.bundle.js',
        options: {
          browserifyOptions: {
            debug: true,
            transform: 'hbsfy',
            plugin: 'proxyquireify/plugin'
          }
        }
      }
    },

    watch: {
      app: {
        files: ['src/js/**/*.js', 'dist/*.html', 'templates/*.hbs', 'scss/**/*.scss'],
        tasks: ['browserify', 'sass'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      app: {
        options: {
          port: 4000,
          base: './dist',
          middleware: function (connect, options, middlewares) {
            middlewares.unshift(require('connect-livereload')());
            return middlewares;
          }
        }
      }
    },

    jasmine: {
      app: {
        options: {
          specs: 'tmp/spec.bundle.js'
        }
      }
    },

    sass: {
      options: {
        includePaths: ['vendor/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
        },
        files: {
          'dist/css/app.css': 'scss/app.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // define tasks
  grunt.registerTask('default', ['browserify', 'sass']);
  grunt.registerTask('serve', ['browserify:app', 'connect:app', 'watch:app']);
  grunt.registerTask('test', ['browserify:test', 'jasmine']);
}
