exports.logout = function(req,res){
/*
   * get��û 
   * �α׾ƿ�
   * id�� ���ڷ� �޴´�.
   * �ش� ������ �����.
   
   * id �ִ��� �˻�? �ִ� : ���� -> idBlank
   * �α׾ƿ� ����               -> success 
   * �α׾ƿ� ����               -> bad_gateway
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