
var nriak = require('..');

var base;

exports['create base'] = function (test) {
    test.async();
    nriak.createBase(function (err, data) {
        test.equal(err, null);
        test.ok(data);
        test.equal(typeof data, 'object');
        base = data;
        test.done();
    });
}