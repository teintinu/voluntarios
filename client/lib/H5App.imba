
import applayout from './layout/applayout'

export class H5App 
  prop title
  prop sidebarMenuItems
  prop actionMenuItems
  prop content

  def createApplicationLayout
    var layout = <applayout>
    $$(body).append layout
    layout

