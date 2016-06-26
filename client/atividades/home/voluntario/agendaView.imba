
import db from '../../../db/db.ts'

tag agendaView < section
  def render
    <self.mdl-grid.mdl-grid--no-spacing.mdl-shadow--2dp.mdl-cell.mdl-cell--12-col>
      <div.mdl-card.mdl-cell.mdl-cell--12-col>
        <div.mdl-card__supporting-text.mdl-grid.mdl-grid--no-spacing>
          <h4.mdl-cell.mdl-cell--12-col>
            "Agenda"
          for a in db['agenda']
            <div.mdl-grid.mdl-grid--no-spacing.mdl-cell.mdl-cell--12-col>
              <div.section__circle-container.mdl-cell.mdl-cell--2-col.mdl-cell--1-col-phone>
                <div.section__circle-container__circle.{cor(a)}>
                  <span>
                    <.small> a['inicio'].getShortDayName()
                    a['inicio'].getDate()
                    <.small> a['inicio'].getShortMonthName()

              <div.section__text.mdl-cell.mdl-cell--10-col-desktop.mdl-cell--6-col-tablet.mdl-cell--3-col-phone>
                <h5> formata(a)
                <div> a['descricao']

  def formata a
    a['inicio'].stringifyHour()

  def cor a
    if (a['tipo'] === 1)
      "mdl-color--primary"
    else
      "mdl-color--yellow-300"

# <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
#   <div class="mdl-card mdl-cell mdl-cell--12-col">
#     <div class="mdl-card__supporting-text mdl-grid mdl-grid--no-spacing">
#       <h4 class="mdl-cell mdl-cell--12-col">Details</h4>
#       <div class="section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone">
#         <div class="section__circle-container__circle mdl-color--primary"></div>
#       </div>
#       <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
#         <h5>Lorem ipsum dolor sit amet</h5>
#         Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Duis nulla tempor do aute et eiusmod velit exercitation nostrud quis <a href="#">proident minim</a>.
#       </div>
#       <div class="section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone">
#         <div class="section__circle-container__circle mdl-color--primary"></div>
#       </div>
#       <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
#         <h5>Lorem ipsum dolor sit amet</h5>
#         Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Duis nulla tempor do aute et eiusmod velit exercitation nostrud quis <a href="#">proident minim</a>.
#       </div>
#       <div class="section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone">
#         <div class="section__circle-container__circle mdl-color--primary"></div>
#       </div>
#       <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
#         <h5>Lorem ipsum dolor sit amet</h5>
#         Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Duis nulla tempor do aute et eiusmod velit exercitation nostrud quis <a href="#">proident minim</a>.
#       </div>
#     </div>
#     <div class="mdl-card__actions">
#       <a href="#" class="mdl-button">Read our features</a>
#     </div>
#   </div>
#   <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="btn2" data-upgraded=",MaterialButton,MaterialRipple">
#     <i class="material-icons">more_vert</i>
#   <span class="mdl-button__ripple-container"><span class="mdl-ripple is-animating" style="width: 92.5097px; height: 92.5097px; transform: translate(-50%, -50%) translate(20px, 16px);"></span></span></button>
#   <div class="mdl-menu__container is-upgraded" style="right: 8px; top: 40px; width: 124px; height: 160px;"><div class="mdl-menu__outline mdl-menu--bottom-right" style="width: 124px; height: 160px;"></div><ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right" for="btn2" data-upgraded=",MaterialMenu" style="clip: rect(0px 124px 0px 124px);">
#     <li class="mdl-menu__item" tabindex="-1">Lorem</li>
#     <li class="mdl-menu__item" disabled="" tabindex="-1">Ipsum</li>
#     <li class="mdl-menu__item" tabindex="-1">Dolor</li>
#   </ul></div>
# </section>
