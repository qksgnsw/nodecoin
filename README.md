# nodecoin

##### 데이터구조
1. function으로 만든다.
2. 구조를 통해 객체를 생성할 수 있다.
3. 수많은 데이터를 컨트롤 할 수 있다.

4. 예시.

    function User(name, age) {
        this.name = name;
        this.age = age;
    }

    var user = new User('user1','10')
    .
    .
    var userN = new User('userN','..N')

##### 프로토타입 객체
1. (쉽게 말해서)함수에 속성이나 기능을 공통적으로 추가하는 객체.

2. 예시

    User.prototype.emailDomain = "@google.co.kr";

    User.prototype.getEmailAddress = function(){
        return this.name + this.age + this.emailDomain;
    }

##### 블록체인 데이터 구조 만들기
1. 블록체인 데이터를 배열 구조로 만든다.

    function Blockchain(){
        this.chain = [];
        this.newTransactions = [];
    }

2. 블록체인 데이터 구조를 이용

    class Blockchain{
        constructor(){
            this.chain = [];
            this.pendingTransactions = [];
        }
    }

##### 블록체인 프로토타입 함수 만들기
1. 블록 만들기

    Blockchain.prototype.createNewBlock = function(nonce, preiousBlockHash,hash){
        const newBlock = {
            index:this.chain.length + 1,
            timestamp:Date.now(),
            transactions:this.pendingTransactions,
            nonce:nonce,
            hash:hash,
            previousBlockHash:previousBlockHash
        }

        this.pendingTransactions = [];
        this.chain.push(newBlock);

        return newBlock;
    }

2. 마지막 블록을 가져오는 함수 만들기

    Blockchain.prototype.getLastBlock = function(){
        return this.chain[this.chain.length - 1];
    }

3. 트랜잭션이 발생했을때 작동되는 함수 만들기

    Blockchain.prototype.createNewTranscation = function(amount,sender,recipient){
        const newTransaction = {
            amount:amount,
            sender: sender,
            recipient:recipient
        }

        this.pendingTransaction.push(newTransaction);

        return this.getLastBlock()['index'] + 1
    }

4. 해시 생성 함수 만들기

    * sha256 사용

    Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        const hash = sha256(dataAsString)
        return hash
    }

5. 작업증명(POW)
    
    * pow 작업 함수 - 이전블록의 해쉬, 현재 블록 데이터와 nonce 값을 사용한다.

    Blockchain.prototype.proofOfWork = function(previousBlockHash,currentBlockData){
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
        while (hash.substring(0,4) != '0000') {
            nonce++;
            hash = this.hashBlock(previousBlockHash,currentBlockData,nonce)
        }
    }

    * proofOfWork 함수에 이전 hash와 현재블럭의 데이터를 담고 실행하여 nonce 값을 얻는다..
    * hashBlock 함수에 이전 hash와 현재 블럭의 데이터, proofOfWork의 결과물인 nonce를 담고 hash를 얻는다.

    * 예시

    const previousBlockHash = "hash1"
    const currentBlockData = [
        {
            amount:1,
            sender:"se1",
            recipient:"re1"
        },
        {
            amount:2,
            sender:"se2",
            recipient:"re2"
        },
        {
            amount:3,
            sender:"se3",
            recipient:"re3"
        },
        {
            amount:4,
            sender:"se4",
            recipient:"re4"
        },
    ]

    const nonce = blockchain.proofOfWork(previousBlockHash,currentBlockData)
    const hash = blockchain.hashBlock(previousBlockHash,currentBlockData,nonce)
    console.log('nonce : %s \n hash : %s', nonce, hash)

    * 결과
    nonce : 252798 
    hash : 000052f1b63da6f379bd23c80fbcb69caa558c24fb1f7320348af5992713edd6

6. genesisblock을 데이터구조에 임의로 생성한다.

7. express로 서버를 띄운다.
    * 서버에 대한 설명은 자세히 남기지 않겠다.
    * networkNode.js에 주석으로 소스의 흐름을 파악하면됨.

8. 채굴자 보상

    npm i uuid --save
    networkNode.js에 import
    보상을 제공하는 새로운 트랜잭션 포함.
    blockchain.createNewTranscation(10,"reward",nodeAddress)

9. 노드들 네트워크 참여하기
    
    * 진행중
    * https://abc1211.tistory.com/526?category=1003529

