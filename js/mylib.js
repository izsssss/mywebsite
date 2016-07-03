/**
	获取css样式
	@param elem 元素
	@param prop css属性
*/
// 内部函数
function _getStyle(elem,prop){
	prop = prop.replace(/\-[A-z]/g,function(word){
		return word.substring(1).toUpperCase();
	});
	if(elem.currentStyle){//IE
		return elem.currentStyle[prop];
	}else if(window.getComputedStyle){
		return getComputedStyle(elem,false)[prop];
	}else{
		return elem.style[prop];	
	}

}

/**
	设置元素的css样式
	@param elem 元素对象
	@param prop css属性
	@param value css属性值
*/
function css(elem,prop,value){
	if(value){
		elem.style[prop] = value;//传三个参数
	}else{
		if(typeof prop == 'object'){
			for(var p in prop){
				var p2 = p.replace(/\-[A-z]/g,function(word){
					return word.substring(1).toUpperCase();
				});
				_setStyle(elem,p2,prop[p]);
			}//如果传的对象就设置属性
		}else{
			return _getStyle(elem,prop);
		}//否则获取并返回显示
	}
}

function animate(elem, attr, callback){
    clearInterval(elem.timer);
    elem.timer = setInterval(function(){
    	var bStop = true;//一个标识位，值为true是代表需要停止定时器，为false不需要停止
    	for(var prop in attr){//取出所有attr对象中的属性
        	var currentStyle;

        	if(prop == 'opacity'){//如果prop是opacity
            	currentStyle = parseInt(css(elem, prop)*100);//那么将获取出来的当前值转换成为百分制
        	}else{
            	currentStyle = parseInt(css(elem, prop));
        	}

       		var speed = (attr[prop] - currentStyle) / 8;
        	speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);


        	if(currentStyle != attr[prop]){
            	bStop = false;
        	}

        	currentStyle += speed;
        	if(prop == 'opacity'){
            	elem.style.opacity = currentStyle / 100;
            	elem.style.filter = "alpha(opacity:"+currentStyle+")";
        	}else{
            	elem.style[prop] = currentStyle + 'px';
       		}
   		}

    	if(bStop){
        	clearInterval(elem.timer);
        	if(callback) callback();
    	}
    }, 30);
}