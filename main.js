

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    // 設定固定人物y值

    // 創建人物對象
    class Player {
        //要用constructor ES6
        constructor(name, character) {
            this.name = name;
            this.character = character;
            this.score = 0;
            // Image()對象 
            this.image = new Image();
            // width + height
            this.x = character == 'left' ? 0 : 300;
            this.y = 0;
            // 初始位置

            //給圖片設置監聽事件
            this.image
            
        }

        paint() {
            var that = this;
            console.log(this);
            this.image.onload = function(){
                // 利用that因為在function內部的this會變成this.image
                context.drawImage(this, that.x, that.y,100,100);
            }
            //src要放在onload後面 因為要先設置監聽事件 才可以監聽到src設置
            this.image.src = that.character == 'left'? 'assets/trump.png': 'assets/biden.png';
        }
        //1. 左右移動的動畫(根據character判斷)
        // 1.1 不可以重疊
        //1.1.1 川普左 拜登右 => border same => keycode judgement
        // 1.2 最多到window寬
        // 1.3 移動速度有上限
        //2. 加入音效 動畫
        //3. 加入一些技能？
    }

    // 實例化兩個人物

    var Trump = new Player('Jessica', 'left');
    Trump.paint();
    var Biden = new Player('Emily', 'right');
    Biden.paint();
    
    canvas.onkeydown = function(e){
        //控制trump
        //控制biden
    }


    
    

    
    
    
   
}




