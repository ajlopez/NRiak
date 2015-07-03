
var buckets = require('../lib/buckets');
var async = require('simpleasync');

var bucket;

exports['create bucket'] = function (test) {
    test.async();
    buckets.createBucket(function (err, data) {
        test.equal(err, null);
        test.ok(data);
        test.equal(typeof data, 'object');
        bucket = data;
        test.done();
    });
};

exports['store and fetch value'] = function (test) {
    test.async();
    
    async()
    .then(function (data, next) {
        bucket.store({ key: 'adam', value: { name: 'Adam', age: 800 } }, next);
    })
    .then(function (data, next) {
        bucket.fetch({ key: 'adam' }, next);
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

exports['store without key and fetch value'] = function (test) {
    test.async();
    
    var key;
    
    async()
    .then(function (data, next) {
        bucket.store({ value: { name: 'Sam', age: 20 } }, next);
    })
    .then(function (data, next) {
        key = data;
        bucket.fetch({ key: key }, next);
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
        bucket.store({ key: 'john', value: { name: 'John', age: 100 } }, next);
    })
    .then(function (data, next) {
        bucket.fetch({ key: 'john' }, next);
    })
    .then(function (data, next) {
        test.ok(data);
        test.ok(Array.isArray(data));
        test.equal(data.length, 1);
        var obj = data[0];
        test.equal(obj.name, 'John');
        test.equal(obj.age, 100);
        bucket.remove({ key: 'john' }, next);
    })
    .then(function (data, next) {
        bucket.fetch({ key: 'john' }, next);
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

