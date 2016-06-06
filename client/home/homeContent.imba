  
import defineState from '../lib/h5'
import defineContent from '../lib/h5'
import lista_voluntarios from '../db/db.js'

import homeView from './homeView'

var menuState = defineState({
  msg: {
    type: String,
    value: 'msg2'
  }
})

export var homeContent = defineContent {
  title: 'Home'
  icon: 'home'
  state: menuState
  routes:
    '/': do <homeView state=this.state>
}
