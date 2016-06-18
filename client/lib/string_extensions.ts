
declare interface String {
  removeAccents(): String;
  l_compareTo(s: String): number;
  l_contains(s: String): boolean;
  l_relevance(s): number;
  hQueryWords(): string[]
  hContainsSoundex(str: string): boolean
  hSoundexQueryWords(): string[],
}

String.prototype.removeAccents = function() {
  var s=this;
  removeAcentosRegExp.forEach((fn) => {
    s = fn(s);
  });
  return s;
}

String.prototype.l_compareTo = function (s) {
  var s1 = this && this.removeAccents().toLowerCase();
  var s2 = s && s.removeAccents().toLowerCase();
  if (s1<s2) return -1;
  if (s1>s2) return 1;
  return 0;
}

String.prototype.l_contains = function (s) {
  if (this && s) {
    var s1 = this && this.removeAccents().toLowerCase();
    var s2 = s && s.removeAccents().toLowerCase().trim();
    return s1.indexOf(s2) >= 0;
  }
  return true;
}

String.prototype.l_relevance = function (s) {
  if (this && s) {
    var s1 = this && this.removeAccents().toLowerCase();
    var s2 = s && s.removeAccents().toLowerCase().trim();
    var i = s1.indexOf(s2);
    if (i == -1) return -1;
    if (i == 0) return 3;
    if (/\s/.test(s1.substring(i-1,i))) return 2;
    return 1;
  }
  return 0;
}

String.prototype.hQueryWords = function () {
  var s=this;
  if (s) {
    s = s.removeAccents()
      .toLowerCase();
    var m = s.match(/([a-z,0-9]+)/g);
    if (m) {
      var words = m
        .filter((w) => ['de', 'a', 'o', 'e', 'da', 'do', 'dos', 'das', 'd'].indexOf(w) == -1);
      return words;
    }
  }
  return [];
}

String.prototype.hContainsSoundex = function (str) {
  var t = this.hSoundexQueryWords()
  var s = str.hSoundexQueryWords()
  return t.every( (tw) => s.some( (sw) => tw.indexOf(sw) >= 0) )
}

String.prototype.hSoundexQueryWords = function () {
  return this.hQueryWords()
    .map(function (w) {
      if (w == 'junior') return 'jr';
      if (w == 'filho') return 'fl';
      if (w == 'neto') return 'nt';
      if (w == 'sobrinho') return 'sb';
      w = w
        .replace(/e+$/g, 'i') // felipe -> felipi   lee -> li
        .replace(/o+$/g, 'u') // eduardo -> eduardu  mariloo -> marilu
        .replace(/es$/g, 'is') // marques -> markis
        .replace(/os$/g, 'us') // carlos -> karlus
        .replace(/ao/g, 'au') // paola -> paula
        .replace(/n$/g, 'm') // ramon -> ramom
        .replace(/nn/g, 'n') // anna -> ana
        .replace(/mm/g, 'n') // simmone -> simoni
        .replace(/ez$/g, 'is') // mendez -> mendis
        .replace(/[xz]$/g, 's') // alex -> ales   diaz -> dias
        .replace(/r$/g, '') // vitor -> vito
        .replace(/ll/g, 'l') // marcello -> marcelo
        .replace(/lh/g, 'l') // cornelho -> cornelo
        .replace(/\bh/g, '') // hamanda -> amanda
        .replace(/l$/g, 'u') // manuel -> manueu
        .replace(/l([^aeioul])/g, 'u$1') // alberto -> aubertu
        .replace(/li([aeiou])/g, 'l$1') // Eulalia -> eulala
        .replace(/ph/g, 'f') // raphael -> rafael
        .replace(/th$/g, 'ti') // elizabeth -> elizabeti
        .replace(/th([aeiou])/g, 't$1') // nathan -> natan
        .replace(/([aeiou])([sx])([aeiou])/g, '$1z$3') // elisa -> eliza
        .replace(/x[cs]/g, 's') // maxciel -> masieu
        .replace(/x([^aeiouc])/g, 's$1') // calixto -> calistu
        .replace(/c([kt])/g, '$1') // erick -> erik  octavio -> otaviu
        .replace(/cc/g, 't') // lucci -> luti
        .replace(/qu[ei]$/g, 'k') // erique -> erik
        .replace(/qu([ei])/g, 'ki') // mesquita -> meskita
        .replace(/q/g, 'k') // torquato -> torkuatu
        .replace(/c([aou])/g, 'k$1') // catia -> katia
        .replace(/ss/g, 's') // assis -> asis
        .replace(/g([ei])/g, 'j$1') // angelica -> anjelika   gilvana -> jilvana
        .replace(/gu([ei])/g, 'g$1') // guilherme -> gilermi  figueidero -> figeiredu
        .replace(/c([ei])/g, 's$1') // cecilia -> sesila
        .replace(/y/g, 'i') // yara -> iara
        .replace(/[wv]/g, 'u') // weslei -> ueslei
        .replace(/(.+)([ks]+)([aou])/g, '$1c$3') // faz s e c terem mesmo tratamento por causa do ç
      ;
      return w;
    });
}

var removeAcentosRegExp = [];

var mapaAcentos = {
  'á': 'a', 'Á': 'A', 'ã': 'a', 'Ã': 'A', 'à': 'a', 'À': 'A', 'â': 'a', 'Â': 'A',
  'é': 'e', 'É': 'E', 'ẽ': 'e', 'Ẽ': 'E', 'è': 'e', 'È': 'E', 'ê': 'e', 'Ê': 'E',
  'í': 'i', 'Í': 'I', 'ĩ': 'i', 'Ĩ': 'I', 'ì': 'i', 'Ì': 'I', 'î': 'i', 'Î': 'I',
  'ó': 'o', 'Ó': 'O', 'õ': 'o', 'Õ': 'O', 'ò': 'o', 'Ò': 'O', 'ô': 'o', 'Ô': 'O',
  'ú': 'u', 'Ú': 'U', 'ũ': 'u', 'Ũ': 'U', 'ù': 'u', 'Ù': 'U', 'û': 'u', 'Û': 'U',
  'ñ': 'n', 'Ñ': 'N', 'ç': 'c', 'Ç': 'C',
};

Object.keys(mapaAcentos).forEach((acento) => {
  var regexpr = new RegExp(acento, 'g');
  var letra = mapaAcentos[acento];
  var fn = (s) => s.replace(regexpr, letra);
  removeAcentosRegExp.push(fn);
});

