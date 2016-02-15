# node.js-modules

###자체 제작 모듈 저장소

####1. compare 모듈
```
var c = require('./compare');
c.compare('param1','param2');
```
 - 두개의 배열을 인자로 받는다.
 - 두 배열이 같은지 검사를 한다
 - 같을경우 true, 다를경우 false를 반환을 하게 된다.
 
####2. login 모듈
```
var login = require('./login');
app.use('/',login.login);
```
 - 해당 모듈은 로그인시 토큰값을 같이 저장을 한다.
 - 로그인이 성공을 하게되면 세션을 생성하게 된다.
 - 해당 유저가 DB에 저장이 되있는지 검사를 한다.
 - 2개의 세션 정보를 가지고 있는다. => loginStatus=true, user=해당id
 - 해당 모듈은 token값을 가지고 유저가 어떠한 디바이스에서 접속을 하는지 판단을 한다.

####3. logout 모듈
```
var logout = require('./logout');
app.use('/',logout.logout);
```
 - 해당 모듈은 로그아웃을 한다.
 - session정보를 초기화 한다. => loginStatus=false, user=""

####4. dbconf 모듈
```
var db = require('./dbconf');
db.dbconf('');
```
 - 해당 모듈은 DB설정 모듈이다.
 - host, port, user, password, database를 설정후 설정된 객체를 반환한다.
 - 해당 모듈을 쓰기 위해 mysql모듈을 추가적으로 설치를 할 필요 없다. 해당 모듈 내부에 설치되어 있다.

####5. crypto 모듈
```
var c=require('./crypto.js');
c.cr("Asdfadcvdsadsfgxcv")
```
 - v0.2암호화 구현
 - 복호화 구현 단, 문자열->숫자만 가능
 - 숫자 깨짐 현상 일어남
 - utc%9+1 간격마다 nullString를 추가하여 보안성 향상
 - utc의 값을 알기위해 가장 앞 자리에 utc%9+1의 값을 삽입하였다.
 - 숫자는 강제로 3자리를 맞추어 주었다.
 - 다음 버전에서는 숫자->문자열 구현 추가예정
<<<<<<< HEAD

####6. filter 모듈
```
var f = require('./filter.js');
console.log(f.TextFilter('asdasdasdasdf3$#*&#$JASDJ(#(9'));
```
 - SQLInjection 및 XSS(Cross Site Scripting)공격을 예방하기 위해 대응되는 코드로 변환을 한다.
 - <, >, ", ?, ', \, ;, %, -, (, ), =
=======
>>>>>>> ee5bd097417ade00e990234f67632247dfabfb4d
