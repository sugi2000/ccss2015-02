var fs = require('fs');
var parseString = require('xml2js').parseString;
var parse = require('svg-path-parser');

var svgFiles = [];

// get file list
fs.readdir('svg/', function(err, files) {
	if (err) { throw err; }
	files.filter(function(file) {
		return fs.statSync('svg/' + file).isFile() && /.*\.svg$/.test(file);
	    }).forEach(function(file) {
		    svgFiles.push(file);
		});
	svgFiles.forEach(parseSVG);
    });

function parseSVG (file, index, array) {
	fs.readFile('svg/' + file, 'utf8', function (err, text) {
	        if (err) { console.log(err); }
		parseString(text, {
			trim: true,
			explicitArray: false
			}, function (err, result) {
			//console.dir(result);
			var json = JSON.parse(JSON.stringify(result));

			//console.dir(JSON.stringify(result));

			var d = [];
			if (json.svg.g) {
				//console.log('json.svg.g.path.length', json.svg.g.path.length);
				if (json.svg.g.path.length) {
					for (var i = 0; i < json.svg.g.path.length; i++) {
						d.push(json.svg.g.path[i]['$'].d);
					}
				} else {
					d.push(json.svg.g.path['$'].d);
				}
			} else {
				for (var i = 0; i < json.svg.path.length; i++) {
					d.push(json.svg.path[i]['$'].d);
				}
			}
			//console.dir(parse(d));

			var strArray = [];
			for (var i = 0; i < d.length; i++) {
				strArray.push(JSON.stringify(parse(d[i])));
			}
			var writeString = strArray.join(',');

			fs.writeFile('json/' + file.split('.')[0] + '.json', writeString, function (err) {
				    if (err) { console.log(err); }
				});
		    });
	});
}




    //fs.writeFile('json/test.json', JSON.stringify(parse(d)), function (err) {
    //	if (err) { console.log(err); }
    //});
