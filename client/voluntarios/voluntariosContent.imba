import defineState from '../lib/h5'
import defineContent from '../lib/h5'
import lista_voluntarios from '../db/db.js'

var voluntariosState = defineState({
  lista_voluntarios: {
    type: [Object],
    value: lista_voluntarios()
  }
})

export var voluntariosContent = defineContent {
  title: 'Voluntários'
  icon: 'person'
  state: voluntariosState
  routes:
    '/voluntarios': do <voluntariosView state=this.state>
}
