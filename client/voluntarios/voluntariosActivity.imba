import defineModel from '../lib/himba'
import defineActivity from '../lib/himba'
import lista_voluntarios from '../db/db.js'
import voluntariosView from './voluntariosView'

var voluntariosModel = defineModel({
  lista_voluntarios: {
    type: [Object],
    value: lista_voluntarios()
  }
})

export var voluntariosActivity = defineActivity {
  name: 'voluntarios'
  title: 'Voluntários'
  icon: 'person'
  state: voluntariosModel
  route: '/voluntarios'
  steps: [
    {
      name: 'lista_voluntarios',
      render: do <voluntariosView state=this.state>
    }  	
  ]  
}
