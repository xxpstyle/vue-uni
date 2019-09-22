var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
  var len = len - (s + '').length;
  for (var i = 0; i < len; i++) {
    s = '0' + s;
  }
  return s;
};

export default {
  format: function (time, pattern) {
    if (time == null || time == '') {
      return null
    }
    var date = new Date(time)
    pattern = pattern || DEFAULT_PATTERN;
    return pattern.replace(SIGN_REGEXP, function ($0) {
      switch ($0.charAt(0)) {
        case 'y':
          return padding(date.getFullYear(), $0.length);
        case 'M':
          return padding(date.getMonth() + 1, $0.length);
        case 'd':
          return padding(date.getDate(), $0.length);
        case 'w':
          return date.getDay() + 1;
        case 'h':
          return padding(date.getHours(), $0.length);
        case 'm':
          return padding(date.getMinutes(), $0.length);
        case 's':
          return padding(date.getSeconds(), $0.length);
      }
    });
  },
  formatBefore: function (time, pattern) {
    if (time == null || time == '') {
      return null
    }
    var date = new Date(time)
    pattern = pattern || DEFAULT_PATTERN;
    return pattern.replace(SIGN_REGEXP, function ($0) {
      switch ($0.charAt(0)) {
        case 'y':
          return padding(date.getFullYear(), $0.length);
        case 'M':
          return padding(date.getMonth() + 1, $0.length);
        case 'd':
          return padding(date.getDate() - 1, $0.length);
        case 'w':
          return date.getDay() + 1;
        case 'h':
          return padding(date.getHours(), $0.length);
        case 'm':
          return padding(date.getMinutes(), $0.length);
        case 's':
          return padding(date.getSeconds(), $0.length);
      }
    });
  },
  formatToChina: function (time) {
    if (time == null || time == '') {
      return null
    }
    var today = new Date(time)
    var chinese = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    var y = today.getFullYear().toString();
    var m = (today.getMonth() + 1).toString();
    var d = today.getDate().toString();
    var result = "";
    for (var i = 0; i < y.length; i++) {
      result += chinese[y.charAt(i)];
    }
    result += "年";
    if (m.length == 2) {
      if (m.charAt(0) == "1") {
        result += ("十" + chinese[m.charAt(1)] + "月");
      }
    }
    else {
      result += (chinese[m.charAt(0)] + "月");
    }
    if (d.length == 2) {
      result += (chinese[d.charAt(0)] + "十" + chinese[d.charAt(1)] + "日");
    }
    else {
      result += (chinese[d.charAt(0)] + "日");
    }
    return result;
  },
  parse: function (dateString, pattern) {
    var matchs1 = pattern.match(SIGN_REGEXP);
    var matchs2 = dateString.match(/(\d)+/g);
    if (matchs1.length == matchs2.length) {
      var _date = new Date(1970, 0, 1);
      for (var i = 0; i < matchs1.length; i++) {
        var _int = parseInt(matchs2[i]);
        var sign = matchs1[i];
        switch (sign.charAt(0)) {
          case 'y':
            _date.setFullYear(_int);
            break;
          case 'M':
            _date.setMonth(_int - 1);
            break;
          case 'd':
            _date.setDate(_int);
            break;
          case 'h':
            _date.setHours(_int);
            break;
          case 'm':
            _date.setMinutes(_int);
            break;
          case 's':
            _date.setSeconds(_int);
            break;
        }
      }
      return _date;
    }
    return null;
  },
  ageByBirrhDay(birthDay) {
    //获取年龄
    var age = ''
    if (birthDay != '' && birthDay != null) {
      var myDate = new Date();
      var month = myDate.getMonth() + 1;
      var day = myDate.getDate();
      age = myDate.getFullYear() - birthDay.substring(0, 4) - 1;
      if (birthDay.substring(5, 7) < month || birthDay.substring(5, 7) == month && birthDay.substring(8, 10) <= day) {
        age++;
      }
      if (age <= 0) {
        age = 1;
      }
    }
    return age;
  },
  //获取n天后的时间
  diffDate(addDay) {
    var dd = new Date();
    dd.setDate(dd.getDate() + addDay);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
    return new Date(y + "-" + m + "-" + d);
  }
};
