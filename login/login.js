exports.login=function (req,res){
/*
  * get��û
  * ��Ͽ��� �α����� �ϸ� userinfo�� �ִ��� �˻縦 �Ѵ�.
  * �˻縦 �ϰ� ��� �ִ��� Ȯ��
  * ������ id_unexist��, ������ id_exist�� �ش�.
  * �Ķ��Ÿ�� id�� �޴´�. 
  
  * loginsession making
  * loginStatus = true, user=id saving 
  * id_exist    -> ȸ�� ����
  * id_unexist  -> ȸ���� �������� ���� ���
  * id_err      -> ����
*/
	try{
	    var id =  req.param('id'); //��� id
		var token = req.param('token');
		DB.query('BEGIN',function(){
			DB.query('SELECT id,token FROM __tableName WHERE id =?', [id], function (err, data) {
				console.log(data);	
    	    	if (data.length > 0) { // ȸ���� �ִ� ��� mainâ���� ����� �Ѵ�.
					if(data[0].id === id && data[0].token === token){ // �α��� �õ� �ϴµ����Ϳ� �α��� ���� �����Ͱ� ������ 	
						res.cookies;
						req.session.user=id;
						req.session.loginStatus = true;
						//req.cookies
						res.send({ id_status: 'id_exist' }); console.log('SameDevice sucess loginCode :1 '); 
					}else{ // �ٸ��� ������ token�� 0���� ����� �ش�.

						DB.query('UPDATE __tableName SET token =0 WHERE token = ?',[token], function(err){
							if(!err){
								DB.query('UPDATE __tableName SET token =? WHERE id = ?',[token, id],function(err){
									if(!err){
										DB.query('COMMIT',function(){
											res.cookies;
											req.session.user=id;
											req.session.loginStatus = true;
					 						res.send({ id_status: 'id_exist' }); console.log('DifferentDevice sucess loginCode: 2'); 
										});
									}else{
										DB.query('ROLLBACK',function(){
											console.log('customLogin Error Code : 1');
											console.log(err);
											res.send({id_status:'id_err'});
										});
									}
								});
							}else{
								DB.query('ROLLBACK',function(){
									console.log('customLogin Error Code : 2');
									console.log(err);
									res.send({id_status:'id_err'});
								});	
							}
						});
					}
				}
		
				else {res.send({ id_status: 'id_unexist' }); console.log('fail loginCode:3'); }//ȸ���� ���� ��� ȸ������ ���â���� ����� �Ѵ�.
    		});
		});
	}catch(err){
		console.log('CustomLogin Error Code : 3');
		console.log(err);
		res.send({id_status:'id_err'});
	}
};