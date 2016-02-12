exports.logout = function(req,res){
/*
   * get요청 
   * 로그아웃
   * id를 인자로 받는다.
   * 해당 세션을 지운다.
   
   * id 있는지 검사? 있다 : 없다 -> idBlank
   * 로그아웃 성공               -> success 
   * 로그아웃 실패               -> bad_gateway
*/ 
	try{
		var id = req.param('id');
		var deCountUserId;
			
		req.session.id="";
		req.session.loginStatus=false;
		res.send({logoutStatus:"success"});
	}catch(err){
		res.send({logoutStatus:"bad_gateway"});
	}
}