
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
    .run();
};

exports['store without key and fetch value'] = function (test) {
    test.async();
    
    var key;
    
    async()
    .then(function (data, next) {
        base.store({ bucket: 'bucket1', value: { name: 'Sam', age: 20 } }, next);
    })
    .then(function (data, next) {
        key = data;
        base.fetch({ bucket: 'bucket1', key: key }, next);
    })
    .then(function (data, next) {
        test.ok(data);
        test.ok(Array.isArray(data));
        test.equal(data.length, 1);
        var obj = data[0];
        test.equal(obj.name, 'Sam');
        test.equal(obj.age, 20);
        test.done();
    })
    .fail(function (err) {
        test.fail(err);
    })
    .run();
};

exports['store, remove and fetch value'] = function (test) {
    test.async();
    
    async()
    .then(function (data, next) {
        base.store({ bucket: 'bucket1', key: 'john', value: { name: 'John', age: 100 } }, next);
    })
    .then(function (data, next) {
        base.fetch({ bucket: 'bucket1', key: 'john' }, next);
    })
    .then(function (data, next) {
        test.ok(data);
        test.ok(Array.isArray(data));
        test.equal(data.length, 1);
        var obj = data[0];
        test.equal(obj.name, 'John');
        test.equal(obj.age, 100);
        base.remove({ bucket: 'bucket1', key: 'john' }, next);
    })
    .then(function (data, next) {
        base.fetch({ bucket: 'bucket1', key: 'john' }, next);
    })
    .then(function (data, next) {
        test.ok(data);
        test.ok(Array.isArray(data));
        test.equal(data.length, 0);
        test.done();
    })
    .fail(function (err) {
        test.fail(err);
    })
    .run();
};


