tag navpagelet

  def render 
    <self> 
      <div.demo-drawer.mdl-layout__drawer.mdl-color--blue-grey-900.mdl-color-text--blue-grey-50>
        <header.demo-drawer-header>
          <img.demo-avatar src="images/cvv.png">
          <div.demo-avatar-dropdown>
            <span> "hello@example.com"
            <div.mdl-layout-spacer>
            <button#accbtn.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--icon>
              <i.material-icons role="presentation"> "arrow_drop_down"
              <span.visuallyhidden> "Accounts"
            <navpageletusermenu>
        <navpageletleftmenu>

tag navpageletleftmenu

  def render 
    <self> 
      <nav.demo-navigation.mdl-navigation.mdl-color--blue-grey-800>
        <navpageletleftmenuitem title="Home" icon="home" route="">
        <navpageletleftmenuitem title="Inbox" icon="inbox" route="">
        <navpageletleftmenuitem title="Trash" icon="delete" route="">
        <navpageletleftmenuitem title="Spam" icon="report" route="">
        <navpageletleftmenuitem title="Forums" icon="forum" route="">
        <navpageletleftmenuitem title="Updates" icon="flag" route="">
        <navpageletleftmenuitem title="Promos" icon="local_offer" route="">
        <navpageletleftmenuitem title="Purchases" icon="shopping_cart" route="">
        <navpageletleftmenuitem title="Social" icon="people" route="">
        <navpageletleftmenuitem>
        <navpageletleftmenuitem title="Updates" icon="flag" route="">


tag navpageletleftmenuitem
  attr route
  attr title 
  attr icon
  def render 
    <self> 
      if title
        <a.mdl-navigation__link href="{route}"> 
          <i.mdl-color-text--blue-grey-400.material-icons role="presentation"> icon
          title
      else 
        <div.mdl-layout-spacer>

tag navpageletusermenu

  def render 
    <self> 
      <ul.mdl-menu.mdl-menu--bottom-right.mdl-js-menu.mdl-js-ripple-effect for="accbtn">
        <li.mdl-menu__item> "hello@example.com"
        <li.mdl-menu__item> "info@example.com"
        <li.mdl-menu__item>
          <i.material-icons> "add" 
          "Add another account"
     