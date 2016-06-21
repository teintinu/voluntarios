
import {locale} from './locale';

declare global {
  interface Number {
    zeros: (amount: number) => String;
  }
}

Number.prototype.zeros = function(amount: number) {
  var s: String[] =[this.toString()];
  amount -= s[0].length;
  while (amount) {
    s.unshift('0');
    amount--;
  }
  return s.join('');
}
