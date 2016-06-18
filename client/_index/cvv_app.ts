
import {reactiveVar, declareApplication} from '../lib/himba.ts'

import '../home/homeActivity'
// require '../voluntarios/voluntariosActivity'

var h = reactiveVar(new Date());

export var CVV_app = declareApplication({
  title() {
    return 'Voluntários ' + h.get()
  //   # (activity ? activity['title'] + ' - ' : '') + 'Voluntários'
  },
  menuItems() {
    return [
      {
        title: () => 'Home',
        icon: () => 'home',
        href: () => '/'
      },
      {
        title: () => 'Voluntarios',
        icon: () =>'person',
        href: () => '/voluntarios'
      }
    ];
  },
  fatalError(e: Error) {
    console.log((e as any).stack);
    alert(e.message);
  }
});

setInterval(() => {
  h.set(new Date())
}, 100);
  // def title activity

  // def onSearch text
  //   if text == 'v'
  //     [
  //       {
  //         icon: 'person'
  //         title: 'Cadastrar voluntário'
  //         relevance: 0
  //         tap: do
  //           himba.route '/voluntarios'
  //       }
  //     ]
  //   if text == 'h'
  //     [
  //       {
  //         icon: 'home'
  //         title: 'home'
  //         relevance: 0
  //         tap: do
  //           himba.route('/')
  //       }
  //     ]
  //   []

// # content =
// # content = <div> 'aqui vai aparecer o conteúdo (ligar com rotas)'
// # sidebarMenuItems =
// #   [
// #     new mapa
// #     # {
// #     #   title: 'Home',
// #     #   icon: 'home',
// #     #   href: ''
// #     # },
// #     # {
// #     #   title: 'Mapa',
// #     #   icon: 'inbox',
// #     #   href: ''
// #     # },
// #     # {
// #     #   title: 'BIS',
// #     #   icon: 'delete',
// #     #   href: ''
// #     # },
// #     # {
// #     #   title: 'Substituições',
// #     #   icon: 'report',
// #     #   href: ''
// #     # },
// #     # {
// #     #   title: 'Mensagens',
// #     #   icon: 'forum',
// #     #   href: ''
// #     # },
// #     # {
// #     #   title: 'Eventos',
// #     #   icon: 'flag',
// #     #   href: ''
// #     # },
// #     # {
// #     #   title: 'Projetos',
// #     #   icon: 'local_offer',
// #     #   href: ''
// #     # },
// #     # {
// #     #   title: 'Purchases',
// #     #   icon: 'shopping_cart',
// #     #   href: ''
// #     # },
// #     # {
// #     #   title: 'Agenda',
// #     #   icon: 'people',
// #     #   href: ''
// #     # }
// #   ]

// # actionMenuItems =
// #   [
// #     {
// #       title: 'Adicionar',
// #       ontap: do
// #         title = 'x'
// #         render
// #     },
// #     {
// #       title: 'Editar',
// #       ontap: do
// #         console.log 'ed'
// #     },
// #     {
// #       title: 'Remover',
// #       ontap: do
// #         console.log 'rem'
// #     }
// #   ]

