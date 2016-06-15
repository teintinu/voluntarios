
require('./array_extensions.js')
require('./string_extensions.js')

import defineModel from './himbaModel'
var himbaActivity = require('./himbaActivity')

var _app, _layout, _activity, _lastsearch, _invalidate_tm

class Himba
  def boot app
    activate app.home
    _app = app
    _layout = app.createApplicationLayout()

  def app
    _app

  def title
    _app.title _activity

  def menuItems
    himbaActivity.activities.map do |a|
      {
        name: a['name'],
        title: a['title'],
        icon: a['icon'],
        state: a['state'],
        href: a['href']
        ontap: do
          activate a['name']
      }

  def actions
    _activity ? _activity['actions'] : []

  def mainView
    try
      _activity ? _activity.view : []
    catch e
      <pre>
        e['stack'] ? e['stack'].toString: e


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

  def open_search text
    debugger
    if _lastsearch != text
      _lastsearch = text
      var found = _app.onSearch text
      if _activity && _activity['onSearch']
        found = found.concat(_activity['onSearch'].call(_activity, text))

  def invalidate
    if _invalidate_tm
      clearTimeout _invalidate_tm
    _invalidate_tm = setTimeout( &, 1 ) do
      if _layout
        _layout.render
      if _activity
        _activity.view.render


export defineModel

export def defineActivity opts
  himbaActivity.defineActivity opts

export var himba = Himba.new

