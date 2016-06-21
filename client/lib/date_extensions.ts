
import {locale} from './locale';

declare global {
  interface Date {
    getMonthName: () => String;
    getShortMonthName: () => String;
    getDayName: () => String;
    getShortDayName: () => String;
    stringifyDate: () => String;
    stringifyHour: () => String,
  }
}

Date.prototype.getMonthName = function() {
  return locale.getMonthNames()[this.getMonth()];
}

Date.prototype.getShortMonthName = function() {
  return locale.getShortMonthNames()[this.getMonth()];
}

Date.prototype.getDayName = function() {
  return locale.getDayNames()[this.getDay()];
}

Date.prototype.getShortDayName = function() {
  return locale.getShortDayNames()[this.getDay()];
}

Date.prototype.stringifyDate = function() {
  return locale.stringifyDate(this);
}

Date.prototype.stringifyHour = function() {
  return locale.stringifyHour(this);
}
