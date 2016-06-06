

import H5App from './lib/H5App' 

import homeContent from './home/homeContent'
require './voluntarios/voluntariosContent'

export class CVV_app < H5App
  def home
    homeContent

  def onSearch text
    console.log text
    

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

