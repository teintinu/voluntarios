
import {reactiveVar, declareApplication} from '../lib/himba.ts'
import {RoleID, LoginInfo} from '../lib/himbaSchema.ts'

import {load_facebook_sdk} from '../lib/login/loginWithFacebook'

import {db, rolesNames} from '../db/db'
import {qryUsuarioPorEmail, Usuario} from '../db/usuario'

import '../atividades/home/homeActivity'
import '../atividades/login/loginActivity'

// import '../atividades/voluntarios/voluntariosActivity'

export var CVV_app = declareApplication({
  title() {
    var c = CVV_app.currentActivity();
    if (c)
      return c.title() + ' - CVV'
    return 'CVV';
  },
  menuItems() {
    return [
      {
        title: () => 'Home',
        icon: () => 'home',
        href: () => '/',
        roles: []
      },
      {
        title: () => 'Voluntarios',
        icon: () =>'person',
        href: () => '/voluntarios',
        roles: [rolesNames.coordenadorDePosto, rolesNames.coordenadoDeGrupo]
      }
    ];
  },
  fatalError(e) {
    console.log((e as any).stack);
    alert(e.message);
  },
  startupApplication() {
    load_facebook_sdk('496019580599280');
  },
  startupSession(loginInfo: LoginInfo) {
    var u = qryUsuarioPorEmail(loginInfo.email);
    db.sessao.setarDadosDeLogin(u, loginInfo.token);
  },
  userId() {
    if (db.sessao.usuario)
      return db.sessao.usuario.id;
    return '';
  },
  userName() {
    if (db.sessao.usuario)
      return db.sessao.usuario.nome;
    return '';
  },
  resumeToken() {
    if (db.sessao.usuario)
      return db.sessao.resumeToken;
    return '';
  },
  roleObj: db.role,
  rolesNames: rolesNames
});


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

