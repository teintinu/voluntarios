
var _app, _layout, _content;

var _routes = {}
var _contents = []

export var h5 = {
  boot(app) {
    linkContent(app.home());
    _app = app    
    _layout = app.createApplicationLayout()
  },
  get app() {
    return _app
  },
  get menuItems() {
    return _contents
  },
  get content() {
    return _content
  },
  route(url) {
    var r = _routes[url];    
    r.content.route(url)
  }
}

export function defineState (schema) {
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
     var _val=_def.value
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
  });
  Object.defineProperties(state, props);
  return Object.freeze(state);
  function changed() {
    listeners.forEach( (fn) => setTimeout(fn, 1) )
  }
}

export function defineContent (opts) {
  var _title = opts.title
  var _icon = opts.icon
  var _visible = opts.visible
  var _state = opts.state;
  var firstRoute = Object.keys(opts.routes)[0];
  var _view
  var content = {
    get title(){
      return _title
    },
    set title(value) {
      _title = value
      invalidate()
    },
    get icon(){
      return _icon
    },
    set icon(value) {
      _icon = value
      invalidate()
    },
    get state(){
      return _state
    },
    get visible(){
      return _visible
    },
    view() {
      if (!_view)         
        h5.route(firstRoute);      
      return _view;
    },
    route(url) {
      var r = _routes[url];    
      _view = r.render.call({
        state() {
          return r.content.state
        }
      });
    },    
    get actions() {
      return [
       {
         title: 'Adicionar',
         ontap() {
           h5.content.title = 'x'
           invalidate()
         }
       },
       {
         title: 'Editar',
         ontap() {
           h5.content.title = 'y'
           invalidate()
         }
       },
       {
         title: 'Remover',
         ontap() {
           h5.content.title = 'z'
           invalidate()
         }
       }
     ]
    }
  }
  Object.keys(opts.routes).forEach(registerRoute);
  _contents.push(content)
  return content
  function registerRoute(route) {
    if (_routes[route]) throw new Error('Rota duplicada: ' + route);
    _routes[route] = {
      content,
      render: opts.routes[route]
    }
  }
}

var tm_invalidate;
function invalidate() {
  if (_layout) {
    if (tm_invalidate) clearTimeout(tm_invalidate);
    setTimeout( () => {
      _layout.render()
      _content && _content.view().render();
    }, 20);
  }
}

function linkContent(content) {  
  if (_content) unlinkContent();

  _content = content;

  _content.state.on(invalidate);
  invalidate();
}

function unlinkContent() {
  _content.state.off(invalidate);
}
