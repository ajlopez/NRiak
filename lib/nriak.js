
function ObjectBase() {
    this.buckets = { };
    this.maxid = 0;
}

ObjectBase.prototype.store = function (data, cb) {
    var bucket;
    
    if (!this.buckets[data.bucket])
        bucket = this.buckets[data.bucket] = { };
    else
        bucket = this.buckets[data.bucket];
    
    var key = data.key;
    
    if (!key)
        key = ++this.maxid;
        
    bucket[key] = data.value;
    
    cb(null, key);
};

ObjectBase.prototype.fetch = function (data, cb) {
    var result = [];
    
    var bucket = this.buckets[data.bucket];
    
    if (bucket[data.key])
        result.push(bucket[data.key]);
    
    cb(null, result);
}

ObjectBase.prototype.remove = function (data, cb) {
    var bucket = this.buckets[data.bucket];
    
    delete bucket[data.key];

    cb(null, null);
}

module.exports = {
    createBase: function (cb) { cb(null, new ObjectBase()); }
}

