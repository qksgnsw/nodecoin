var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var Blockcahin = require('./blockchain')
var blockchain = new Blockcahin()
// 나의 고유 아이디 생성
var uuid = require('uuid/v1')
var nodeAddress = uuid().split('-').join('')
// 동적포트 선언.. script 객체에서 2번째에 위치한 데이터
var port = process.argv[2]

var rp = require('request-promise')

var array = new Array()
array = process.argv
array.forEach(element => {
    console.log(`element : ${element}`)
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', function(req,res){
    res.redirect('/blockchain')
})
app.get('/1', function(req,res){
    res.send('hello')
})
// 웹브라우저에 get 방식으로 /blockchain 주소를 입력했을 때 실행
app.get('/blockchain', function (req, res) {
    res.send(blockchain)
})

// 웹브라우저에 post 방식으로 /transaction 주소를 입력했을 때 실행
app.post('/transaction', function (req, res) {
    const blockIndex = blockchain.createNewTranscation(req.body.amount, req.body.sender, req.body.recipient)
    res.json({note : `트랜잭션은 ${blockIndex} 으로 들어갈 것 입니다.`})
})

// 웹브라우저에 get 방식으로 /mine 주소를 입력했을 때 실행  
app.get('/mine', function (req, res) {
    // 마지막 블럭을 가져온다.
    const lastBlock = blockchain.getLastBlock();

    // 이전 해시값을 가져온다.
    const previousBlockHash = lastBlock['hash']

    // 현재 블럭의 데이터 = 펜딩트랜잭션 + 블럭의 index값
    const currentBlockData = {
        transactions:blockchain.pendingTransaction,
        index:lastBlock['index'] + 1
    }

    // 이전 블럭해시와 현재 블럭데이터를 가지고 작업증명을 해서 nonce값을 구한다.
    const nonce = blockchain.proofOfWork(previousBlockHash,currentBlockData)

    // 기존 데이터와 위에서 얻은 nonce를 가지고 블럭의 해시값을 구한다.
    const blockHash = blockchain.hashBlock(previousBlockHash,currentBlockData,nonce)

    // 채굴 보상
    blockchain.createNewTranscation(10,"reward",nodeAddress)

    // 위에서 구한 nonce값, 해시값, 이전블럭해시값으로 새로운 블럭을 생성한다.
    const newBlock = blockchain.createNewBlock(nonce,previousBlockHash,blockHash)

    res.json({
        note:"새로운 블럭이 만들어 졌습니다.",
        newBlock:newBlock
    })
})

// 새로운 노드를 등록하고 전체 네트워크에 알림
app.post('/register-and-broadcast-node',function(req,res){
    // 새로 진입한 노드
    const newNodeUrl = req.body.newNodeUrl;
    // 기존의 등록이 되어 있지 않은 노드면 추가하기
    
})
// 네트워크에 새로운 노드 등록
app.post('/register-node',function(req,res){

})
// 새로운 노드에 기존의 노드 정보 등록
app.post('/register-nodes-bulk',function(req,res){

})

app.listen(port,function(){
    console.log(`listening on port ${port}...`)
})
