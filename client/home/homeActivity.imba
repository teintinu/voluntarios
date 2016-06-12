  
import defineModel from '../lib/himba'
import defineActivity from '../lib/himba'
import lista_voluntarios from '../db/db.js'

import homeView from './homeView'

var homeModel = defineModel({
  msg: {
    type: String,
    value: 'msg2'
  }
})

export var homeActivity = defineActivity {
  name: 'home',
  title: 'Home'
  icon: 'home'
  state: homeModel
  route: '/'
  steps: [
    {
      name: 'bemvindo'
      render: do <homeView state=this.state>
    }
  ]
}
