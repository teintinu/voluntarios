
import './charts.css'
# import generateArcPath from '../svgutils.ts'
var d3path = require('d3-path')
var color = require('color')

tag chartDonut < div
  prop total
  prop slices

  prop size

  def render
    <self>
      <svg:svg viewBox="0 0 100 100" width="{size}" height="{size}" fill="transparent" >  for s,i in slices
        <svg:g>
          <svg:path d=generateCirclePath(s,i) stroke="{color(s['donutColor']).lighten(0.6).hexString()}" stroke-width="{s['stroke'] || 10}" fill="none">
          <svg:path d=generateArcPath(s,i) stroke="{s['donutColor']}" stroke-width="{s['stroke'] || 10}" fill="transparent">
          <svg:text x="50%" y="50%" text-anchor="middle" fill="{s['textColor']}" dy=".3em">
            percent(s)
            '%'

  def percent s
    return Math.floor(s['value']*100/total)

  def generateCirclePath s,i
    var x = 50
    var y = 50
    var radius = 45
    var startAngle = 0
    var endAngle = Math.PI*2
    var d=d3path.path()
    d.arc(x,y,radius,startAngle, endAngle)
    return d.toString()

  def generateArcPath s, i
    var x = 50
    var y = 50
    var radius = 45
    var startAngle = -Math.PI/2
    var p = s['value']/total * Math.PI*2
    var endAngle = p + startAngle
    var d=d3path.path()
    d.arc(x,y,radius,startAngle, endAngle)
    return d.toString()



  # arc.centroid = function() {
  #   var r = (innerRadius.apply(this, arguments)
  #       + outerRadius.apply(this, arguments)) / 2,
  #       a = (startAngle.apply(this, arguments)
  #       + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
  #   return [Math.cos(a) * r, Math.sin(a) * r];
  # };
