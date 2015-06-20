
function ObjectBase() {
    this.buckets = { };
}

ObjectBase.prototype.store = function (data, cb) {
    var bucket;
    
    if (!this.buckets[data.bucket])
        bucket = this.buckets[data.bucket] = { };
    else
        bucket = this.buckets[data.bucket];
        
    bucket[data.key] = data.value;
    
    cb(null, null);
};

ObjectBase.prototype.fetch = function (data, cb) {
    var result = [];
    
    var bucket = this.buckets[data.bucket];
    
    if (bucket[data.key])
        result.push(bucket[data.key]);
    
    cb(null, result);
}

module.exports = {
    createBase: function (cb) { cb(null, new ObjectBase()); }
}

