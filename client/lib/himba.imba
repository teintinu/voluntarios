
require('./array_extensions.js')

import defineModel from './himbaModel'
var himbaActivity = require('./himbaActivity')

var _app, _layout, _activity, _invalidate_tm

class Himba 
  def boot app
    activate app.home
    _app = app    
    _layout = app.createApplicationLayout()

  def app
    _app

  def title
    (_activity ? _activity['title'] + ' - ' : '') + _app['title']

  def menuItems
    himbaActivity.menuItems

  def actions
    _activity ? _activity['actions'] : []

  def mainView
    _activity ? _activity['view'] : []
  
  def activity
    return _activity
  
  def route url 
    var r = _routes[url]
    r._activity.route url

  def activate activityName
    if _activity
      deactivate()

    _activity = himbaActivity.getActivity activityName

    _activity['state'].on do invalidate
    invalidate


  def deactivate
    _activity['state'].off do invalidate


  def invalidate 
    if _invalidate_tm
      clearTimeout _invalidate_tm
    _invalidate_tm = setTimeout( &, 1 ) do
      if _layout 
        _layout.render
      # if _activity 
      #   _activity.view.render


export defineModel

export def defineActivity opts
  himbaActivity.defineActivity opts

export var himba = Himba.new

