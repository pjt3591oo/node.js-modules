var request = require('request');
var cheerio = require('cheerio');

function weather(){
	/* 
	  * url+ pathname + countryPath[continent]; 
	*/
	this.url = "http://www.kma.go.kr/"; 
	this.pathname = "weather/lifenindustry/";
	this.countryPath ={Asia:'currentworld.jsp', Europe:'currentworld_02.jsp', North_America:'currentworld_03.jsp', South_America:'currentworld_04.jsp', Africa:'currentworld_05.jsp',Rusia:'currentworld_07.jsp', Antarctica:'currentworld_08.jsp'};	
	this.mapInfo=[['Korea','japan'],['europe','유럽1']]; //인덱스 -> 대륙, [0][0] : Asia, [0][1] : Europe

} 

weather.prototype.conCodeRtn= function(country){
	var map ={
		Asia:parseInt(0),
		Europe:parseInt(1)
	}

	for(var i in this.mapInfo){
		for(var j in this.mapInfo[i]){
			
			if(this.mapInfo[i][j].toLowerCase() === country.toLowerCase()){
				
				switch(parseInt(i)){
					case map.Asia:
						return  'Asia';
						break;
					case map.Europe:
						return 'Europe';	
						break;
				}
			}
		}
	}
}

weather.prototype.makeUrl= function(continent){
		this.url = this.url + this.pathname + this.countryPath[continent] ;
};

weather.prototype.req =function(){
	console.log(this.url);
	request(this.url, function(error, response, body) {
	   	if(error) {
    		console.log("Error: " + error);
   		}
   		// Check status code (200 is HTTP OK)
   		console.log("Status code: " + response.statusCode);
   		
		if(response.statusCode === 200) {
    		// Parse the document body
    		var $ = cheerio.load(body);
			var taget =$('.table_develop').children('tbody').children('tr').eq(4);
     		console.log("Page title:  " +taget);
			
   		}
	});
}

weather.prototype.run = function(country, city){
	var continent =  this.conCodeRtn(country);
	this.makeUrl(continent);
	return this.req();
};

var a = new weather();

a.run("korea", "seoul");