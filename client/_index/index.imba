

require './material.cyan-light_blue.min.css'
require './index.css'

import himba from '../lib/himba'
import CVV_app from './cvv_app.ts'

himba.boot CVV_app

# tag test

#   prop count

#   def initialize
#     super
#     @count = 1

#   def render
#     <self>
#       <div> @count
#       <button :tap='inc'> 'Increment'

#   def inc
#     count++
#     render

# $$(body).append <test>
