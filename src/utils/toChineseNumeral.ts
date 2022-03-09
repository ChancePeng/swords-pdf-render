function toChineseNumeral(num:number):string{
  var numerals:Record<string,any> = {"-":"负", ".":"点", 0:"零", 1:"一", 2:"二", 3:"三", 4:"四", 5:"五",
    6:"六",  7:"七", 8:"八", 9:"九", 10:"十", 100:"百", 1000:"千",10000:"万" };
    // 如果num为负数
  if (num < 0) {
    return numerals['-'] + toChineseNumeral(-num);
    // num 为 0或0点几的小数
  } else if (num < 1) {
    return num.toString().split('').reduce(function(p, n) {
      return p + numerals[n];
    }, '');
  } else if (num > Math.floor(num)) {
    return toChineseNumeral(Math.floor(num)) + toChineseNumeral(parseFloat(num.toString().replace(/^.*\./, '0.'))).slice(1);
  } else {
    return [10000, 1000, 100, 10, 1].reduce(function(p, n) {
      if (num >= n) {
        if (p.ling) p.ch += numerals[0];
        p.ch += numerals[Math.floor(num / n)];
        if (n != 1) p.ch += numerals[n];
        p.ling = false;
      } else if (p.ch) {
        p.ling = true;
      }
      num %= n;
      return p;
    }, {ch: '', ling: false}).ch.replace(/^一十/, '十');
  }
}

export default toChineseNumeral;