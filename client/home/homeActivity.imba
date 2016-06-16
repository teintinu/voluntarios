
import himba from '../lib/himba'
import defineActivity from '../lib/himba'
import lista_voluntarios from '../db/db.js'

import homeView from './homeView'

export var homeActivity = defineActivity {
  name: 'home'
  title: 'Home'
  icon: 'home'
  state: {
    _cont: 1,
    _dep: himba.dependency,
    cont: do
      this['_dep'].depend
      this['_cont']

    inc: do
      this['_dep'].changed
      this['_cont']++

  },
  route: '/'
  steps: [
    {
      name: 'bemvindo'
      render: do <homeView state=this.state>
    }
  ]
}
