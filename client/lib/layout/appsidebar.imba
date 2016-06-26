
import application from '../himba.ts'

tag appsidebar < div
  def render
    <self.demo-drawer.mdl-layout__drawer.mdl-color--blue-grey-900.mdl-color-text--blue-grey-50>
      <header.demo-drawer-header>
        <img.demo-avatar src="images/cvv.svg">
        <div.demo-avatar-dropdown>
          <span> application.userName()
          <div.mdl-layout-spacer>
          <button#accbtn.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--icon>
            <i.material-icons role="presentation"> 'arrow_drop_down'
            <span.visuallyhidden> 'Perfil'
          <ul.mdl-menu.mdl-menu--bottom-right.mdl-js-menu.mdl-js-ripple-effect for="accbtn">
            for ua in application.userActions()
              <li.mdl-menu__item :tap=ua['execute']>
                if (ua.icon())
                  <i.material-icons> ua.icon()
                <span> ua.title()

      <nav.demo-navigation.mdl-navigation.mdl-color--blue-grey-800> for item in application.menuItems
        <a.mdl-navigation__link href=item.href >
          <i.mdl-color-text--blue-grey-400.material-icons role="presentation"> item.icon
          <span> item.title
      <div.mdl-layout-spacer>
      <a.mdl-navigation__link href="">
        <i.mdl-color-text--blue-grey-400.material-icons role="presentation"> 'help_outline'
        <span.visuallyhidden> 'Help'
