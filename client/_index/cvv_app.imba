

import H5App from '../lib/H5App'

require '../home/homeActivity'
require '../voluntarios/voluntariosActivity'

export class CVV_app < H5App

  def title activity
    (activity ? activity['title'] + ' - ' : '') + 'Voluntários'

  def onSearch text
    if text == 'v'
      [
        {
          icon: 'person'
          title: 'Cadastrar voluntário'
          relevance: 0
          tap: do
            himba.route '/voluntarios'
        }
      ]
    if text == 'h'
      [
        {
          icon: 'home'
          title: 'home'
          relevance: 0
          tap: do
            himba.route('/')
        }
      ]
    []

# content =
# content = <div> 'aqui vai aparecer o conteúdo (ligar com rotas)'
# sidebarMenuItems =
#   [
#     new mapa
#     # {
#     #   title: 'Home',
#     #   icon: 'home',
#     #   href: ''
#     # },
#     # {
#     #   title: 'Mapa',
#     #   icon: 'inbox',
#     #   href: ''
#     # },
#     # {
#     #   title: 'BIS',
#     #   icon: 'delete',
#     #   href: ''
#     # },
#     # {
#     #   title: 'Substituições',
#     #   icon: 'report',
#     #   href: ''
#     # },
#     # {
#     #   title: 'Mensagens',
#     #   icon: 'forum',
#     #   href: ''
#     # },
#     # {
#     #   title: 'Eventos',
#     #   icon: 'flag',
#     #   href: ''
#     # },
#     # {
#     #   title: 'Projetos',
#     #   icon: 'local_offer',
#     #   href: ''
#     # },
#     # {
#     #   title: 'Purchases',
#     #   icon: 'shopping_cart',
#     #   href: ''
#     # },
#     # {
#     #   title: 'Agenda',
#     #   icon: 'people',
#     #   href: ''
#     # }
#   ]

# actionMenuItems =
#   [
#     {
#       title: 'Adicionar',
#       ontap: do
#         title = 'x'
#         render
#     },
#     {
#       title: 'Editar',
#       ontap: do
#         console.log 'ed'
#     },
#     {
#       title: 'Remover',
#       ontap: do
#         console.log 'rem'
#     }
#   ]

