#! /usr/bin/env node
// Source: https://gist.github.com/ryanflorence/701407
let aArguments = process.argv;
const libFile = require('../libraries/libFile');
const libArgs = require('../libraries/libArgs');

let oResponse = libArgs.getArguments(3);
let iPortNumber = 0;
if (oResponse.success === false) {
    iPortNumber = 4000;
} else {
    iPortNumber = oResponse.data[2];
}

let sCwd = process.cwd();
let sIndexHtmlPath = sCwd + '/index.html';

if (!libFile.isFileExists(sIndexHtmlPath)) {
    console.log('Not a valid SAPUI5 project.');
    process.exit(1);
}

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = iPortNumber;

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname,
    filename = path.join(process.cwd(), uri);

    fs.exists(filename, function(exists) {
        if (!exists) {
            response.writeHead(404, {
            "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if (err) {
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write(err + "\n");
            response.end();
            return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");