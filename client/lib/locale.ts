export var locale = {
    current() {
      return 'pt_br'
    },
    getDayNames() {
      return ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'Sábado'];
    },
    getShortDayNames() {
      return ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] ;
    },
    getMonthNames() {
      return ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    },
    getShortMonthNames() {
      return ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    },
    stringifyDate(d: Date) {
      return [
        locale.getDayNames()[d.getDay()],
        ', ',
        d.getDate(),
        ' de ',
        locale.getMonthNames()[d.getMonth()],
        ' de ',
        d.getFullYear()
      ].join('');
    }
}
