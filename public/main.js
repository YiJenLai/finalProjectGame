
window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    // 創建人物對象
    class Player {
        //要用constructor ES6
        constructor(name, character) {
            this.name = name;
            this.character = character;
            this.score = 0;
            // Image()對象 
            this.image = new Image(164, 214); // (width,height)
            // 初始位置
            this.x = character == 'left' ? 375 - this.image.width / 2 : 1125 - this.image.width / 2;
            this.y = canvas.height - this.image.height;
            //給圖片設置監聽事件
            this.ready = false;
            //重要！！ constructor內的可以在初始化的時候就先執行
            //要在paint()外面先load好圖片 不然每次都重新load一邊會造成時差=>圖片閃爍
            this.image.src = this.character == 'left' ? 'assets/trump.png' : 'assets/biden.png';
            //src放在onload前面或後面都可以
            var that = this;
            this.image.onload = function () {
                that.ready = true;
            }
        }
        paint() {
            if (this.ready = true) {
                // console.log(this.ready);
                // 利用that因為在function內部的this會變成this.image
                context.drawImage(this.image, this.x, this.y);
            }
        }
        toRight() {
            this.x += 50;
        }
        toLeft() {
            this.x -= 50;
        }
        checkOutOfBoundary() {
            if (this.x <= 0) {
                this.x = 0
            } else if (this.x >= canvas.width - this.image.width) {
                this.x = canvas.width - this.image.width;
            }
        }

        checkGetPoint() {

        }

        checkGetVirus() {

        }
        //1. 左右移動的動畫(根據character判斷)
        // 1.1 不可以重疊
        //  1.1.1 川普左 拜登右 => border same => keycode judgement
        // 1.2 最多到window寬
        // 1.3 移動速度有上限
        //2. 加入音效 動畫
        //3. 加入一些技能？
    }


    class Drop {
        constructor() {
            // 初始位置
            this.x = Math.random() * canvas.width;
            this.y = 0;
            //給圖片設置監聽事件
            this.ready = false;
        }

        paint() {
            if (this.ready) {
                context.drawImage(this.image, this.x, this.y, 100, 100);
            }
        }

        step() {
            this.y += 4;
        }

    }


    class Virus extends Drop {
        //可以設定遊戲難度
        constructor() {
            super();
            this.image = new Image(132,124);
            this.image.src = 'assets/virus.png';
            var that = this;
            this.image.onload = function () {
                that.ready = true;
            }
        }
        paint() {
            if (this.ready) {
                context.drawImage(this.image, this.x, this.y, 70, 70);
            }
        }
    }

    class Vote extends Drop {
        constructor() {
            super();
            this.image = new Image(132,124);
            this.image.src = 'assets/vote.png';
            var that = this;
            this.image.onload = function () {
                that.ready = true;
            }
        }
        paint() {
            if (this.ready) {
                context.drawImage(this.image, this.x, this.y, 100, 100);
            }
        }
    }

    class Mask extends Drop{
        constructor(){
            super();
            this.image = new Image(132,124);
            this.image.src = 'assets/mask.png';
            var that = this;
            this.image.onload = function () {
                that.ready = true;
            }
        }
        paint() {
            if (this.ready) {
                context.drawImage(this.image, this.x, this.y, 200, 180);
            }
        }
    }

    function checkHit(drops,character,type) {
        for(let i = 0 ; i < drops.length; i++){
            if(drops[i].x+drops[i].image.width/2 >= character.x-character.image.width/2 
                && drops[i].x-drops[i].image.width/2 <= character.x+character.image.width/2
                && drops[i].y >= character.y-character.image.height/2)
                {
                    drops.splice(i,1);
                    if(type == 'virus'){
                        //鼠掉
                    }else if(type == 'mask'){
                        //無敵狀態

                    }else{
                        character.score+=10;
                    }
                    
            }
        }
    }


    var masks = [];
    var virus_s = [];  //複數
    var votes = [];

    // num = 一次創建多少個virus
    function virusCreate(virus_s,num) {
        for (let i = 0; i < num; i++) {
            var virus = new Virus();
            virus_s.push(virus);
        }
    }
    //繪製virus
    function virusPaint(virus_s) {
        for(let i = 0; i < virus_s.length; i++){
            virus_s[i].paint();
        }
    }
    function virusMove(virus_s) {
        for(let i = 0; i < virus_s.length; i++){
            virus_s[i].step();
        }    
    }

    // num = 一次創建多少個vote
    function votesCreate(votes,num) {
        for (let i = 0; i < num; i++) {
            var vote = new Vote();
            votes.push(vote);
        }
    }
    //繪製votes
    function votesPaint(votes) {
        for(let i = 0; i < votes.length; i++){
            votes[i].paint();
        }
    }
    function votesMove(masks) {
        for(let i = 0; i < votes.length; i++){
            votes[i].step();
        }    
    }

    // num = 一次創建多少個mask
    function masksCreate(masks,num) {
        for (let i = 0; i < num; i++) {
            var mask = new Mask();
            masks.push(mask);
        }
    }
    //繪製masks
    function masksPaint(masks) {
        for(let i = 0; i < masks.length; i++){
            masks[i].paint();
        }
    }
    function masksMove(masks) {
        for(let i = 0; i < masks.length; i++){
            masks[i].step();
        }    
    }


    window.onkeydown = function (e) {
        //控制biden
        e.preventDefault();
        if (e.keyCode == 37 || e.keyCode == 39) {
            if (e.keyCode == 37) {
                Biden.toLeft();
            } else {
                Biden.toRight();
            }
        }//控制trump 
        else if (e.keyCode == 65 || e.keyCode == 68) {
            if (e.keyCode == 65) {
                Trump.toLeft();
            } else {
                Trump.toRight();
            }
        }
        //check是否超出界外
        Trump.checkOutOfBoundary();
        Biden.checkOutOfBoundary();
        // check是否相撞 
        checkCollison(Trump, Biden, e.keyCode);

    }

    //檢查川普和拜登碰撞
    function checkCollison(Trump, Biden, keycode) {

        var borderLeftBiden = Biden.x - Biden.image.width / 2;
        var borderRightTrump = Trump.x + Trump.image.width / 2;;
        if (borderRightTrump >= borderLeftBiden) {
            if (keycode == 37) {
                if (Trump.x <= 0) {
                    Biden.x = Trump.image.width;
                }
                Trump.x = Biden.x - Biden.image.width / 2 - Trump.image.width / 2;
            } else if (keycode == 68) {
                if (Biden.x >= canvas.width - Biden.image.width) {
                    Trump.x = canvas.width - Biden.image.width - Trump.image.width;
                }
                Biden.x = Trump.x + Trump.image.width / 2 + Biden.image.width / 2;
            }
        }

    }

    // bg可以包成一個對象
    var bg = new Image();
    var bgReady = false;
    bg.onload = function () {
        bgReady = true;
    }
    bg.src = 'assets/bg.png';

    // 實例化兩個人物
    var Trump = new Player('Jessica', 'left');
    Trump.paint();
    var Biden = new Player('Emily', 'right');
    Biden.paint();

    //掉落mask數量、時間
    setInterval(function () {
        masksCreate(masks,1);
    },5000)
    //掉落virus數量、時間
    setInterval(function () {
        virusCreate(virus_s,2);
    },2000)
    setInterval(function () {
        virusCreate(virus_s,1);
    },5000)
    //掉落vote數量、時間
    setInterval(function () {
        votesCreate(votes,1);
    },2000)
    setInterval(function () {
        votesCreate(votes,2);
    },500)
    setInterval(function () {
        votesCreate(votes,2);
    },1000)

    setInterval(function () {
        if (bgReady) {
            context.drawImage(bg, 0, 0);
        }
            // checkHit(masks,Trump);
            // checkHit(masks,Biden);
            // checkHit(virus_s,Trump);
            // checkHit(virus_s,Biden);
            // checkHit(votes,Trump);
            // checkHit(votes,Biden);
            // Trump.paint();
            // Biden.paint();
            // masksMove(masks);
            // masksPaint(masks);
            // votesMove(votes);
            // votesPaint(votes);
            // virusMove(virus_s);
            // virusPaint(virus_s);
    }, 10);  
}




