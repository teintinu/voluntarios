extend tag ul
  attr for

extend tag i
  attr role

extend tag svg:svg
  attr viewBox
  attr fill

extend tag svg:path
  attr fill
  attr stroke-dasharray

extend tag svg:text
  attr fill

var renderTracked = do
  var _this=this
  Imba.autorun do |comp|
    _this.render
    Imba['mdl_sync']()
  return self

Imba['Tag']['prototype']['build'] = renderTracked
Imba['Tag']['prototype']['commit'] = renderTracked
Imba['Tag']['prototype']['tick'] = renderTracked
