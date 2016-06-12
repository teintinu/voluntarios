var _routes = {}

export def registerRoute url, activity, &render_fn
  if _routes[url] 
    throw 'Rota duplicada: ' + url
  _routes[url] = {
    activity: activity,
    render: render_fn
  }
 