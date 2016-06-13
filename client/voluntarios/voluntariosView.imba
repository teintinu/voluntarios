 tag voluntariosView
  prop state
  def render
    <self>
      <ul.demo-list-three.mdl-list> for v in state.lista_voluntarios
        <li.mdl-list__item.mdl-list__item--three-line>
          <span.mdl-list__item-primary-content>
            <i.material-icons.mdl-list__item-avatar> 'person'
            <span> v['nome']
            <span.mdl-list__item-text-body>
              v['celular']
          <span.mdl-list__item-secondary-content>
            <a.mdl-list__item-secondary-action href="#">
              <i.material-icons> 'star'
