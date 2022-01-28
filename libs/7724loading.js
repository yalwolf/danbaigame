/*┏┓　　　┏┓
┏┛┻━━━┛┻┓
┃　　　　　　　┃    ***** JavaScript Document
┃　　　━　　　┃    ***** chaojin
┃　┳┛　┗┳　┃    ***** 2016-7-11  Update 2017-8-23
┃　　　　　　　┃
┃　　　┻　　　┃
┃　　　　　　　┃
┗━┓　　　┏━┛
    ┃　　　┃  神兽保佑
    ┃　　　┃  代码无BUG！
    ┃　　　┗━━━┓
    ┃　　　　　　　┣┓
    ┃　　　　　　　┏┛
    ┗┓┓┏━┳┓┏┛
      ┃┫┫　┃┫┫
      ┗┻┛　┗┻┛    */

	  (function(){ 

		/*loadJsSync('https://res.wx.qq.com/open/js/jweixin-1.0.0.js',function(){
			console.log('load https://res.wx.qq.com/open/js/jweixin-1.0.0.js!');
			loadJsSync('http://play.7724.com/olgames/code_statistics/qqessdkserver.js?v=20170119',function() {
				console.log('load http://i.7724.com/sdk/qqessdkserver.js!');
				var title = document.title;
				var desc = '我在玩'+title+'，你也一起来挑战吧~';
				title = '《'+title.split(' ')[0]+'》';
				var link = window.location.href;
				var shareInfo = {"shareUrl":link,"shareTitle":title,"shareDesc":desc,"shareImg":"http:\/\/m.7724.com\/img\/box_logo.png","type":"share"}
				QqesShareSdk.wxShareInit(shareInfo);
			});
		});*/
		
		if( ! /7724hezi/.test(navigator.userAgent) ){
			loadJsSync('//www.7724.com/static/pc/js/jquery.js', function(){
				   var rootDOM = document.getElementsByTagName('body')[0]
				var resourceBox = createEle('div',domStyle.resourceBoxStyle)
				var mask = createEle('div',domStyle.maskStyle)
				var resource = createEle('div',domStyle.resourceStyle)
				var close = createEle('div',domStyle.closeStyle)
				var iframeBox = createEle('div',domStyle.iframeBoxStyle)
				var loading = createEle('div',domStyle.loadingStyle)
				var iframe = createEle('iframe',domStyle.iframeStyle)
				var floatBtn = createEle('div',domStyle.floatBtnStyle)
	
				resourceBox.id = 'resourceBox'
				iframeBox.id = 'iframeBox'
				iframe.id = 'iframe'
				mask.id = 'mask'
				resource.id = 'resource'
				rootDOM.appendChild(resourceBox)
				rootDOM.appendChild(floatBtn)
				resourceBox.appendChild(mask)
				resourceBox.appendChild(resource)
				resource.appendChild(close)
				resource.appendChild(iframeBox)
				loading.innerHTML = '加载中...'
				iframeBox.appendChild(loading)
				if(getQueryString('from')=='pc' || getQueryString('from')=='wap'){
					iframe.src = 'http://m.7724.com/networkgame/panel'
				}
				if (iframe.attachEvent){ 
					iframe.attachEvent("onload", function(){ 
						 loading.style.display = 'none'
					}); 
				} else { 
					iframe.onload = function(){ 
						loading.style.display = 'none'
					}; 
				} 
				iframe.setAttribute('frameborder',0);
				iframeBox.appendChild(iframe)
				close.addEventListener('click',handler,false)
				mask.addEventListener('click',handler,false)
	
				var offOn = true;
				var firstTime = 0;
				var lastTime = 0;
				floatBtn.addEventListener('click',function(){
					if(offOn){
						resourceBox.style.left="0"
						mask.style.opacity = '0.6'
						resource.style.left = 0
					}
				},false)
	
				//移动悬浮球
				floatBtn.addEventListener('mousedown',function(){
					downFn.call(this)
					firstTime = new Date().getTime()
					offOn = false
				},false)
				floatBtn.addEventListener('touchstart',function(){
					downFn.call(this)
					firstTime = new Date().getTime()
					offOn = false
				},false)
	
				floatBtn.addEventListener('mousemove',function(){
					moveFn.call(this)
				},false)
				floatBtn.addEventListener('touchmove',function(){
					moveFn.call(this)
				},false)
	
				floatBtn.addEventListener('mouseup',function(){
					endFn.call(this)
					lastTime = new Date().getTime()
					if((lastTime-firstTime)<200){
						offOn = true
					}
				},false)
				floatBtn.addEventListener('touchend',function(){
					endFn.call(this)
					lastTime = new Date().getTime()
					if((lastTime-firstTime)<200){
						offOn = true
					}
				},false)
				//------悬浮球移动end-----	
	
				//滑动关闭左侧弹框
				var start,distance;
				resourceBox.addEventListener('touchstart',function(){
					start = event.changedTouches[0].clientX
				},false)
	
				resourceBox.addEventListener('touchmove',function(event){
					event.preventDefault();
					distance = start-event.changedTouches[0].clientX
					if(distance>0){
						resource.style.left = 0-distance+'px'
					}
				},false)
	
				resourceBox.addEventListener('touchend',function(){
					var boxWidth = resource.offsetWidth
					if(distance>boxWidth/2){
						handler()
					}else{
						resource.style.left = 0
					}
				},false)
				//----滑动关闭左侧弹框end------
	
				function handler(){
					resourceBox.style.left="-100%"
					mask.style.opacity = 0
				}
	
				//loading页面
				var Wwidth = document.documentElement.clientWidth; //网页可见区域宽度
				var Hheight = document.documentElement.clientHeight;//网页可见区域高度
				var loadingBox = createEle('div',domStyle.loadingBoxStyle);
				var imgUrl = '//play.7724.com/olgames/code_statistics/img/loading-icon.png';
				var gifUrl = '//play.7724.com/olgames/code_statistics/img/loading.gif';
				loadingBox.id = 'loadingBox';

				/*********创建自动关闭广告图************/
				var bannerBox = createEle('div',domStyle.bannerBoxStyle);
				bannerBox.id = 'bannerBox';

				//请求广告数据
				$.ajax({
					type: 'get',
					url: 'http://www.7724.com/api/StandAloneBanner',
					async: false,
					data: {key: new Date().getTime()},
					dataType: 'jsonp',
					jsonp: 'jsoncallback',
					success: function(data) {
						console.log('广告数据');
						console.log(data);

						window.banner_pc = data.img_pc;
						window.banner_wap = data.img_wap;
						window.url_pc = data.url_pc;
						window.url_wap = data.url_wap;

						//如果是手机端
						var style,style_a,style_img;
						if ((navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) || navigator.userAgent.match(/android/i)) {
							var bannerImg = window.banner_wap;
							bannerUrl = window.url_wap;
							bannerType = 2;
							style = 'height: 80%; top: 4%;display:inline-block';
							style_a = 'height: 100%;'
							style_img = 'height: 100%;'
						} else {//pc端
							var bannerImg = window.banner_pc;
							bannerUrl = window.url_pc;
							bannerType = 1;
							style = 'width: 80%; top: 8%;';
							style_a = 'width: 100%;'
							style_img = 'width: 100%;'
						}

						bannerBoxStr = '<div id="bannerBoxContent" style="position: relative; margin: 0px auto; background: #fff; border-radius: 4px;padding: 5px; '+style+'">';
						bannerBoxStr += '<span style="position: absolute;top: 0; left: 0; right: 0; font-size: 16px; color: #fff; padding-top: 10px;  text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;">游戏加载中，请稍后……<small id="bannerSecond">5</small></span>';
						bannerBoxStr += '<span style="position: absolute;top:5px; right: 4px; font-size: 20px; font-weight: bolder;width: 24px; height: 24px; line-height: 24px; background: #fff; color: #000; cursor: pointer" title="关闭" onclick="closeBannerBox()">×</span>';
						bannerBoxStr += '<a href="javascript:" onclick="clickBanner()" style="display: block;'+style_a+'">';
						bannerBoxStr += '<img src="'+bannerImg+'" style="display: block;'+style_img+'">';
						bannerBoxStr += '</a>';

						bannerBoxStr += '</div>';

						bannerBox.innerHTML = bannerBoxStr;
						rootDOM.appendChild(bannerBox)
					}
				});
				/*********创建自动关闭广告图************/

				//判断是否为横竖屏
				if(Hheight>Wwidth)
				{
					var imgStr = '<img src="'+imgUrl+'" style="width:50%;margin:38% auto 0" /><br />'
					imgStr += '<img src="'+gifUrl+'" style="width:26%;margin:20% auto 0" />'
					loadingBox.innerHTML = imgStr;
				}else{
					var imgStr = '<img src="'+imgUrl+'" style="width:25%;margin:10% auto 0" /><br />'
					imgStr += '<img src="'+gifUrl+'" style="width:10%;margin:12% auto 0" />'
					loadingBox.innerHTML = imgStr;
				}
				rootDOM.appendChild(loadingBox)


				setTimeout(function(){
					loadingBox.style.display = "none"
				}, 4000);
			});
		}
	})();

	//关闭广告图
	function closeBannerBox() {
		$('#bannerBox').hide();
	}

	//自动关闭广告图-5秒自动关闭
	var int = 4;
	function bannerDaojishi() {
		document.getElementById("bannerSecond").innerHTML = int;
		int--;
		if (int < 0) {
			//清除定时任务
			i = window.clearInterval(i);
			document.getElementById('bannerBox').style.display = 'none';
		}
	}

	//自动关闭广告图-改变窗口自适应方法
	function bannerWindowSize() {
		$(function() {
			h = $('#bannerBoxContent').height();
			console.log('获取广告图的高度：'+h);
			h = parseInt(+h / 2);
			document.getElementById("bannerBoxContent").style.top = '50%';
			document.getElementById("bannerBoxContent").style.marginTop = '-'+h+'px';
		})
	}

	//自动关闭广告图-页面加载完成
	onload = function() {
		i = setInterval("bannerDaojishi()",1000);
		bannerWindowSize();
	}

	//自动关闭广告图-改变窗口监听
	window.onresize = function() {
		console.log('改变了窗口大小');
		bannerWindowSize();
	}

	//点击广告跳转和统计
	function clickBanner() {
		console.log('点击了广告');
		//获取游戏拼音
		var game_url = document.URL;
		//pinyin = pinyin.replace('http://www.test.7724.com/', '');
		//pinyin = pinyin.replace('http://play.7724.com/olgames/', '');
		//pinyin = pinyin.replace('http://oss-cdn.7724.com/alone-games/', '');
		//pinyin = pinyin.replace('/index.html', '');
		//pinyin = pinyin.replace('/index.htm', '');
		//去除末尾的/
		if (game_url.lastIndexOf('play.7724.com') != '-1') {
			game_url = game_url.substring(0, game_url.lastIndexOf('/'));
		}
		console.log(game_url);

		$.ajax({
			type: 'get',
			url: 'http://www.7724.com/api/StandAloneBannerCount',
			async: false,
			data: 'game_url='+game_url+'&type='+bannerType,
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			success: function(data) {
				console.log('统计结果'+data);
				window.parent.location = bannerUrl;
			}
		});
	}

	//创建元素
	function createEle(dom,styleObj){
		var styleObj = styleObj || {}
		var Dom = document.createElement(dom)
		for(var key in styleObj){
			Dom.style[key] = styleObj[key]
		}
		return Dom
	}
	
	//元素样式
	var domStyle ={
		resourceBoxStyle:{
			width: '100%',
			height: '100%',
			position: 'fixed',
			left:'-100%',
			top: 0,
			zIndex: 9998,
			  transition:'all .3s'
		},
		maskStyle : {
			width: '100%',
			height: '100%',
			background: '#000',
			opacity: 0.6,
		},
		resourceStyle : {
			width: '85%',
			  height: '100%',
			  position: 'absolute',
			  left: 0,
			  top: 0,
		},
		iframeBoxStyle:{
			height: '100%',
			width: '100%',
			WebKitOverflowScrolling:'touch',
			  overflow:'auto',
			  background:'#fff'
		},
		loadingStyle:{
			textAlign:'center',
			lineHeight:'200px',
		},
		iframeStyle : {
			height: '100%',
			width: '100%',
		},
		closeStyle : {
			width: '30px',
			height: '60px',
			background: "url('http://www.7724.com/img/new/closed.png') no-repeat center",
			webkitBackgroundSize:' 30px 60px',
			backgroundSize:' 30px 60px',
			position: 'absolute',
			right: '-30px',
			top: '50%',
			marginTop: '-30px',
			cursor:'pointer'
		},
		floatBtnStyle:{
			width:'70px',
			height:'70px',
			position: 'fixed',
			background: 'url("http://www.7724.com/img/new/icon.png") no-repeat center',
			backgroundSize: '56px auto',
			webkitBackgroundSize: '56px auto',
			right: '0',
			top:'30%',
			zIndex:9997,
			cursor:'pointer',
			display: 'none'
		},
		loadingBoxStyle:{
			position:"fixed",
			width:'100%',
			height:'100%',
			zIndex:'9999',
			background:  'url("http://play.7724.com/olgames/code_statistics/img/loading_bg.png") no-repeat center',
			backgroundSize: 'cover',
			backgroundColor:'#01b6fd',
			// background: '-webkit-radial-gradient(#bdecff,#a2e4ff )',
			// background: '-moz-radial-gradient(#bdecff,#a2e4ff )',
			// background: '-o-radial-gradient(#bdecff,#a2e4ff )',
			// background: 'radial-gradient(#bdecff,#a2e4ff )',
			left:'0',
			top:'0',
			textAlign:'center'
		},
		bannerBoxStyle:{
			position:"fixed",
			width:'100%',
			height:'100%',
			zIndex:'10000',
			background: 'rgb(0,0,0,0.6)',
			left:'0',
			top:'0',
			textAlign:'center'
		},
	}
	//获取url参数
	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
	} 
	
	
	//悬浮球移动
	var flag = false
	var cur = {
		x:0,
		y:0
	}
	//鼠标按下方法
	var dx,dy;
	function downFn(){
		bindEdge(this);
		flag = true;
		var o;
		if(event.touches){
			o = event.touches[0]
		}else{
			o = event
		}
		cur.x = o.clientX
		cur.y = o.clientY
		dx = this.offsetLeft;
		dy = this.offsetTop;
	}
	
	//鼠标或者手指移动方法
	function moveFn(){
		if(flag){
			var o,distanceX,distanceY;
			if(event.touches){
				o = event.touches[0]
			}else{
				o = event
			}
			distanceX = o.clientX - cur.x //鼠标移动距离
			distanceY = o.clientY - cur.y
			this.style.left = dx + distanceX + 'px';
			this.style.top = dy + distanceY + 'px';
	
			//阻止页面的滑动默认事件--->阻止页面滚动
			document.addEventListener("touchmove",function(){
				event.preventDefault();
			},false);
		}
	}
	//鼠标或者手指松开方法
	function endFn(){
		flag = false;
		bindEdge(this);
		var that = this;
		hideTimer = setTimeout(function() {
			hideInEdge(that);
		},3000);
	}
	
	function bindEdge(target) {
		target.style.opacity = 1;
		target.style.transition = 'none';
		var width = document.documentElement.clientWidth;;
		if(target.offsetLeft > width/2) {
			target.style.left = 'auto';
			target.style.right = '-10px';
		} else {
			target.style.left = '-10px';
			target.style.right = 'auto';
		}
	}

	function hideInEdge(target) {
		target.style.opacity = '.6';
		target.style.transition = 'all .2s ease';
		var width = document.documentElement.clientWidth;;
		if(target.offsetLeft > width/2) {
			target.style.left = 'auto';
			target.style.right = '-35px';
		} else {
			target.style.left = '-35px';
			target.style.right = 'auto';
		}
	}
	
	//同步载入js
	function loadJsSync(url, success) {
		var domScript = document.createElement('script');
		domScript.src = url;
		success = success || function () {};
		domScript.onload = domScript.onreadystatechange = function () {
			if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
				success();
				this.onload = this.onreadystatechange = null;
				this.parentNode.removeChild(this);
			}
		}
		document.getElementsByTagName('head')[0].appendChild(domScript);
	}
	


	function GetParms(){
		var args = new Object();
		var query = location.search.substring(1); //获取查询串
		var pairs = query.split("&"); //在逗号处断开
		for (var i = 0; i < pairs.length; i++){
			var pos = pairs[i].indexOf('='); //查找name=value
			if (pos == -1) continue; //如果没有找到就跳过
			var argname = pairs[i].substring(0, pos); //提取name
			var value = pairs[i].substring(pos + 1); //提取value
			args[argname] = unescape(value); //存为属性
		}
		return args;
	}
	

	/**
	 * 新增退出弹窗
	 * chenjielang
	 * 2018-6-20
	 */
	function InterceptBox() {
		this.isNeverShowToday = false;
		this.element = null;
		this.adImgSrc = '';
	 }
 
	 InterceptBox.prototype = {
		 init: function(adImgSrc,adImgUrl) {
			 var that = this;
			 var clientWidth = document.documentElement.clientWidth;
			 var clientHeight = document.documentElement.clientHeight;
			 var length = Math.min(clientWidth,clientHeight);
			 document.documentElement.style.fontSize = length/20 + 'px';
			 console.log(clientWidth);
			 if(this.element) {
				 this.element.innerHTML = '';
			 }
			 //背景
			 var bg = createEle('div',{
				 position : 'fixed',
				 left: 0,
				 top: 0,
				 width: '100%',
				 height: '100%',
				 background: 'rgba(0,0,0,.5)',
				 display: 'none',
				 zIndex: '999'
			 }); 
			 //窗口
			 var pane = createEle('div',{
				 position: 'absolute',
				 left : '0',
				 right: '0',
				 top: '0',
				 bottom: '0',
				 margin: 'auto',
				 width: '18rem',
				 height: '14rem',
				 background: '#fff',
				 borderRadius: '5px',
				 fontSize : '1rem',
				 textAlign: 'center'
			 });
			
 
			 //窗口内广告图
			 var adImg = createEle('img',{
				 width: '100%',
				 height: '6rem',
				 borderTopLeftRadius: '5px',
				 borderTopRightRadius: '5px',
				 cursor: 'pointer'
			 });
 
			 adImg.src = adImgSrc || this.adImgSrc;
			 adImg.addEventListener('click',function() {
				 window.open(adImgUrl||'#');
			 })
			 pane.appendChild(adImg);
 
			 //按钮<仍要离开>
			 var btnLeave = createEle('div',{
				 display: 'inline-block',
				 width: '7rem',
				 height: '2.2rem',
				 lineHeight : '2.2rem',
				 color: '#989898',
				 border: '1px solid #989898',
				 borderRadius: '15px',
				 cursor: 'pointer',
				 margin: '.3rem'
			 });
			 btnLeave.innerText = '仍要离开';
			 btnLeave.addEventListener('click',function() {
				 window.history.go(-2);
			 });
			 pane.appendChild(btnLeave);
 
			 //按钮<微端下载>
			 var btnDownload = createEle('div',{
				 display: 'inline-block',
				 width: '7rem',
				 height: '2.2rem',
				 lineHeight : '2.2rem',
				 color: '#fff',
				 background: '#00b3ff',
				 borderRadius: '15px',
				 cursor: 'pointer',
				 margin: '.5rem'
			 });
			 btnDownload.innerText = '微端下载';
			 btnDownload.addEventListener('click',function() {
				 window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.pipaw.browser&ckey=CK1359730234360';
			 });
			 pane.appendChild(btnDownload);
			 
			 //收藏提示
			 var collectTips = createEle('div',{
				 width: '100%',
				 height: '2.2rem',
				 lineHeight: '2.2rem',
				 color: '#000'
			 });
			 collectTips.innerText = '收藏到浏览器书签方便下次进入噢';
			 pane.appendChild(collectTips);
 
			 //今日不再显示
			 var neverShow = createEle('div',{
				 display:'-webkit-box',
				 display: 'flex',
				 alignItems : 'center',
				 justifyContent : 'center',
				 width: '100%',
				 height: '2.2rem'
			 });
			 //按钮框
			 var neverBtn = createEle('span',{
				 float: 'left',
				 width : '1rem',
				 height: '1rem',
				 border: '1px solid #989898',
				 borderRadius: '5px',
				 cursor: 'pointer'
			 });
			 
			 neverBtn.addEventListener('click',function() {
				 if(that.isNeverShowToday) {
					 that.isNeverShowToday = false;
					 this.style.background = '';
					 localStorage.removeItem('InterceptTime');
				 } else {
					 that.isNeverShowToday = true;
					 this.style.background = 'url(http://www.7724.com/img/radio_asd_tre.png) no-repeat';
					 localStorage.setItem('InterceptTime',new Date().getTime()/1000);
				 }
			 });
			 neverShow.appendChild(neverBtn);
			 //提示语
			 var neverTips = createEle('span',{
				 float: 'left',
				 color: '#989898',
				 fontSize: '.8rem',
				 marginLeft: '10px'
			 });
			 neverTips.innerText = '今日不再显示';
			 neverShow.appendChild(neverTips);    
			 pane.appendChild(neverShow);
			 
			 //关闭按钮
			 var closeBtn = createEle('img',{
				 position: 'absolute',
				 width: '1.3rem',
				 height: '1.8rem',
				 right: '0',
				 top: '-1.8rem',
				 cursor: 'pointer'
			 });
			 closeBtn.src = 'http://www.7724.com/img/closeIcon.png';
			 closeBtn.addEventListener('click',function() {
				 //关闭窗口
				 bg.style.display = 'none';
			 })
			 pane.appendChild(closeBtn);
 
			 bg.appendChild(pane);
			 document.body.appendChild(bg);
			 this.element = bg;
		 },
		 pushHistory : function() {
			 if (!window.history.state) {
				 window.history.pushState({
					 title: document.title,
					 url: location.href
				 }, document.title, location.href);
			 }
		 },
		 listenHistory : function() {
			 var that = this;
			 setTimeout(function() {
				 window.addEventListener('popstate',function(e){        
					 if(e.state) {
						 return ;
					 } else {
						 that.readTime();
					 }
				 })
			 },0);
		 },
		 readTime: function() {
			 var time = parseInt(localStorage.getItem('InterceptTime'))||null;
			 var nowTime = new Date().getTime()/1000;
			 if(time && nowTime-time<86400) {      
				 window.history.back();
			 } else {    
				window.history.pushState('forward',null,'#');
                window.history.forward(1);
				this.element.style.display = 'block';
			 }
		 }
	 }

	var box = new InterceptBox();
	var isShowInterceptBox = false;
	var openFlag = getQueryString('flag');
	var openUrl = openFlag ? ('http://'+openFlag+'.open.7724.com/networkgame/getpopad'):'http://opengame.7724.com/networkgame/getpopad';
	function getAdMsg() {
		var from = getQueryString('from');
		if(from && from.indexOf('pc') == -1) {
			console.log('openUrl=='+openUrl);
			$.ajax({
				type: 'POST',
				url : openUrl,
				data : {
					flag : openFlag
				},
				success: function(res) {
					console.log('return=='+res)
					if(res.code == '0') {
						if(res.data.single_back_recommend == '1') {
							isShowInterceptBox = true;
							box.init(res.data.advertising.img,res.data.advertising.url);
							box.pushHistory();
							box.listenHistory();
						}
					}
				},fail:function(res) {
					console.log('fail return ==' + res);
				}
			})
		}
	}
	 
	 window.addEventListener('orientationchange',function() {
        if(isShowInterceptBox) {
            box.init();
        } 
    });
	setTimeout(function() {
		getAdMsg();
	},200);
	
