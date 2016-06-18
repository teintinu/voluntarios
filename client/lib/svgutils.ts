export var π = Math.PI
export var τ = 2 * π
export var halfπ = π / 2
export var ε = 1e-6
export var ε2 = ε * ε
export var d3_radians = π / 180
export var d3_degrees = 180 / π
export var d3_svg_arcOffset = -halfπ
export var d3_svg_arcMax = τ - ε

export function generateArcPath(innerRadius: number, outerRadius: number, startAngle: number, endAngle: number): String {
  var r0 = innerRadius
  var r1 = outerRadius
  var a0 = startAngle + d3_svg_arcOffset
  var a1 = endAngle + d3_svg_arcOffset
  var da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0)
  var df = da < π ? "0" : "1"
  var c0 = Math.cos(a0)
  var s0 = Math.sin(a0)
  var c1 = Math.cos(a1)
  var s1 = Math.sin(a1)

return da >= d3_svg_arcMax
      ? (r0
      ? "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "M0," + r0
      + "A" + r0 + "," + r0 + " 0 1,0 0," + (-r0)
      + "A" + r0 + "," + r0 + " 0 1,0 0," + r0
      + "Z"
      : "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "Z")
      : (r0
      ? "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L" + r0 * c1 + "," + r0 * s1
      + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0
      + "Z"
      : "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L0,0"
      + "Z");
}
