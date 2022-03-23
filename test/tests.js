var assert = require('assert');
var chai = require('chai');
var chaiFiles = require('chai-files');

chai.use(chaiFiles);
var expect = require('chai').expect;
var file = chaiFiles.file;
var dir = chaiFiles.dir;
//var ejs = require('ejs');
//var document = require('../views/doodlPage.ejs')
//var jsdom = require('mocha-jsdom')

//var router = require('../routes/routing.js');

let t_testWord = "asdasd";
/*
let ejsload = function() {
    ejs.renderFile('index.ejs');
}

//ejs.renderFile('index.ejs');
console.log(ejs.renderFile('index.ejs'));
//global.document = jsdom();

var mjs = require('../views/main.js');
//var hexColRGB = require('../views/main.js').hexColourToRGB;
//var dwSetup = require('../views/main.js').dailyWordSetup;
//var rndWord = require('../views/main.js').randomWord;

describe('main.js functions', function() {
    
    describe('#hexColourToRGB', function() {
        context('with #000000', function() {
            it('should return error', function() {
                expect(hexColRGB("#000000")).to.equal({r:0, g:0, b:0})
            })
        })
    })

    describe('dailyWordSetup()', function() {
        context('with invalid string', function() {
            it('should return -1', function() {
                assert.equal(randomWord.indexOf(t_testWord), -1);
            })
        })

        before(function() {
            t_testWord = "pirate ship";
        })
        context('with string in list', function() {
            it('should return 1', function() {
                assert.equal(rndWord.indexOf(t_testWord), 1);
            })
        })

        context('with non-string arguments', function() {
            it('should throw error', function() {
              expect(function() {
                dwSetup([12, 13, 4, 6])
              }).to.throw(TypeError)
            })
          })
    })
})
*/

describe('Array', function () {
  describe('#dailyWordSetup()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

var request = require('supertest');
var app = require('../routes/routing.js');
describe('GET /', function() {
 it('index found', function(done) {
 //navigate to root and check the the response is "hello world"
 request(app).get('/').expect(file('../views/index.ejs'));
 done();
 });
});

describe('GET /login', function() {
  it('login found', function(done) {
  //navigate to root and check the the response is "hello world"
  request(app).get('/').expect(file('../views/login.ejs'));
  done();
  });
});

describe('GET /register', function() {
  it('register found', function(done) {
  //navigate to root and check the the response is "hello world"
  request(app).get('/').expect(file('../views/register.ejs'));
  done();
  });
});

describe('GET /doodlPage', function() {
  it('doodlPage found', function(done) {
  //navigate to root and check the the response is "hello world"
  request(app).get('/').expect(file('../views/doodlPage.ejs'));
  done();
  });
});

describe('GET /gallery', function() {
  it('gallery found', function(done) {
  //navigate to root and check the the response is "hello world"
  request(app).get('/').expect(file('../views/gallery.ejs'));
  done();
  });
});