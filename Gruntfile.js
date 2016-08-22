/**
 * Created by Carlos on 21/08/2016.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        // tasks config

        clean: {
            dist: {
                src: ["dist/"]
            }
        },

        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/src',
                    src: '**/*.js',
                    dest: 'dist/src'
                }]
            }
        },

        less: {
            dist: {
                options: {
                    paths: ["app/assets/less"],
                    compress: true
                },
                files: {
                    "dist/css/app.css": "app/assets/less/app.less"
                }
            },
            app: {
                options: {
                    paths: ["app/assets/less"],
                },
                files: {
                    "app/assets/css/app.css": "app/assets/less/app.less"
                }
            }
        },

        copy: {
            dist: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        cwd: 'app/src/views/',
                        src: ['**'],
                        dest: 'dist/src/views/'
                    },
                    {
                        expand: true,
                        cwd: 'app/bower_components/',
                        src: ['**'],
                        dest: 'dist/bower_components/'
                    },
                    {src: 'app/index.html', dest: 'dist/index.html'},
                    {src: 'app/channel.html', dest: 'dist/channel.html'}
                ]
            }
        },

        'http-server': {

            built: {
                // the server root directory
                root: './dist',

                // the server port
                // can also be written as a function, e.g.
                // port: function() { return 8000; }
                port: 9000,

                // the host ip address
                // If specified to, for example, "127.0.0.1" the server will
                // only be available on that ip.
                // Specify "0.0.0.0" to be available everywhere
                host: "localhost",

                // Tell grunt task to open the browser
                openBrowser: false

            },
            app: {
                // the server root directory
                root: './app',

                // the server port
                // can also be written as a function, e.g.
                // port: function() { return 8000; }
                port: 9000,

                // the host ip address
                // If specified to, for example, "127.0.0.1" the server will
                // only be available on that ip.
                // Specify "0.0.0.0" to be available everywhere
                host: "localhost",

                // Tell grunt task to open the browser
                openBrowser: false

            }
        },

        jscs: {
            src: "app/src/**/*.js",
            options: {
                config: ".jscsrc",
                fix: true, // Autofix code style violations when possible.
                requireCurlyBraces: ["if"]
            }
        },

        jshint: {
            all: ['app/src/**/*.js']
        }
    });

    // plugins load
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks('grunt-http-server');

    // tasks registration
    // Build
    grunt.registerTask('build', ['clean:dist', 'uglify:dist', 'less:dist', 'copy:dist']);

    // Watch
    grunt.registerTask('watch', ['watch', 'jscs', 'jshint']);

    // Serve
    grunt.registerTask('serve', ['http-server:app']);
    grunt.registerTask('serve-built', ['http-server:built']);

    // Code-Style
    grunt.registerTask('style', ['jscs', 'jshint']);

    // Less
    grunt.registerTask('less', ['less:app']);
};