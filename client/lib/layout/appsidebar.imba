
import himba from '../himba'

tag appsidebar < div  
  def render 
    <self.demo-drawer.mdl-layout__drawer.mdl-color--blue-grey-900.mdl-color-text--blue-grey-50>
      <header.demo-drawer-header>
        <img.demo-avatar src="images/cvv.svg">
        <div.demo-avatar-dropdown>
          <span> 'fernando'
          <div.mdl-layout-spacer>
          <button#accbtn.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--icon>
            <i.material-icons role="presentation"> 'arrow_drop_down'
            <span.visuallyhidden> 'Perfil'
          <ul.mdl-menu.mdl-menu--bottom-right.mdl-js-menu.mdl-js-ripple-effect for="accbtn">
            <li.mdl-menu__item> 'Deslogar'
            <li.mdl-menu__item> 'Alterar foto'
            <li.mdl-menu__item>
              <i.material-icons> 'add'
                'teste ...'

      <nav.demo-navigation.mdl-navigation.mdl-color--blue-grey-800> for item in himba.menuItems
        <a.mdl-navigation__link href="" :tap=item['ontap']>
          <i.mdl-color-text--blue-grey-400.material-icons role="presentation"> item['icon']
          item['title']
      <div.mdl-layout-spacer>
      <a.mdl-navigation__link href="">
        <i.mdl-color-text--blue-grey-400.material-icons role="presentation"> 'help_outline'
        <span.visuallyhidden> 'Help'
