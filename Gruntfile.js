/**
 * configuration for grunt tasks
 * @module Gruntfile
 */

module.exports = function(grunt) {
    /** load tasks */
    require('load-grunt-tasks')(grunt);

    /** config for build paths */
    var config = {
        dist: {
            dir: 'dist/',
            css: 'dist/assets/css/main.css',
            js: 'dist/assets/js/main.js'
        },
        src: {
            dir: 'public/'
        },
        tmp: {
            dir: 'tmp/'
        }
    };

    /** paths to files */
    var files = {

        /** meta / non-script files */
        meta: [
            'README.md',
            'Procfile',
            'TODO.md',
            '.gitignore',
            '.nodemonignore',
            '*.sublime-project',
            '*.sublime-workspace',
            '*.iml',
            '.idea'
        ],

        /** server scripts */
        server: [
            'app.js'
        ],

        /** client javascript files */
        js: [
            'assets/js/app.js',
            'modules/*.js',
            'modules/**/*.js'
        ],

        /** sass */
        sass: [
            'assets/sass/main.scss',
        ],

        /** html */
        html: [
            'index.html',
            'modules/*.html',
            'modules/**/*.html'
        ],

        /** favicon logo */
        favicon: [
            'favicon.ico'
        ],

        /** fonts */
        fonts: [
            'assets/fonts'
        ],

        /** images */
        images: [
            'assets/img/*.*',
            'assets/img/**/*.*'
        ],

        /** other static resources */
        etc: [
            'assets/etc'
        ],

        /** 3rd party libraries */
        vendor: [
            'assets/vendor/**'
        ],

        /** array of all paths */
        all: []
    };

    /* # # # # # # # # # # # # # # # # # # # # */
    /* # # # # # # # # # # # # # # # # # # # # */
    /* # # # # # # # # # # # # # # # # # # # # */
    /* # # # # # # # # # # # # # # # # # # # # */

    /** config for grunt tasks */
    var taskConfig = {

        /** run multiple tasks */
        concurrent: {
            dev: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: [
                    'watch',
                    'nodemon:dev'
                ]
            }
        },

        /** run scripts programatically */
        nodemon: {
            dev: {
                /** script to run */
                script: 'app.js',

                /** configuration */
                options: {
                    watch: [
                        files.server
                    ]
                }
            }
        },

        /** watch files for changes */
        watch: {

            options: {
                livereload: true
            },

            /** html watch config */
            html: {
                /** config */
                options: {
                    cwd: config.src.dir
                },

                /** files to watch */
                files: files.html,

                /** tasks to run on change */
                tasks: [
                    'build:html'
                ]
            },

            /** javascript watch config */
            js: {
                /** config */
                options: {
                    cwd: config.src.dir
                },

                /** files to watch */
                files: files.js,

                /** tasks to run on change */
                tasks: [
                    'build:js'
                ]
            },

            /** css watch config */
            css: {
                /** config */
                options: {
                    cwd: config.src.dir
                },

                /** files to watch */
                files: files.sass,

                /** tasks to run on change */
                tasks: [
                    'build:css'
                ]
            }
        },

        /** copy files from public to dist directory */
        copy: {
            html: {
                expand: true,
                cwd: config.src.dir,
                src: files.html,
                dest: config.dist.dir
            },
            etc: {
                expand: true,
                cwd: config.src.dir,
                src: files.etc,
                dest: config.dist.dir
            },
            vendor: {
                expand: true,
                cwd: config.src.dir,
                src: files.vendor,
                dest: config.dist.dir
            }
        },

        /** remove files from a directory or a directory itself */
        clean: {

            /** remove html files */
            html: {
                expand: true,
                cwd: config.dist.dir,
                src: files.html,
                filter: function(filename) {
                    var
                        split = filename.split('.'),
                        ext = split[split.length - 1];

                    return ext === 'html';
                }
            },

            /** remove js files */
            js: {
                expand: true,
                src: config.dist.js
            },

            /** remove css files */
            css: {
                expand: true,
                src: (function() {
                    var cwd = config.src.dir;

                    return files.sass.map(function(path) {
                        return cwd + path;
                    });
                })(),
                src: config.dist.css
            },

            /** remove vendor files, fonts, etc */
            assets: {
                expand: true,
                cwd: config.dist.dir,
                files: {
                    etc: files.etc,
                    fonts: files.fonts,
                    images: files.images,
                    vendor: files.vendor
                }
            }
        },

        /** concat js files */
        concat: {
            js: {
                options: {
                    // stripBanners: true
                    // banner: '<%= meta %>'
                },
                src: (function() {
                    var cwd = config.src.dir;

                    return files.js.map(function(path) {
                        return cwd + path;
                    });
                })(),
                dest: config.dist.js
            }
        },

        /** compile sass files */
        sass: {
            dev: {
                src: (function() {
                    var cwd = config.src.dir;

                    return files.sass.map(function(path) {
                        return cwd + path;
                    });
                })(),
                dest: config.dist.css
            }
            /*
             ,
             compress: {
             options: {
             style: 'compressed'
             },
             files: {
             '<%= paths.assets %>/css/screen.min.css': '<%= paths.sass %>/screen.scss'
             }
             }
             */
        }
    };

    /* # # # # # # # # # # # # # # # # # # # # */
    /* # # # # # # # # # # # # # # # # # # # # */
    /* # # # # # # # # # # # # # # # # # # # # */
    /* # # # # # # # # # # # # # # # # # # # # */

    // register default & custom tasks

    grunt.initConfig(taskConfig);

    grunt.registerTask('default', [
        'concurrent:dev'
    ]);

    grunt.registerTask('build', [
        'build:html',
        'build:js',
        'build:assets'
    ]);

    grunt.registerTask('build:js', [
        'clean:js',
        'concat:js'
    ]);

    grunt.registerTask('build:css', [
        'clean:css',
        'sass:dev'
    ]);

    grunt.registerTask('build:html', [
        'clean:html',
        'copy:html'
    ]);

    grunt.registerTask('build:assets', [
        'clean:assets',
        'copy:vendor'
    ]);
};