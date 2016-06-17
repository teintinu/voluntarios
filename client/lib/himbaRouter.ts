declare function require(s: string): any;

import {Action} from './himbaSchema';

var _routes: Route[] = [];
var _root: string;
var _mode: 'history' | 'hash';
var _onError: (e: Error) => void;

export interface Route {
  path: string,
  regexp: RegExp,
  params: string[],
  action: Action<any>
}

export function registerRoute<T>(path: string, action: Action<T>) {
  if (!/^\/[\/:\w]*$/.test(path)) throw 'Rota inválida: ' + path;
  path = path.substr(1);
  var r = getRoute(path);
  if (r) throw 'Rota duplicada: ' + path;
  var re_params = /:([^\/]*)/g;
  var params: string[] = re_params.exec(path);
  if (params) params.shift();
  else params = [];
  var regexp = new RegExp('^' + path.replace(re_params, '([^\/]*)').replace(/\//g, '\\/') + '$')
  r = {
    path,
    regexp,
    params,
    action
  }
  _routes.push(r);
}

export function getRoute(path: string): Route {
  var fragment = path || getFragment();
  for (var i = 0; i < _routes.length; i++) {
    var r = _routes[i]
    var match = fragment.match(r.regexp);
    if (match) return r
  }
  return null;
}

export function configRouter(options) {
  _mode = options && options['mode'] && options['mode'] == 'history' && !!(history['pushState']) ? 'history' : 'hash';
  _root = options && options.root ? '/' + clearSlashes(options.root) + '/' : '/';
  setTimeout(listen, 100);
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

function clearSlashes(path) {
  return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

export function expandRoutePath(path) {
  if (_mode === 'history')
    return _root + clearSlashes(path);
  return window.location.href.replace(/#(.*)$/, '') + '#' + path;
}

export function navigate(path) {
  path = path ? path : '';
  if (_mode === 'history') {
    history.pushState(null, null, expandRoutePath(path));
  } else {
    window.location.href = expandRoutePath(path);
  }
}

export function execRoute(path: string): void {
  var fragment = path || getFragment();
  for (var i = 0; i < _routes.length; i++) {
    var r = _routes[i]
    var match = fragment.match(r.regexp);
    if (match) {
      match.shift();
      var params = {};
      r.params.forEach(function(p, i) {
        params[p] = match[i];
      })
      r.action.execute(params);
    }
  }
}

var tm_listen;

function listen() {
  var current = getFragment();
  var fn = function() {
    var n = getFragment();
    if (current !== n) {
      current = n;
      execRoute(current);
    }
  }
  clearInterval(tm_listen);
  tm_listen = setInterval(fn, 50);
}
