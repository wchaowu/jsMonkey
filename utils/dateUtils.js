/**
 * Created by wuchaowu on 14-4-11.
 */

exports.currentDateString =  function (){
        var now = new Date(),
            year = now.getFullYear(),
            month = now.getMonth() + 1,
            day = now.getDate(),
            hour = now.getHours(),
            minute = now.getMinutes(),
            second = now.getSeconds();
         return year + "_" + month + "_" + day + "_" + hour + "_" + "_" + minute + "_" + second;
  };

