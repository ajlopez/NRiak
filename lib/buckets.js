
function Bucket() {
    this.values = { };
    this.maxid = 0;
}

Bucket.prototype.store = function (data, cb) {    
    var key = data.key;
    
    if (!key)
        key = ++this.maxid;
        
    this.values[key] = data.value;
    
    cb(null, key);
};

Bucket.prototype.fetch = function (data, cb) {
    var result = [];
    
    if (this.values[data.key])
        result.push(this.values[data.key]);
    
    cb(null, result);
}

Bucket.prototype.find = function (data, cb) {
    var result = [];
    
    for (var key in this.values)
        result.push(this.values[key]);
    
    cb(null, result);
}

Bucket.prototype.remove = function (data, cb) {    
    delete this.values[data.key];

    cb(null, null);
}

module.exports = {
    createBucket: function (cb) { cb(null, new Bucket()); }
}

