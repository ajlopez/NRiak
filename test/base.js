
var nriak = require('..');
var async = require('simpleasync');

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
};

exports['store and fetch value'] = function (test) {
    test.async();
    
    async()
    .then(function (data, next) {
        base.store({ bucket: 'bucket1', key: 'adam', value: { name: 'Adam', age: 800 } }, next);
    })
    .then(function (data, next) {
        base.fetch({ bucket: 'bucket1', key: 'adam' }, next);
    })
    .then(function (data, next) {
        test.ok(data);
        test.ok(Array.isArray(data));
        test.equal(data.length, 1);
        var obj = data[0];
        test.equal(obj.name, 'Adam');
        test.equal(obj.age, 800);
        test.done();
    })
    .fail(function (err) {
        test.fail(err);
    })
    .run();
};

