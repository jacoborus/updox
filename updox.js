'use strict';

var dox = require('mdox'),
	fs = require('fs'),
	Handlebars = require('handlebars'),
	glob = require('glob'),
	path = require('path'),
	mkdirp = require('mkdirp');


// handlebars helpers

Handlebars.registerHelper('tagList', function (arr) {
	var i, list = [];
	for (i in arr) {
		if (arr[i].type === 'param') {
			list.push( arr[i].name );
		}
	}
	return list.join(', ');
});

Handlebars.registerHelper('typeList', function (arr) {
	var i, list = [];
	for (i in arr) {
		list.push( arr[i] );
	}
	return list.join('|');
});

Handlebars.registerHelper('paramName', function (tag) {
	if (tag.type === 'return') {
		return 'Return';
	} else {
		return tag.name;
	}
});


var templateFile = fs.readFileSync( path.resolve( __dirname, 'template.mustache'), 'utf8');
var template = Handlebars.compile(templateFile);


var renderFile = function (filepath, opts) {
	var file = fs.readFileSync(filepath, 'utf8');
	var data = dox.jsonGenerate(file, { raw: true });
	var docname = path.basename( filepath, path.extname( filepath ));
	var mdown = template({data: data, title: docname});
	var filename = opts.destname || docname;
	fs.writeFileSync( path.resolve( opts.dest, filename + '.md'), mdown );
};

/**
 * updox
 *
 * Options:
 *
 * - `dest`: documentation folder ('./docs' by default)
 * - `destname`: name of docfile (only when one file is documented)
 *
 * @param  {String} route   glob path of javascript files
 * @param  {Object} options
 * @return {Array}         list of documented files
 */

var updox = function (route, options) {
	var opts = options || {};
	opts.dest = opts.dest || './docs';
	opts.destname = opts.destname || false;
	route = route || './*.js';
	mkdirp( opts.dest, function (err) {
		if (err) {
			console.error(err);
		} else {
			// options is optional
			glob( route, function (err, files) {
				var f;
				if (err) {
					throw err;
				}
				for (f in files) {
					renderFile( files[f], opts );
				}
			});
		}
	});
};

module.exports = updox;