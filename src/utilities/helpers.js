import moment from 'moment';
import 'moment/locale/pl';

export const momentToDate = (value) => {
    return moment(value, 'MM-DD-YYYY HH:mm').toDate();
}

export const momentNow = () => {
    return moment(Date.now()).format('MM-DD-YYYY HH:mm');
}

export const momentLocale = (value) => {
    return moment(value).locale('pl').format('LLL');
}

export const storageSetJSON = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
}