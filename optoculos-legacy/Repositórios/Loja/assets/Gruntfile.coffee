proxy = require('proxy-middleware')
serveStatic = require('serve-static')
httpPlease = require('connect-http-please')
url = require('url')
middlewares = require('./speed-middleware')

module.exports = (grunt) ->
  pkg = grunt.file.readJSON('package.json')

  accountName = process.env.VTEX_ACCOUNT or pkg.accountName or 'basedevmkp'

  environment = process.env.VTEX_ENV or 'vtexcommercestable'
  
  secureUrl = process.env.VTEX_SECURE_URL or pkg.secureUrl

  verbose = grunt.option('verbose')

  if secureUrl
    imgProxyOptions = url.parse("https://#{accountName}.vteximg.com.br/arquivos")
  else 
    imgProxyOptions = url.parse("http://#{accountName}.vteximg.com.br/arquivos")

  imgProxyOptions.route = '/arquivos'

  # portalHost is also used by connect-http-please
  # example: basedevmkp.vtexcommercestable.com.br
  portalHost = "#{accountName}.#{environment}.com.br"
  if secureUrl
    portalProxyOptions = url.parse("https://#{portalHost}/")
  else
    portalProxyOptions = url.parse("http://#{portalHost}/")
  portalProxyOptions.preserveHost = true
  portalProxyOptions.cookieRewrite = "#{accountName}.vtexlocal.com.br"

  rewriteLocation = (location) ->
    return location
      .replace('https:', 'http:')
      .replace(environment, 'vtexlocal')

  config =
    clean:
      main: ['build']

    copy:
      main:
        files: [
          expand: true
          cwd: 'src/'
          src: ['**', '!**/*.js', '**/*.min.js', '!**/*.coffee', '!**/*.scss']
          dest: "build/"
        ]

    coffee:
      main:
        files: [
          expand: true
          cwd: 'src/'
          src: ['**/*.coffee']
          dest: "build/"
          ext: '.js'
        ]
    
    sass:
      compile:
        options:
          style: 'compressed'
          loadPath: require('node-neat').includePaths
        files: [
          expand: true
          cwd: 'src/'
          src: ['**/*.scss']
          dest: 'build/'
          ext: '.min.css'
        ]

    cssmin:
      main:
        expand: true
        cwd: 'build/arquivos/'
        src: ['*.css', '!*.min.css']
        dest: 'build/arquivos/'
        ext: '.min.css'

    uglify:
      dev:
        options:
          mangle: false
          compress: false
          beautify: true
        files: [{
          expand: true
          cwd: 'src/arquivos/'
          src: ['*.js']
          dest: 'build/arquivos/'
          ext: '.min.js'          
        }]        
      dist:
        options:
          mangle: false,
          compress: true
          beautify: false
        files: [{
          expand: true
          cwd: 'src/arquivos/'
          src: ['*.js']
          dest: 'build/arquivos/'
          ext: '.min.js'          
        }]        

    imagemin:
      main:
        files: [
          expand: true
          cwd: 'build/'
          src: ['**/*.{png,jpg,gif}']
          dest: 'build/'
        ]

    connect:
      http:
        options:
          hostname: "*"
          livereload: true
          port: process.env.PORT || 8080
          middleware: [
            middlewares.disableCompression
            middlewares.rewriteLocationHeader(rewriteLocation)
            middlewares.replaceHost(portalHost)
            middlewares.replaceHtmlBody(environment, accountName, secureUrl)
            httpPlease(host: portalHost, verbose: verbose)
            serveStatic('./build')
            proxy(imgProxyOptions)
            proxy(portalProxyOptions)
            middlewares.errorHandler
          ]

    watch:
      options:
        livereload: true
      coffee:
        files: ['**/*.coffee']
        tasks: ['coffee']
      sass:
        files: ['**/*.scss']
        tasks: ['sass:compile']      
      uglify:
        files: ['**/*.js']
        tasks: ['uglify:dev']
      css:
        files: ['**/*.css']
      main:
        files: ['**/*.html', '**/*.js', '**/*.css']
        tasks: ['copy:main']
      grunt:
        files: ['Gruntfile.coffee']

    browserSync:
      dev:
        bsFiles:
          src: ['build/arquivos/*.css']
      options:
        proxy: 'optoculos.vtexlocal.com.br'
        watchTask: true

  tasks =
    # Building block tasks
    build: ['clean', 'copy:main', 'coffee', 'sass:compile', 'uglify:dev']
    min: ['uglify:dist', 'cssmin'] # minifies files

    # Deploy tasks
    dist: ['build', 'min'] # Dist - minifies files
    test: []

    # Development tasks
    default: ['build', 'connect', 'watch']
    devmin: ['build', 'min', 'connect:http:keepalive'] # Minifies files and serve

  # Project configuration.
  grunt.config.init config
  if grunt.cli.tasks[0] is 'less'
    grunt.loadNpmTasks 'grunt-contrib-less'
  else if grunt.cli.tasks[0] is 'coffee'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
  else
    grunt.loadNpmTasks name for name of pkg.devDependencies when name[0..5] is 'grunt-'
  grunt.registerTask taskName, taskArray for taskName, taskArray of tasks