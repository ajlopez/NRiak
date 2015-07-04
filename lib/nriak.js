
var buckets = require('./buckets');

function ObjectBase() {
    this.buckets = { };
    this.maxid = 0;
}

ObjectBase.prototype.store = function (data, cb) {
    if (!this.buckets[data.bucket]) {
        var self = this;
        
        buckets.createBucket(function (err, bucket) {
            if (err) {
                cb(err, null);
                return;
            }
            
            self.buckets[data.bucket] = bucket;
            
            bucket.store(data, cb);
        });
        
        return;
    }

    var bucket;
    
    bucket = this.buckets[data.bucket];
    
    bucket.store(data, cb);
};

ObjectBase.prototype.fetch = function (data, cb) {
    if (!this.buckets[data.bucket])
        return [];
    else
        return this.buckets[data.bucket].fetch(data, cb);
}

ObjectBase.prototype.remove = function (data, cb) {
    if (!this.buckets[data.bucket])
        cb(null, null);
    else
        this.buckets[data.bucket].remove(data, cb);
}

module.exports = {
    createBase: function (cb) { cb(null, new ObjectBase()); }
}

