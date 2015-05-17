'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdir = require('mkdirp');
var _ = require('underscore.string');


var StaticAngularGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous static angular generator!'));

        var prompts = [{
            name: 'title',
            message: 'What is the title of your application?',
            default: 'Hello World'
        },{
            name: 'description',
            message: 'Please describe your app:',
            default: 'A app.'
        },{
            name: 'name',
            message: 'What is your name?',
            default: 'C\xE9dric'
        },{
            name: 'github',
            message: 'What is your github?',
            default: 'cedced19'
        },{
            name: 'email',
            message: 'What is your email?',
            default: 'user@domain.com'
        },{
            name: 'angular',
            message: 'Chose a Angular app name:',
            default: 'HelloWorld'
        },{
            type: 'checkbox',
            name: 'modules',
            message: 'Which modules would you like to include?',
            choices: [
                {
                    value: 'animateModule',
                    name: 'angular-animate.js',
                    checked: false
                }, {
                    value: 'cookiesModule',
                    name: 'angular-cookies.js',
                    checked: false
                }, {
                    value: 'resourceModule',
                    name: 'angular-resource.js',
                    checked: false
                }, {
                    value: 'routeModule',
                    name: 'angular-route.js',
                    checked: false
                }, {
                    value: 'sanitizeModule',
                    name: 'angular-sanitize.js',
                    checked: false
                }, {
                    value: 'touchModule',
                    name: 'angular-touch.js',
                    checked: false
                }
            ]
        }];

        this.prompt(prompts, function (props) {
            var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
            this.animateModule = hasMod('animateModule');
            this.cookiesModule = hasMod('cookiesModule');
            this.resourceModule = hasMod('resourceModule');
            this.routeModule = hasMod('routeModule');
            this.sanitizeModule = hasMod('sanitizeModule');
            this.touchModule = hasMod('touchModule');
            this.title = props.title;
            this.description = props.description;
            this.name = props.name;
            this.github = props.github;
            this.email = props.email;
            this.angular = props.angular;

            done();


        }.bind(this));
    },

    bower: function () {
        var bower = {
            name: _.slugify(this.title),
            private: true,
            version: '0.0.0',
            dependencies: {}
        };
        var version = '1.3.15';
        this.components = [];
        if (this.animateModule) {
            bower.dependencies['angular-animate'] = version;
            this.components.push('ngAnimate');
        }
        if (this.cookiesModule) {
            bower.dependencies['angular-cookies'] = version;
            this.components.push('ngCookies');
        }
        if (this.resourceModule) {
            bower.dependencies['angular-resource'] = version;
            this.components.push('ngResource');
        }
        if (this.routeModule) {
            bower.dependencies['angular-route'] = version;
            this.components.push('ngRoute');
        }
        if (this.sanitizeModule) {
            bower.dependencies['angular-sanitize'] = version;
            this.components.push('ngSanitize');
        }
        if (this.touchModule) {
            bower.dependencies['angular-touch'] = version;
            this.components.push('ngTouch');
        }
        bower.dependencies.angular = version;
        this.write('bower.json', JSON.stringify(bower, null, 2));
    },


    app: function () {
        mkdir('dev');
        mkdir('dev/scripts');
        mkdir('dev/styles');

        this.template('dev/index.html', 'dev/index.html');
        this.template('dev/scripts/app.js', 'dev/scripts/app.js');
        this.template('dev/styles/main.css', 'dev/styles/main.css');
        this.template('_package.json', 'package.json');
        this.copy('gitignore', '.gitignore');
        this.template('Gruntfile.js', 'Gruntfile.js');
        this.template('README.md', 'README.md');
    }
});


module.exports = StaticAngularGenerator;
