module.exports = function (grunt) {
  grunt.initConfig({
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
      }
    },
    watch: {
      app: {
        files: ['src/js/**/*.js', 'dist/*.html', 'templates/*.hbs'],
        tasks: ['browserify'],
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
          specs: 'spec/**/*.spec.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // define tasks
  grunt.registerTask('default', ['browserify']);
  grunt.registerTask('serve', ['browserify:app', 'connect:app', 'watch:app']);
  grunt.registerTask('test', ['jasmine']);
};