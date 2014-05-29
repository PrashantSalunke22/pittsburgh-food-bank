module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
				src: [
					'source/js/jquery.js', // A
					'source/js/jquery.mobile.custom.js',
					'source/js/jquery.inputmask.js',
					'source/js/jquery.inputmask.date.extensions.js',
					'source/js/single-cc-field.js',
					'source/js/parsley.js',
					'source/js/init.js',
					'!source/js/modernizr.js' // Exclude Modernizr
				],
				dest: 'public/js/production.js'
			}
        },
        uglify: {
			build: {
				src: 'public/js/production.js',
				dest: 'public/js/production.min.js'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/style.css': 'source/css/style.scss',
					'public/styleguide/css/styleguide.css': 'public/styleguide/css/styleguide.scss',
					'public/styleguide/css/styleguide-specific.css': 'public/styleguide/css/styleguide-specific.scss'
				}
			}
		},
		autoprefixer: {
			single_file: {
				src: 'public/style.css',
				dest: 'public/style.css'
			}
        },
		shell: {
            patternlab: {
                command: "php core/builder.php -gp"
            }
        },
        copy: {
		  main: {
		    files: [
		      { src:"source/js/modernizr.js", dest:"public/js/modernizr.js" },
		      { src:"public/style.css", dest:"../wordpress/wp-content/themes/pittsburghfoodbank/style.css" }
		    ]
		  }
		},
		watch: {
            all: {
                files: ['*'],
                options: { livereload: true }
            },
			html: {
				files: ['source/_patterns/**/*.mustache', 'source/_patterns/**/*.json', 'source/_data/*.json'],
				tasks: ['shell:patternlab'],
				options: {
					livereload: true
				}
			},
			scripts: {
				files: ['source/js/*.js'],
				tasks: ['concat', 'uglify', 'copy'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['source/css/*.scss', 'source/css/**/*.scss', 'public/styleguide/css/**/*.scss'],
				tasks: ['sass','autoprefixer', 'copy'],
				options: {
					livereload: true
				}
			}
		}
    });

	// Plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Tasks
	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch', 'copy', 'autoprefixer', 'shell:patternlab']);
};
