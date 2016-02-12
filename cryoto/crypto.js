exports.cr = function(txt){
    var buf='';
    var utc = new Date().getTime()%9+1;

    var nul="abc";
    buf+=utc;
    console.log(utc);
    for(var i in txt){
        var ch;
        if(ch=stringCheck(txt[i])){ //문자
            if(StringToNum(txt[i])/100<1) {
                buf+='0'+StringToNum(txt[i]).toString();
            }
            else{
                buf+=StringToNum(txt[i]);
            }
        }else{ // 숫자
            buf+=NumToString(txt[i]);
        }
        if(!(i%utc)){

            buf+=nul;
        }
    }
    return  buf;
};

exports.de = function (txt) {
    var utc = txt[0];

    var arr ;


    arr=textParsing(txt); //3자리씩 끊는다.
    var buf=encoding(utc,arr);
    buf=reMake(buf);

    return buf;
};

function textParsing(txt){
    var arr=new Array();
    for (var i = 1; i < txt.length; i += 3) {
        arr.push(txt.slice(i, i + 3));
    }
    return arr;
};

function reMake(txt){
    var rebuf='';
    var buf=txt.split('\u0000');

    for(var i in buf){
        rebuf+=buf[i];
    }
    return rebuf;
};

function encoding(utc,arr){
    var buf='';
    for(var i = 0 ; i<arr.length ; i++){
        if(i%utc || 0==i) {
            console.log(arr[i],DeNumToString(arr[i]),i%utc);
            buf += DeNumToString(arr[i]);
        }else{
            buf += DeNumToString(arr[i]);
        }
    }
    return buf;
};

function stringCheck(txt){
    return ((txt.charCodeAt(0)>=65) && (txt.charCodeAt(0)<=122)) ? true : false ; // string일 경우 true반환
};

function StringToNum(txt){
    return (txt.charCodeAt(0)+5);
};

function NumToString(txt){
    return ( String.fromCharCode(parseInt(txt)+5));
};

function DeNumToString(txt){
    return ( String.fromCharCode(parseInt(txt)-5));
};

//console.log(cr("Asdfadcvdsadsfgxcv"));

//console.log(de(cr("Asdfadcvdsadsfgxcv")));