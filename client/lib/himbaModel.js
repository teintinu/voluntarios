
export function defineModel (schema) {
  var listeners = [];
  var state = {
    on(fn) {
      listeners.push(fn);
    },
    off(fn) {
      var i = listeners.indexOf(fn);
      if (i>=0) listeners.splice(i,1);
    }
  }
  var props = {}
  Object.keys(schema).forEach( (propname) => {
     var _def=schema[propname]
     if (typeof _def === 'function')
       props[propname] = {
         value: _def
       }
     else {
       if (!_def.type) throw new Error('schema error in ' + propname);
       var _val= _def.value
       props[propname] = {
         get() {
           //console.log('get ',propname,'=',_val)
           return _val;
         },
         set(value) {
           _val = value;
           //console.log('set ',propname,'=',_val)
           changed();
         }
       }
     }
  });
  Object.defineProperties(state, props);
  return Object.freeze(state);
  function changed() {
    listeners.forEach( (fn) => setTimeout(fn, 1) )
  }
}
