export function roundNumber(amount, presicion) {
  return Math.round(amount * presicion) / presicion;
}

export function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export function formatNumber(num, d, abs) {
  if(num) {
    var re_num = `[^0-9.${abs ? '' : '-'}]`
    num = String(num).replace(new RegExp(re_num, 'g'), "")
    var re = '\\d(?=(\\d{' + (3) + '})+' + (d > 0 ? '\\.' : '$') + ')';
    return Number(num).toFixed(Math.max(0, ~~d)).replace(new RegExp(re, 'g'), '$&,');
  } else {
    return 0
  }
}

export function PVIF(rate, nper) {
  return Math.pow(1 + rate, nper);
}

export function PMT(rate, nper, pv, fv = 0, type = 0) {
  rate = (rate/100)/12;
  nper *= 12;

  if (rate == 0) return -(pv + fv)/nper;

  var pvif = Math.pow(1 + rate, nper);
  var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

  if (type == 1) {
    pmt /= (1 + rate);
  };

  return -pmt;
}

export function IPMT(pv, pmt, rate, per) {
  rate = (rate/100)/12;
  var tmp = Math.pow(1 + rate, per);
  return 0 - (pv * tmp * rate + pmt * (tmp - 1));
}

export function PPMT(rate, per, nper, pv, fv = 0, type = 0) {
  if (per < 1 || (per >= nper + 1)) return null;
  var pmt = this.PMT(rate, nper, pv, fv, type);
  var ipmt = this.IPMT(pv, pmt, rate, per - 1);
  return pmt - ipmt;
}