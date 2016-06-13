
import defineModel from '../lib/himba'
import defineActivity from '../lib/himba'
import lista_voluntarios from '../db/db.js'
import voluntariosView from './voluntariosView'

var voluntariosModel = defineModel({
  voluntarios: {
    type: [Object],
    value: lista_voluntarios()
  },
  filtro: {
    type: String,
    value: ''
  },
  lista_voluntarios: do
    var f = this['filtro']
    var ret =this['voluntarios']
    if f
      ret = ret.filterWithRelevance do |v|
        v['nome'].l_relevance(f)
    ret
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
  onSearch: do |text|
    this['state']['filtro'] = text
    []
}
