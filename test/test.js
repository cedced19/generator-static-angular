'use strict';
var path = require('path'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert;

describe('Static Angular generator', function () {
  // not testing the actual run of generators yet
  it('the generator can be required without throwing', function () {
    this.app = require('../app');
  });

  describe('run test', function () {

    var expectedContent = [
      ['.bowerrc', /"directory": "dev\/bower_components"/],
      ['package.json', /"version": "0.0.0"/]
    ];
    var expected = [
      '.bowerrc',
      '.gitignore',
      'gulpfile.js',
      'package.json',
      'bower.json',
      'README.md',
      'dev/index.html',
      'dev/styles/main.css',
      'dev/scripts/app.js'
    ];

    var options = {
      'skip-install-message': true,
      'skip-install': true,
      'skip-welcome-message': true,
      'skip-message': true
    };

    var runGen;

    beforeEach(function () {
      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withGenerators([[helpers.createDummyGenerator(), 'mocha:app']]);
    });

     it('creates expected files', function (done) {
      runGen.withOptions(options).withPrompt({
       modules: []
      }).on('end', function () {

        assert.file(expected);
        assert.fileContent(expectedContent);

        assert.noFileContent([
          ['dev/scripts/app.js', /ng[A-Z][a-z]+/]
        ]);
        done();
      });
    });
  });
});
