
var _routes = []
var _root, _mode, _onError

export function registerRoute(url, activity, render_fn) {
  if (!/^\/[\/:\w]*$/.test(url)) throw 'Rota inválida: ' + url
  url = url.substr(1)
  var r=getRoute(url)
  if (r) throw 'Rota duplicada: ' + url
  var re_params = /:([^\/]*)/g;
  var params = re_params.exec(url)
  if (params) params.shift()
  else params = [];
  var regexp = new RegExp('^'+url.replace(re_params, '([^\/]*)').replace(/\//g, '\\/')+'$')
  r = {
    url,
    regexp,
    params,
    activity,
    render: render_fn
  }
  _routes.push(r)
}

export function getRoute(path) {
  var fragment = path || getFragment();
  for(var i=0; i<_routes.length; i++) {
    var r = _routes[i]
    var match = fragment.match(r.regexp);
    if(match) {
      match.shift();
      var params = {};
      r.params.forEach( function( p, i) {
        params[p] = match[i];
      })
      return {
        activity: r.activity,
        render: r.render,
        params
      }
    }
  }
}

export function configRouter(options) {
  _mode = options && options['mode'] && options['mode'] == 'history' && !!(history['pushState']) ? 'history' : 'hash'
  _root = options && options.root ? '/' + clearSlashes(options.root) + '/' : '/'
}

function getFragment() {
  var fragment = ''
  if (_mode === 'history') {
    fragment = clearSlashes(decodeURI(location.pathname + location.search))
    fragment = fragment.replace(/\?(.*)$/, '')
    fragment = _root != '/' ? fragment.replace(_root, '') : fragment
  }
  else {
    var match = location.href.match(/#(.*)$/)
    fragment = match ? match[1] : ''
  }
  return clearSlashes(fragment)
}

function clearSlashes (path) {
  return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

    // listen: function() {
    //     var self = this;
    //     var current = self.getFragment();
    //     var fn = function() {
    //         if(current !== self.getFragment()) {
    //             current = self.getFragment();
    //             self.check(current);
    //         }
    //     }
    //     clearInterval(this.interval);
    //     this.interval = setInterval(fn, 50);
    //     return this;
    // },

export function navigate(path) {
  path = path ? path : '';
  if(_mode === 'history') {
      history.pushState(null, null, _root + clearSlashes(path));
  } else {
      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
  }
}


configRouter({mode: 'history', root: '/'});
