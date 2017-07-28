'use strict';

function getPath(key) {
  if (!key) {
    return [];
  } else {
    return key.split('.');
  }
}

/**
 * In-memory storage
 */
function Store() {
  this.store = {};
}

Store.prototype = {

  /**
   *
   * @param  {String} key string path (optional)
   * @return {*}      value or undefined
   */
  get: function (key) {
    var target = this.store;
    var path = getPath(key);
    while (path.length > 0) {
      key = path.shift();
      if (target && target.hasOwnProperty(key)) {
        target = target[key];
        continue;
      }
      return undefined;
    }

    return target;
  },

  /**
   *
   * @param  {String}  key string path (optional)
   * @param  {*}       val JSON serializable value
   * @return {boolean} true if set; false otherwise
   */
  set: function (key, val) {
    if (val === undefined) {
      val = key;
      key = null;
    }
    var path = getPath(key);
    if (path.length === 0) {
      // root must be an object
      if (!val || typeof val !== 'object') {
        return false;
      } else {
        this.store = val;
        return true;
      }
    }

    var target = this.store;
    while (path.length > 1) {
      key = path.shift();
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }

      target = target[key];
    }

    key = path.shift();
    target[key] = val;
    return true;
  },


  merge: function (key, val) {
    if (typeof val !== 'object' || Array.isArray(val) || val === null) {
      return this.set(key, val);
    }

    var self = this;
    var target = this.store;
    var path = getPath(key);
    var fullKey = key;

    // Scope into the object to get the appropriate nested context
    while (path.length > 1) {
      key = path.shift();
      if (!target[key]) {
        target[key] = {};
      }

      target = target[key];
    }

    // Set the specified value in the nested JSON structure
    key = path.shift();

    //
    // If the current value at the key target is not an `Object`,
    // or is an `Array` then simply override it because the new value
    // is an Object.
    //
    if (typeof target[key] !== 'object' || Array.isArray(target[key])) {
      target[key] = val;
      return true;
    }

    return Object.keys(val).every(function (nested) {
      return self.merge([fullKey, nested].join('.'), val[nested]);
    });
  },

  /**
   *
   */
  clear: function () {
    this.store = {};
  },

  print: function () {
    console.dir(this.store);
  },

  save: function () {
    return Promise.resolve(); // noop by default
  }
};

module.exports = new Store();
