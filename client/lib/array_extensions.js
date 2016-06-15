

Array.prototype.binarySearch = function binarySearch(el, compare_fn) {
	compare_fn = compare_fn || this.compare_fn
    var m = 0;
    var n = this.length - 1;
    while (m <= n) {
        var k = (n + m) >> 1;
        var t = this[k];
        var cmp = compare_fn(el, t);
        if (cmp > 0) {
            m = k + 1;
        } else if(cmp < 0) {
            n = k - 1;
        } else {
            return t;
        }
    }
    return undefined;
}

Array.prototype.binarySearchIdx = function binarySearch(el, compare_fn) {
	compare_fn = compare_fn || this.compare_fn
    var m = 0;
    var n = this.length - 1;
    while (m <= n) {
        var k = (n + m) >> 1;
        var cmp = compare_fn(el, this[k]);
        if (cmp > 0) {
            m = k + 1;
        } else if(cmp < 0) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return -m - 1;
}

Array.prototype.binaryInsert = function binaryInsert(el, compare_fn) {
  var i = -this.binarySearchIdx(el, compare_fn);
  if (i > 0)
  	this.splice(i, 0, el);
  return;
}

Array.prototype.binaryRemove = function binaryRemove(el, compare_fn) {
  var i = this.binarySearchIdx(el, compare_fn);
  if (i >= 0)
  	this.splice(i, 1);
  return i;
}

Array.prototype.numberComparing = function() {
  this.compare_fn = function (a, b) {
  	return a - b;
  }
}

Array.prototype.dateComparing = function() {
  this.compare_fn = function (a, b) {
  	if (!a) {
  		if (!b) return 0;
  		return -1;
  	}
  	if (!b) return 1;
  	return a.getTime() - b.getTime();
  }
}

Array.prototype.stringComparing = function() {
  this.compare_fn = function (a, b) {
  	if (!a) {
  		if (!b) return 0;
  		return -1;
  	}
  	if (!b) return 1;
  	if (a < b) return -1;
  	if (a > b) return 1;
  	return 0;
  }
}

Array.prototype.filterWithRelevance = function (fn) {
  var r = this.reduce( function (r, item) {
    var relevance = fn(item);
    if (relevance >= 0)
      r.push({item, relevance})
    return r;
  }, []);
  r.sort((a, b) => b.relevance - a.relevance);
  return r.map ( (i) => i.item);
}

Array.prototype.random = function() {
  debugger
  var i = Math.floor(Math.random() * this.length);
  return this[i];
}
