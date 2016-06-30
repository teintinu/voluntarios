
import application,autorun from '../himba.ts'

tag appheader < header
  attr title
  prop actionMenuItems
  def render
    <self.demo-header.mdl-layout__header.mdl-color--grey-100.mdl-color-text--grey-600>
      <div.mdl-layout__header-row>
          <span.mdl-layout-title> application.apptitle
          <div.mdl-layout-spacer>
          <div.mdl-textfield.mdl-js-textfield.mdl-textfield--expandable>
            <label.mdl-button.mdl-js-button.mdl-button--icon for="search">
              <i.material-icons> 'search'
            <div.mdl-textfield__expandable-holder>
              <input@search.mdl-textfield__input type="text" id="search" :keyup='searchKeyUp'>
              <label.mdl-textfield__label for="search">
          <button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--icon id="hdrbtn">
            <i.material-icons> 'more_vert'
          <ul.mdl-menu.mdl-js-menu.mdl-js-ripple-effect.mdl-menu--bottom-right for="hdrbtn">
            for action in application.actions
              <li.mdl-menu__item :tap=action['execute']> action.title

  def searchKeyUp
    application.searchText = @search.value
