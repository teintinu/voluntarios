
extern location

require('./array_extensions.js')
require('./string_extensions.js')

import defineModel from './himbaModel'
import getRoute from './himbaRouter.js'
var himbaActivity = require('./himbaActivity')
var Tracker = require('../lib/himbaTracker.js')

var _app, _layout, _activity, _lastsearch, _invalidate_tm

class Himba
  def boot app
    @dep_title = dependency
    @dep_activity = dependency
    activateUrl null
    _app = app
    _layout = app.createApplicationLayout()

  def app
    _app

  def title
    @dep_title.depend()
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

  def navigate url, replace = yes
    if replace
      history.replaceState(state,null,href)
      refresh
    else
      history.pushState(state,null,href)

  def activateUrl url
    var r = getRoute url

    if _activity
      deactivate()

    _activity = r['activity']
    _activity.dispatch r

  def activate activityName
    if _activity
      deactivate()

    _activity = himbaActivity.getActivity activityName

    _activity['state'].on do invalidate
    invalidate


  def deactivate
    _activity['state'].off do invalidate

  def open_search text
    if _lastsearch != text
      _lastsearch = text
      var found = _app.onSearch text
      if _activity && _activity['onSearch']
        found = found.concat(_activity['onSearch'].call(_activity, text))

  def dependency
    Tracker['Dependency'].new

  def autorun cb
    Tracker.autorun cb

export defineModel

export def defineActivity opts
  himbaActivity.defineActivity opts

export var himba = window['himba'] = Himba.new

