require './nav' 
require './main' 

tag app < div

  def render 
    <self> 
      <div.demo-layout.mdl-layout.mdl-js-layout.mdl-layout--fixed-drawer.mdl-layout--fixed-header>
      <header.demo-header.mdl-layout__header.mdl-color--grey-100.mdl-color-text--grey-600>
        <div.mdl-layout__header-row>
          <span.mdl-layout-title> "Home"
          <div.mdl-layout-spacer>
          <div.mdl-textfield.mdl-js-textfield.mdl-textfield--expandable>
            <label.mdl-button.mdl-js-button.mdl-button--icon for="search">
              <i.material-icons> "search"
            <div.mdl-textfield__expandable-holder>
              <input.mdl-textfield__input type="text" id="search">
              <label.mdl-textfield__label for="search"> "Pesquisar"
          <button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--icon#hdrbtn>
            <i.material-icons> "more_vert"
          <ul.mdl-menu.mdl-js-menu.mdl-js-ripple-effect.mdl-menu--bottom-right for="hdrbtn">
            <li.mdl-menu__item> "About"
            <li.mdl-menu__item> "Contact"
            <li.mdl-menu__item> "Legal information"
      <navpagelet>
      <mainpagelet>
    
extend tag ul
  attr for    

extend tag i
  attr role
    