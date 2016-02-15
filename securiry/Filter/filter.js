/*
  * 해당 모듈은 XSS,SQLInjection 공격을 막기 위한 필터링 모듈입니다
 */

exports.TextFilter = function(text){
   // text = text.toLowerCase();

    //특수문자 필터
    text=text.replace('<', "&lt;");
    text=text.replace('>', "&gt;");
    text=text.replace('"', "&quot;");
    text=text.replace('=', "&nbsp;");
    text=text.replace('?', "&#63;");
    text=text.replace("'", "&#44;");
    text=text.replace('\\', "&#92;");
    text=text.replace(';', "&#59;");
    text=text.replace('%', "&#37;");
    text=text.replace('-', "&#45;");
    text=text.replace('(', "&#40;");
    text=text.replace(')', "&#41;");
    text=text.replace('/', "&#47;");


    return text;
};