'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


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
      message: 'Please describe your app:'
    },{
      name: 'name',
      message: 'What is your name?'
    },{
      name: 'github',
      message: 'What is your github?'
    },{
      name: 'email',
      message: 'What is your email?'
    },{
      name: 'angular',
      message: 'Chose a Angular app name:'
    }];

    this.prompt(prompts, function (props) {
      this.title = props.title;
      this.description = props.description;
      this.name = props.name;
      this.github = props.github;
      this.email = props.email;
      this.angular = props.angular;

      done();

      var extractGeneratorName = function (_, appname) {
        var slugged = _.slugify(title);
        var match = slugged.match(/^$/);

        if (match && match.length === 2) {
          return match[1].toLowerCase();
      }

      return slugged;
      };
        }.bind(this));
      },


    app: function () {
      this.mkdir('dev');
      this.mkdir('dev/scripts');
      this.mkdir('dev/styles');

      this.template('dev/index.html', 'dev/index.html');
      this.template('dev/scripts/app.js', 'dev/scripts/app.js');
      this.copy('dev/scripts/angular.min.js', 'dev/scripts/angular.min.js');
      this.template('dev/styles/main.css', 'dev/styles/main.css');
      this.copy('_package.json', 'package.json');
      this.copy('gitignore', '.gitignore');
      this.copy('_bower.json', 'bower.json');
      this.copy('jshintrc', '.jshintrc');
      this.template('Gruntfile.js', 'Gruntfile.js');
      this.template('README.md', 'README.md');
    },


    projectfiles: function () {
    }
  });


module.exports = StaticAngularGenerator;
