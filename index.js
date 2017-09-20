/*
* @Author: Marte
* @Date:   2017-09-12 19:56:36
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-20 16:37:58
*/

// 'use strict';

function $(id){
    return document.getElementById(id);
}
function createElement(css){
    var div = document.createElement("div");
    div.className = css;
    document.body.appendChild(div);
    return div;
}
function Engine(){
    this.ele = $("body_main");
    this.init();// 调用 选择难度页面
}
Engine.prototype.init = function(){
    //选择难度
    var aOptions = $("options").children;
    var that = this;
    for(var i = 0;i < aOptions.length;i ++){
        aOptions[i].onclick = (function(index){
            return function(){    // ?????
                that.hard = index;
                this.parentNode.remove();
                that.animation();// 调用 等待游戏开始页面
            }
        })(i)
    }
}
Engine.prototype.animation = function(){
    //logo
    var logo = createElement("logo");
    //放气飞机
    var loading = createElement("loading");
    var index = 0;
    var loadTimer = setInterval(function(){
        index ++;
        loading.style.background = "url(images/loading"+(index % 3 + 1)+".png)";
    },500);
    //背景图
    var that = this;
    var positionY = 0;
    this.engineTimer = setInterval(function(){
        positionY += 10;
        that.ele.style.backgroundPositionY = positionY + "px";
    },50);
    //设置延时器，清除元素，等待游戏开始
    setTimeout(function(){
        clearInterval(loadTimer);
        logo.remove();
        loading.remove();
        that.gameStart();//调用游戏开始
    },2000);
}
Engine.prototype.gameStart = function(){
    plane.init(this.ele).fire(this.hard);//
    this.createEnemy();//调用 创造敌机
}
Engine.prototype.createEnemy = function(){
    var that = this;
    setInterval(function(){//创建小敌机
        if(Math.random() >= 0.5){
            new Enemy(1,that.ele);
        };
    },500);
    setInterval(function(){//中
        if(Math.random() >= 0.5){
            new Enemy(2,that.ele);
        };
    },2000);
    setInterval(function(){//大
        if(Math.random() >= 0.5){
            new Enemy(3,that.ele);
        };
    },3000);
}
class Enemy{// 敌机
    constructor(type,bodymain){
        this.type = type;
        this.bodyMain = bodymain;
        this.init();//调用 生成敌军
    }
    init(){
        switch(this.type){
            case 1:this.ele = createElement("enemy-small");
                this.speed = 10;
                this.hp = 1;
                break;
            case 2:this.ele = createElement("enemy-middle");
                this.speed = 5;
                this.hp = 8;
                break;
            case 3:this.ele = createElement("enemy-large");
                this.speed = 2;
                this.hp = 25;
                break;
        }
        this.ele.style.top = -this.ele.offsetHeight + "px";
        var min = this.bodyMain.offsetLeft;
        var max = this.bodyMain.offsetLeft + this.bodyMain.offsetWidth - this.ele.offsetWidth;
        var randomLeft = min + Math.round(Math.random() * (max - min));
        this.ele.style.left = randomLeft + "px";
        this.move();//调用 敌军移动
    }
    move(){
        var that = this;
        var cHeight = document.documentElement.clientHeight || document.body.clientHeight;
        this.timer = setInterval(function(){
            that.ele.style.top = that.ele.offsetTop + that.speed + "px";
            if(that.ele.offsetTop >= cHeight){
                that.die();
            }
            for(var i = 0;i < plane.aBullet.length;i ++){
                if(plane.aBullet[i].ele.offsetLeft +  plane.aBullet[i].ele.offsetWidth > that.ele.offsetLeft){
                    if(plane.aBullet[i].ele.offsetLeft < that.ele.offsetLeft + that.ele.offsetWidth){
                        if(plane.aBullet[i].ele.offsetTop < that.ele.offsetTop + that.ele.offsetHeight){
                            plane.aBullet[i].die();
                            that.hp --;
                            if(that.hp == 0){
                                that.die();
                            }
                            break;
                        }
                    }
                }
            }

            if(plane.ele.offsetLeft +  plane.ele.offsetWidth > that.ele.offsetLeft){
                if(plane.ele.offsetLeft < that.ele.offsetLeft + that.ele.offsetWidth){
                    if(plane.ele.offsetTop < that.ele.offsetTop + that.ele.offsetHeight){
                        setTimeout(function(){
                            var restart = confirm("游戏结束！我觉得这不是你的实力，再来一次！");
                            if(restart){
                                location.reload()
                            }else{
                                close();
                            }
                        }, 100);
                    }
                }
            }

        },50)
    }
    die(){
        this.ele.remove();
        clearInterval(this.timer);
    }
}
var plane = {
    init:function(bodyMain){
        this.ele = createElement("my-warplane");
        this.bodyMain = bodyMain;
        var cWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var left = (cWidth - this.ele.offsetWidth) / 2;
        this.ele.style.bottom = "0px";
        this.ele.style.left = left + "px";
        var that = this;
        document.onmousemove = function(event){
            var e = event || window.event;
            that.move(e);//调用 战机移动
        }
        return this;
    },
    move:function(e){
        var left = e.clientX - this.ele.offsetWidth / 2;
        var top = e.clientY - this.ele.offsetHeight / 2;
        var min = this.bodyMain.offsetLeft;
        var max = this.bodyMain.offsetLeft + this.bodyMain.offsetWidth - this.ele.offsetWidth;
        left = left < min ? min : left;
        left = left > max ? max : left;
        this.ele.style.left = left + "px";
        this.ele.style.top = top + "px";

    },
    fire:function(hard){
        var frequence = 1000;
        switch(hard){
            case 0: frequence = 500;
                    break;
            case 1: frequence = 300;
                    break;
            case 2: frequence = 200;
                    break;
            case 3: frequence = 80;
        }
        var that = this;
        this.fireTimer = setInterval(function(){
                that.aBullet.push(new Bullet());
        },frequence)
    },
    aBullet:[]
}
function Bullet(){
    this.init();
}
Bullet.prototype = {
    constructor:Bullet,
    init:function(){
        this.ele = createElement("bullet");
        this.ele.style.left = plane.ele.offsetLeft + plane.ele.offsetWidth / 2 - this.ele.offsetWidth / 2 + "px";
        this.ele.style.top = plane.ele.offsetTop - this.ele.offsetHeight + "px";
        this.move();
    },
    move:function(){
        var that = this;
        this.timer = setInterval(function(){
            that.ele.style.top = that.ele.offsetTop - 10 + "px";
            if(that.ele.offsetTop <= 0){
                that.die();
            }
        },50)
    },
    die:function(){
        clearInterval(this.timer);
        this.ele.className = "bullet_die";
        var that = this;
        setTimeout(function(){
            that.ele.remove();
            for(var i = 0;i < plane.aBullet.length;i ++){
                if(plane.aBullet[i].ele == that.ele){
                    plane.aBullet.splice(i,1);
                    return 0;
                }
            }
        },200);
    }
}
new Engine();