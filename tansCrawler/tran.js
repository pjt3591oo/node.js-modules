var request = require('request');
var cheerio = require('cheerio');

function Transform(){
	this.url;
	this.MMapInfo={};
	this.MQuery={sl:'',hl:'', tl:''};
	this.text;

	this.MapInit();
}

// 국가별 코드 초기화
Transform.prototype.MapInit=function(){
	this.MMapInfo= {korea: "ko",  africa :"en", china:"zh", japan:'ja'};
}

//실행
Transform.prototype.Run= function(param){
	var sl= param.fromCountry;
	var tl= param.toCountry;
	var text= param.string;

	this.couToCode(sl, tl);

	if(blankCheck(text)){
		this.text = text;
	}else{
		this.text = makingText(text,this.MQuery.sl);
	}

	this.url=makingURL(this.MQuery.sl,this.MQuery.tl,this.text);

	return request(this.url, function(err,httpResponse,body){
		if(!err){
			console.log(body);
		}
	});

};

//sl, tl생성
Transform.prototype.couToCode=function(SL, TL){
	if(SL.split('-').length>1){
		if(SL.toLowerCase()==='korea - south' || SL.toLowerCase() === 'south - korea'){
			SL ="korea".toLowerCase();
		}else if(SL.toLowerCase()==='Taiwan - Provinde Of China'){
			SL ="taiwan".toLowerCase();
		}
	}
	if(TL.split('-').length>1){
		if(TL.toLowerCase()==='korea - south' || TL.toLowerCase() === 'south - korea'){
			TL ="korea".toLowerCase();
		}else if(SL.toLowerCase()==='Taiwan - Provinde Of China'){
			TL ="taiwan".toLowerCase();
		}
	}

	var bufSl= '%22'+this.MMapInfo[SL]+'%22';
	var bufTl= '%22'+this.MMapInfo[TL]+'%22';

	this.MQuery={sl:bufSl, tl:bufTl, hl:bufTl};
};

var test = new Transform();

var option={
	fromCountry:'africa',
	toCountry:'china',
	string:'i love you'
};
var option1={
	fromCountry:'south - korea',
	toCountry:'japan',
	string:'나는 밥을 먹는다'
};

var option2={
	fromCountry:'africa',
	toCountry:'south - korea',
	string:'i slept all day yesterday'
};
test.Run(option);
test.Run(option1);
test.Run(option2);


//문자열 공백 체크: 공백이 없을경우 1, 있을경우 0반환
function blankCheck(text){
	return !(text.split(' ').length-1) ? 1: 0;
}

//번역될 문자열을 만들어 준다.
function makingText(text, sl){
	text = text.split(' ');
	var b = "%22%5D";
	var buf='%5B%22';

	text.map(function(item, index){
		if(countryCheck(sl)){
			for(var i in item){
				buf+=encodeURI(item[i]);
			}
			if(parseInt(index) === parseInt(text.length-1)) { buf+=b; }
			else buf+='+';
		}
		else{
			buf+=item;
			if(parseInt(index) === parseInt(text.length-1)) { buf+=b; }
			else buf+='+';
		}
	});
	return buf;
}

//인코딩이 필요한 국가인지 확인
function countryCheck(countryCode){
	if(countryCode==='%22ko%22'){return true;}
	else return false;
}

//url을 만든다.
function makingURL(sl,tl,text){
	return 'https://api.microsofttranslator.com/v2/ajax.svc/TranslateArray2?appId=%22TmTe3YHU9KBkV4oVkcBbo0-_EXmMJcO26OAD7LzkrSE74uKc6dBgip2spm3ssHPkc%22&texts='+text+'&from='+sl+'&to='+tl+'&options=%7B%7D&oncomplete=onComplete_11&onerror=onError_11&_=14567177253211';
}