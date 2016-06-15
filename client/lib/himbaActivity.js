var _activities = []

var Tracker = require('../lib/himbaTracker.js')

_activities.compare_fn = function (a, b) {
  if (!a) {
    if (!b) return 0;
    return -1;
   }
  if (!b) return 1;
  if (typeof a === 'object') a = a.name;
  if (typeof b === 'object') b = b.name;
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

import {getRoute, registerRoute} from './himbaRouter.js'

export function defineActivity (opts) {
  var _name = opts.name
  var _title = opts.title
  var _icon = opts.icon
  var _visible = opts.visible
  var _state = opts.state
  var _route = opts.route
  var _view
  var _activity = {
    get name(){
      return _name
    },
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
    get href() {
      return _route
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
    onSearch: opts.onSearch,
    view() {
      if (!_view)
        _activity.route(getRoute(_route));
      return _view;
    },
    dispatch(route) {
      //r.activity.state.dispatch
      _view = route.render.call({
        state() {
          return route.activity.state
        },
        param() {
          return route.params
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
  if (_activities.binaryInsert(_activity) < 0) throw "atividade já existe: " + _activity.name
  registerRoute(opts.route, _activity, opts.steps[0]['render'])
  return _activity
}

export function getActivity (activityName) {
  return _activities.binarySearch(activityName);
}

export function activities () {
  return _activities;
}
