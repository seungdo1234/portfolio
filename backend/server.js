const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 8080;
const server = require('http').createServer(app);
const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(cors()); // cors 미들웨어를 삽입합니다.0
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => { // 요청패스에 대한 콜백함수를 넣어줍니다.
    res.send({ message: 'hello' });
});

// 1. mongoose 모듈 가져오기
var mongoose = require('mongoose');
// 2. testDB 세팅
mongoose.connect('mongodb+srv://wltmdeh12:gh145236@cluster0.8f395iu.mongodb.net/test');
// 3. 연결된 testDB 사용
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function () {
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function () {
    console.log('Connected!');
});

var messageSchema = mongoose.Schema({
    name: 'string',
    email: 'string',
    subject: 'string',
    message: 'string',
    // date: 'string'
});
var userSchema = mongoose.Schema({
    name: 'String',
    email: 'String',
    password: 'String'
    // role: {
    //     type: Number,
    //     default: 0
    // },
    // image: String,
    // token: {
    //     type: String
    // },
    // tokenExp: {
    //     type: Number
    // }
});

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

const Message = mongoose.model('Message', messageSchema)
const User = mongoose.model('User', userSchema)
module.exports = { Message, User }

app.post('/api/addMessage', function (req, res) {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 
    // 그것들을 데이터베이스에 넣어준다.
    const message = new Message(req.body)
    // 정보 저장, 에러 시 json 형식으로 전달
    message.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })

})
app.post('/api/register', function (req, res) {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)
    console.log(user);
    // 정보 저장, 에러 시 json 형식으로 전달
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})
// 글 리스트 불러오기
app.get('/api/getList', async (req, res) => {
    Message.find().then((getList) => {
        res.send({ getList });
    }, (e) => {
        res.status(400).send(e);
    })

});
app.post('/api/todos/:id', function (req, res) {

    var id = req.body._id;
    Message.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send(todo);

    }).catch((e) => {
        res.status(400).send();
    });

});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    // 입력된 비밀번호와 데이터베이스에 있는 암호화된 비밀번호가 같은지 확인(비교) -> 평문을 암호화해서 비교
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch) // 즉, true
    })
}

app.post('/api/login', function (req, res) {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        else {
            // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
            bcrypt.compare( req.body.password, user.password, function (err, isMatch) {
                if (!isMatch) {
                    return res.json({
                        loginSuccess: false, message: "비밀번호가 틀렸습니다."
                    })
                }
                console.log("로그인 성공");
                return res.json({
                    loginSuccess: true, message: "로그인 성공 !!!"
                })
            })
            // user.comparePassword(req.body.password, (err, isMatch) => {
            //     console.log("ㅂ 성공");
                // if (!isMatch)
                //     return res.json({
                //         loginSuccess: false, message: "비밀번호가 틀렸습니다."
                //     })
            //     return res.json({
            //         loginSuccess: true, message: "로그인 성공."
            //     })
            // })
        }
    })
})




server.listen(PORT, () => {
    console.log('server is running on ${PORT}/')
})
