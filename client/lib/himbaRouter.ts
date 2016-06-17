
export var app_globals = {
    in_welcome: true,
    lengthHistory: undefined,
    precisaPush: true,
    qntPush: 0,
    login_forward: ''
}

export type CorrectedHash={
  hash: string,
  processName: string,
  stepName: string,
  processInfo: ProcessInfo
};

export function correction_hash(actualState: Application, hash: string): CorrectedHash {
  if (!/___\w+/.test(hash)) { //TODO IF SOMENTE PARA OS TESTES
    if (!actualState.session.login) {
      app_globals.login_forward = ((hash == '#login' || hash == 'login') ? "" : hash);
      hash = "#login";
    } else if (hash == "#login" || hash == "#back" || hash == "#")
      hash = "#" + (!actualState.curr_process ? "welcome" : actualState.curr_process.processName);
    var m = /#?([^\/\?]*)(?:\/([^\?]*))?(?:\?(.*))?/g.exec(hash);

    var processName = m[1];
    var stepName = m[2];
    if (!processName && stepName != undefined && actualState.curr_process)
      processName = actualState.curr_process.processName;

    var processInfo = ajust_processInfo(actualState, processName);
    var stepNameCorrigido = processInfo.reference.setStep(stepName);

    return {
      hash: (processName ? '#' + processName : '') + (stepNameCorrigido ? '/' + stepNameCorrigido : ''),
      processName: processName,
      stepName: stepNameCorrigido,
      processInfo: processInfo
    };
  }
}

function ajust_processInfo(actualState: Application, processName: string): ProcessInfo {
  var processModule: BundleLazy, processInfo: ProcessInfo;
  var isWelcome = processName == '';
  if (processName == "login")
    processModule = actualState.loginStore;
  else if (isWelcome)
    processModule = actualState.welcomeStore;
  else {
    var process = actualState.openned_processes.some(function(process, index) {
      if (process.processName == processName) {
        processInfo = process;
        actualState.openned_processes.splice(index, 1);
        return true;
      }
    });

    if (!processInfo) {
      actualState.menuItems.forEach(function(menuItem) {
        if (menuItem.name == processName) {
          processModule = menuItem.module;
        }
      });
    }
  }

  if (!processInfo && processModule) {
    var fn = processModule(function(mod) {
      createProcessInfo();
    });
  }

  if (processInfo) {
    if (!isWelcome && processName != "login")
      actualState.openned_processes.push(processInfo); // TODO mudando estado atual
    return processInfo;
  } else {
    actualState.error = "não existe " + processName;
    processModule = actualState.welcomeStore;
    createProcessInfo();
    return processInfo;
  }

  function createProcessInfo() {
    processModule(function(mod: Disposable<ProcessStore>) {
      processInfo = {
        reference: mod.addRef(),
        processName: processName,
        task: null,
        view_ref: null
      };
    });
  }
}

export function ativa_conteudo(actualState: Application, hash_fixed: CorrectedHash): Application {

  if (app_globals.precisaPush) {
      history.replaceState("Back", hash_fixed.hash, hash_fixed.hash);
      app_globals.precisaPush = false;
      history.pushState("Current", "Welcome", "");
      app_globals.qntPush++;
  } else
      history.replaceState("Current", hash_fixed.hash, hash_fixed.hash == "" ? "#welcome" : hash_fixed.hash);

  app_globals.in_welcome = ["", "#welcome"].indexOf(hash_fixed.hash) >= 0;

  var procState = hash_fixed.processInfo.reference.getState();

  procState.step(function(mod) {
    hash_fixed.processInfo.view_ref = mod.addRef();
  });

  if (!app_globals.lengthHistory)
    app_globals.lengthHistory = history.length;

  return immutableSet(actualState, {
    curr_process: {
      processInfo: hash_fixed.processInfo,
      process: hash_fixed.processInfo.reference,
      processName: hash_fixed.processInfo.processName,
      stepTitle: "nome do Step",
      task: hash_fixed.processInfo.task,
      active_view: {
        view_ref: hash_fixed.processInfo.view_ref,
        actions: hash_fixed.processInfo.reference.getActions ? hash_fixed.processInfo.reference.getActions() : {}
      }
    }
  });
}

export function killProcess(newState: Application){
  var curr_process = newState.curr_process;
  newState.curr_process = null;
  curr_process.processInfo.reference.releaseRef();
  newState.openned_processes.some(function(opennedProcess, index) {
      if (opennedProcess.processName == curr_process.processName) {
          newState.openned_processes.splice(index, 1);
          return true;
      }
  });
}


// var _routes = []
// var _root, _mode, _onError

// export function registerRoute(url, activity, render_fn) {
//   if (!/^\/[\/:\w]*$/.test(url)) throw 'Rota inválida: ' + url
//   url = url.substr(1)
//   var r=getRoute(url)
//   if (r) throw 'Rota duplicada: ' + url
//   var re_params = /:([^\/]*)/g;
//   var params = re_params.exec(url)
//   if (params) params.shift()
//   else params = [];
//   var regexp = new RegExp('^'+url.replace(re_params, '([^\/]*)').replace(/\//g, '\\/')+'$')
//   r = {
//     url,
//     regexp,
//     params,
//     activity,
//     render: render_fn
//   }
//   _routes.push(r)
// }

// export function getRoute(path) {
//   var fragment = path || getFragment();
//   for(var i=0; i<_routes.length; i++) {
//     var r = _routes[i]
//     var match = fragment.match(r.regexp);
//     if(match) {
//       match.shift();
//       var params = {};
//       r.params.forEach( function( p, i) {
//         params[p] = match[i];
//       })
//       return {
//         activity: r.activity,
//         render: r.render,
//         params
//       }
//     }
//   }
// }

// export function configRouter(options) {
//   _mode = options && options['mode'] && options['mode'] == 'history' && !!(history['pushState']) ? 'history' : 'hash'
//   _root = options && options.root ? '/' + clearSlashes(options.root) + '/' : '/'
// }

// function getFragment() {
//   var fragment = ''
//   if (_mode === 'history') {
//     fragment = clearSlashes(decodeURI(location.pathname + location.search))
//     fragment = fragment.replace(/\?(.*)$/, '')
//     fragment = _root != '/' ? fragment.replace(_root, '') : fragment
//   }
//   else {
//     var match = location.href.match(/#(.*)$/)
//     fragment = match ? match[1] : ''
//   }
//   return clearSlashes(fragment)
// }

// function clearSlashes (path) {
//   return path.toString().replace(/\/$/, '').replace(/^\//, '');
// }

//     // listen: function() {
//     //     var self = this;
//     //     var current = self.getFragment();
//     //     var fn = function() {
//     //         if(current !== self.getFragment()) {
//     //             current = self.getFragment();
//     //             self.check(current);
//     //         }
//     //     }
//     //     clearInterval(this.interval);
//     //     this.interval = setInterval(fn, 50);
//     //     return this;
//     // },

// export function navigate(path) {
//   path = path ? path : '';
//   if(_mode === 'history') {
//       history.pushState(null, null, _root + clearSlashes(path));
//   } else {
//       window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
//   }
// }


// configRouter({mode: 'history', root: '/'});
