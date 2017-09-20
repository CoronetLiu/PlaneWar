	
window.onload = function(){

		new Engine()

	}

	function Engine(){

		this.ele = document.getElementById('body_main');
		this.options = document.getElementById('options').children;
		this.click();

	}

	Engine.prototype.click = function(){
		
		var _this = this;

		for(var i = 0 ; i < this.options.length; i++){
			this.options[i].index = i;
			this.options[i].onclick = function(){
				//飞机频率
				//alert(typeof this.index)
				switch(this.index){
					//频率 frequency
					case 0 : _this.frequency = 600;; break;
					case 1 : _this.frequency = 400; break;
					case 2 : _this.frequency = 200; break;
					case 3 : _this.frequency = 50; break;
				}
				_this.init().loading();
				this.parentNode.style.display = 'none';
			}
		}
	}

	var logo = {
		ele: document.createElement("div"),
		show : function(){
			this.ele.className = 'logo';
			document.body.appendChild(this.ele)
		},
		hide : function(){
			this.ele.style.display = 'none';
		}
	}

	Engine.prototype.init = function(){
		logo.show();
		return this;
	}
	Engine.prototype.loading = function(){

		var _this = this;
		var index = 0;
		var t = null;
		this.loading = document.createElement('div');
		this.loading.className = 'loading';
		document.body.appendChild(this.loading);
//	动画部分;
		var t = setInterval(function(){
			_this.loading.style.background = 'url(images/loading'+(index++%3+1)+'.png)'
		},500);

		setTimeout(function(){

			clearInterval(t);

			logo.hide();

			_this.loading.style.display = 'none';

			_this.start();

		},4000)
		//背景动画
		var bg = 0;
		this.bgTime=setInterval(function(){
			_this.ele.style.backgroundPosition = '0px '+ (bg += 2) +'px';
		},30)

	}

	//让飞机动起来；

	Engine.prototype.start = function(){

		//MyPlane
		MyPlane.init(this);
		//先让飞机插入页面，然后让飞机开火。飞机开火之后，要构造子弹。
		MyPlane.fire(this);
		//敌机；
		this.createEnemy(this);
		//this.monitor()
	}

	var MyPlane = {
		ele:document.createElement('div'),
		init:function(Engine){
			var _this = this;
			this.ele.className = "my-warplain";
			document.body.appendChild(this.ele);
			this.initPosition(Engine);
			
			//边界检测;
			var leftSlid = Engine.ele.offsetLeft ;
			var rightSlid = Engine.ele.offsetLeft + Engine.ele.offsetWidth - this.ele.offsetWidth;
			document.onmousemove = function(event){
				var _left = event.clientX - _this.ele.offsetWidth/2;
				var _top = event.clientY - _this.ele.offsetHeight/2;
				//console.log(rightSlid +":"+ _left)
				//边界检测;
				_left = _left < leftSlid ? leftSlid : _left;
				_left = _left > rightSlid ? rightSlid : _left;
				_this.ele.style.left = _left + 'px';
				_this.ele.style.top = _top +'px'
			}			
		},
		initPosition:function(Engine){

			this.ele.style.left = Engine.ele.offsetLeft + Engine.ele.offsetWidth/2 - this.ele.offsetWidth/2 +'px'
			this.ele.style.top = document.documentElement.clientHeight - this.ele.offsetHeight + "px";

		},
		fire:function(Engine){
			//console.log(Engine.frequency)
			setInterval(function(){
				new Bullet()

			},Engine.frequency)

		},
		offset:function(){
			return {
				left:this.ele.offsetLeft,
				top:this.ele.offsetTop
			}

		}

	}

	function Bullet(){
		var _this = this;
		this.ele = document.createElement('div');
		this.ele.className = 'bullet';
		document.body.appendChild(this.ele);
		this.ele.style.left = MyPlane.offset().left + MyPlane.ele.offsetWidth/2 -this.ele.offsetWidth/2 + 'px';
		this.ele.style.top =  MyPlane.offset().top - this.ele.offsetHeight+ 'px';

		this.bulletTime = setInterval(function(){

			_this.ele.style.top = _this.ele.offsetTop - 15 +'px';

			if(_this.ele.offsetTop < 0){
				_this.destory()
			}

		},30)

	}
	Bullet.prototype.destory = function(){

		var _this = this;

		this.ele.className = 'bullet_die';

		setTimeout(function(){

			_this.ele.remove()

		},30)

	}

	Engine.prototype.createEnemy = function(Engine){

		setInterval(function(){
			Math.random()>=0.5?new Enemy(0,Engine):'';
		},800)

	}

	function Enemy(type,Engine){

		this.ele = document.createElement('div');
		this.type = type;
		this.hp = 0;
		this.init().move(Engine);

	}

	Enemy.prototype.init = function(){

		switch(this.type){

			case 0:this.hp = 1;
				this.ele.className = "enemy-small";
				this.dieimgs = ["plane1_die1.png","plane1_die2.png","plane1_die3.png"];
				break;

		}	

		return this;

	}
	Enemy.prototype.move = function(Engine){

		var _this = this;
		//console.log(this);
		document.body.appendChild(this.ele);

		this.initPosition(Engine);

		this.smallTime = setInterval(function(){

			_this.ele.style.top = _this.ele.offsetTop + 3 +'px';

			//console.log()
			if(_this.ele.offsetTop> Engine.ele.offsetHeight - _this.ele.offsetHeight){
				clearInterval(this.smallTime)
				_this.ele.remove()
			}
			var aBullet = document.getElementsByClassName('bullet');

			for(var i = 0 ; i < aBullet.length; i++){

				if(Math.abs(aBullet[i].offsetTop-_this.ele.offsetTop) < 10&&Math.abs(aBullet[i].offsetLeft - _this.ele.offsetLeft)<_this.ele.offsetWidth/2){

					_this.ele.remove();

					var id = Math.floor(Math.random()*100)

					aBullet[i].id = id;
					aBullet[i].className = 'bullet_die';

					setTimeout(function(){

						document.getElementById(id).remove();

					},30)
					

				}

			}

		},30)

	}
	Enemy.prototype.initPosition = function(Engine){

		//console.log(Engine.ele)
		this.ele.style.left = randomInt(Engine.ele.offsetLeft + this.ele.offsetWidth,Engine.ele.offsetLeft - this.ele.offsetWidth + Engine.ele.offsetWidth) +'px';
		this.ele.style.top = 0;
	}

	function randomInt(max,min){

		return Math.floor(Math.random()*(max-min+1)+min)

	}
