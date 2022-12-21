// 1. mongoose 모듈 가져오기
var mongoose = require('mongoose');
// 2. testDB 세팅
mongoose.connect('mongodb+srv://wltmdeh12:gh145236@cluster0.8f395iu.mongodb.net/test');
// 3. 연결된 testDB 사용
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('Connected!');
});// 6. Schema 생성. (혹시 스키마에 대한 개념이 없다면, 입력될 데이터의 타입이 정의된 DB 설계도 라고 생각하면 됩니다.)
var student = mongoose.Schema({
    name : 'string',
    address : 'string',
    age : 'number'
});

// 7. 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
var Student = mongoose.model('Schema', student);

// 8. Student 객체를 new 로 생성해서 값을 입력
var newStudent = new Student({name:'Hong Gil Dong', address:'서울시 강남구 논현동', age:'22'});

// 9. 데이터 저장
newStudent.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Saved!')
    }
});

// 10. Student 레퍼런스 전체 데이터 가져오기
Student.find(function(error, students){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        console.log(students);
    }
})

// 11. 특정 아이디값 가져오기
Student.findOne({_id:'585b777f7e2315063457e4ac'}, function(error,student){
    console.log('--- Read one ---');
    if(error){
        console.log(error);
    }else{
        console.log(student);
    }
});

// 12. 특정아이디 수정하기
