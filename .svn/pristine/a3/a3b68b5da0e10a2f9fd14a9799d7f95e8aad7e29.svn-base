	function Engine(){//引擎;


		//初始化引擎;

		this.ele = document.getElementById("body_main");

		this.init();


	}

	Engine.prototype.init = function(){

		//难度选择;
		var aChoice = document.getElementById("options").children;
		var that = this;//事件处理函数;
		//元素事件添加;
		for(var i = 0 ;i < aChoice.length; i++){
			aChoice[i].onclick = function(){
				that.choice(this);
			}
		}
	}

	Engine.prototype.choice = function(obj){

		//储存选择结果;
		this.choice = obj.value;

		//删除父级 || 隐藏父级;

		//1.在这里需要删除元素，因为重用率很高所以封装;

		obj.parentNode.remove();


		//开场动画功能;

		this.openAnimation();

	}

	Engine.prototype.openAnimation = function(){

		//显示开场动画组件;(因为还有隐藏功能，在一个方法中过于复杂，所以另行封装一个logo对象);
		//1.logo
		logo.show();
		//2.loding动画组件;

		var loading = document.createElement("div");
		loading.className = "loading";
		document.body.appendChild(loading);

		//2.2 loading动画;

		var index = 1;
		var timer = setInterval(function(){
			loading.style.background = 'url(images/loading'+(index++%3+1)+'.png)';
		},600);

		 	
		//3.背景图片移动;

		var that = this;
		var bgIndex = 0;
		this.bgTime=setInterval(function(){
			that.ele.style.backgroundPosition = '0px '+ (bgIndex += 2) +'px';
		},60)

		var that = this;

		setTimeout(function(){
			//4. 动画结束
			clearInterval(timer);


			//清空动画组件;
			loading.remove();
			logo.hide();


			//游戏开始;
			that.gameStart();

		},5000)


	}




	var logo = {

		ele:document.createElement("div"),
		have:false,
		show:function(){
			this.ele.className = "logo";//之前布局好的;
			document.body.appendChild(this.ele);
			this.have = true;
		},
		hide:function(){
			//删除;
			this.ele.remove();
		}



	}


	//封装remove方法;

	Element.prototype.remove = function(){


		this.parentNode.removeChild(this);

	}
	
