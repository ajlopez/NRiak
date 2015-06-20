
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
};

exports['store and fetch value'] = function (test) {
    test.async();
    
    base.store({ bucket: 'bucket1', key: 'adam', value: { name: 'Adam', age: 800 } }, function (err, data) {
        test.equal(err, null);
        
        base.fetch({ bucket: 'bucket1', key: 'adam' }, function (err, data) {
            test.equal(err, null);
            test.ok(data);
            test.ok(Array.isArray(data));
            test.equal(data.length, 1);
            var obj = data[0];
            test.equal(obj.name, 'Adam');
            test.equal(obj.age, 800);
            test.done();
        });
    });
};