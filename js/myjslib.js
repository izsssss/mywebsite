/**
	根据id查找元素
	@param selector 选择器
	@return 返回查找元素
*/
function id(selector){
			return document.getElementById(selector);
}
/**
	根据tag查找元素
	@param selector 选择器
	@return 返回查找元素数组
*/
function tag(selector){
	return document.getElementsByTagName(selector);
}
/**
	根据class类查找元素
	@param className 类名
	@param context 搜素的上下文，不传默认document
	@return 返回查找元素数组
*/
function getByClass(className,context){
			context = context || document;
			if(context.getElementsByClassName){
				return context.getElementsByClassName(className);
			}
			var arr = context.getElementsByTagName('*');
			var re = new RegExp('\\b'+className+'\\b');
			var result = [];
			for(var i=0; i<arr.length; i++){
				if( re.test(arr[i].className) ){
					result.push(arr[i]);
				}
			}
			return result;
		}
/**
	能用的选择器，可以支持id、tag、class
	@param selector 选择器
	@param context 搜素的上下文，不传默认document
	@return 返回查找元素数组
*/
function $(selector,context){
	var firstLetter = selector.charAt(0);
	switch(firstLetter){
		case '#':
			return [ id(selector.substring(1)) ];
			break;
		case '.':
			return getByClass(selector.substring(1),context);
			break;
		default:
			return tag(selector);
	}
}
/**
	设置或获取元素dom属性
	@param elem 元素
	@param attr dom属性名称
	@param value 属性值
*/
function attr(elem,attr,value){
	if(value){
		elem.setAttribute(attr,value);
	}else{
		return elem.getAttribute(attr);
	}

}
/**
	设置或获取元素对象属性
	@param elem 元素
	@param prop 对象属性名称
	@param value 属性值
*/
function prop(elem,prop,value){
	if(value){
		elem[prop] = value;
	}else{
		return elem[prop];
	}
}
/**
	设置或获取value属性
	@param elem 元素
	@param value 属性值
*/
function val(elem,value){
	if(value){
		elem.value = value;
	}else{
		return elem.value;
	}
}
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
	设置css样式
	@param attr css属性
	@param value css属性值
*/
function _setStyle(elem,attr,value){
	switch(attr){
		case 'width':
		case 'height':
		case 'padding':
		case 'paddingLeft':
		case 'paddingRight':
		case 'paddingTop':
		case 'paddingBottom':
			value = /\%/.test(value)?value:Math.max(pareInt(value),0) + 'px';
			break;
		case 'left':
		case 'right':
		case 'top':
		case 'bottom':
		case 'margin':
		case 'marginLeft':
		case 'marginRight':
		case 'marginTop':
		case 'marginBottom':
			value = /\%/.test(value)?value:pareInt(value) + 'px';
			break;

	}
	elem.style[attr] = value;
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
/**
	为元素添加新的css样式
	@param elem 元素对象
	@param className class名称
*/
function addClass(elem,className){
	var re = new RegExp('\\b'+className+'\\b');
	if(!re.test(elem.className)){
		elem.className = elem.className +' '+ className;
	}
}
/**
	移除元素的css样式
	@param elem 元素对象
	@param className class名称
*/
function removeClass(elem,className){
	var re = new RegExp('\\b'+className+'\\b');
	elem.className = trim(elem.className.replace(re,''));

}
/**
	去字符串首尾空格
	@param str 字符串
*/
function trim(str){
	return str.replace(/^\s*|\s*$/g,'');
}
/**
	设置或获取元素width
	@param elem 元素对象
	@param value 宽度值
*/
function width(elem,value){
	if(value){
		elem.style.width = parseInt(value) + 'px';
	}else{
		return parseInt(css(elem,'width'));
	}
}
/**
	设置或获取元素height
	@param elem 元素对象
	@param value 高度值
*/
function height(elem,value){
	if(value){
		elem.style.height = parseInt(value) + 'px';
	}else{
		return parseInt(css(elem,'height'));
	}
}
function windowHeight(){
	var de = document.documentElement;
	return self.innerHeight ||(de&&de.clientHeight)||document.body.clientHeight;
}
function windowWidth(){
	var de = document.documentElement;
	return self.innerWidth ||(de&&de.clientWidth)||document.body.clientWidth;
}
function pageX(elem){
	var p = 0;
	while( elem.offsetParent ){
		p += elem.offsetLeft;
		elem = elem.offsetParent;
	}
	return p;
}
function pageY(elem){
	var p = 0;
	while( elem.offsetParent ){
		p += elem.offsetTop;
		elem = elem.offsetParent;
	}
	return p;
}
function posY(elem){
	return parseInt( getStyle(elem,"top"));
}
function posX(elem){
	return parseInt( getStyle(elem,"left"));
}
function parentX(elem){
	return elem.parentNode == elem.offsetParent ?elem.offsetLeft:pageX(elem) - pageX(elem.parentNode );
}
function parentY(elem){
	return elem.parentNode == elem.offsetParent ?elem.offsetTop:pageY(elem) - pageY(elem.parentNode );
}
//获取鼠标相对页面左右的距离而非相对浏览器左边的距离
function getX(e){
	e = e || window.event;
	return e.pageX || e.clientX + document.body.scrollLeft || 0;
}
function getY(e){
	e = e || window.event;
	return e.pageY || e.clientY + document.body.scrollTop || 0;
}
function scrollX(){
	var de = document.documentElement;
	return self.pageXOffset || ( de && de.scrollLeft) || document.body.scrollLeft;
}
function scrollY(){
	var de = document.documentElement;
	return self.pageYOffset || ( de && de.scrollTop) || document.body.scrollTop;
}
function getElementX(e){
	return ( e && e.layerX ) || window.event.offsetX;
}
function getElementY(e){
	return ( e && e.layerY ) || window.event.offsetY;
}
/**
	创建元素
	@param elem 元素标签
*/
function create(elem){
	return document.createElement( elem );
}
/**
	移除元素
	@param elem 元素标签
*/
function remove(elem){
	elem.parentNode.removeChild(elem);
}
function empty(elem){
	elem.innerHtml = "";
}
// function text(e,value){
// 	// if(value){
// 	// 	if(e.textContent){//火狐
// 	// 		e.textContent = value;
// 	// 	}else{//ie
// 	// 		e.innerHtml = value;
// 	// 	}
// 	// }
// 	var textNode = document.createTextNode(value);//比上面的优
// 	e.innerHtml = "";
// 	a.appendChild(textNode);
// 	}else{
// 	var t = "";
// 	e = e.childNodes || e;
// 	for(var j=0; j<e.length; j++){
// 		t += e[j].nodeType !=1 ? e[j].nodeValue : text(e[j].childNodes);//递归，找孩子的孩子
// 	}
// }
function next(elem){
	do{
		elem = elem.nextSibling;
	}while(elem && elem.nodeType !=1);
	return elem;
}
function prev(elem){
	do{
		elem = elem.previousSibling;
	}while(elem && elem.nodeType !=1);
	return elem;
}
function first(elem){
	elem = elem.firstChild;
	return elem && elem.nodeType !=1 ? next(elem) : elem;
}
function last(elem){
	elem = elem.lastChild;
	return elem && elem.nodeType !=1 ? next(elem) : elem;
}
function addEvent(elem,type,handler){
	if(elem.addEventListener){
		elem.addEventListener(type,handler,false);
	}else if(elem.attachEvent){
		elem[type+handler] = function(){
			handler.call(elem);//把指针从window改到当前
		}
		elem.attachEvent('on'+type,[type+handler]);
	}else{
		elem['on'+type] = handler
	}
}
function removeEvent(elem,type,handler){
	if(elem.removeEventListener){
		elem.removeEventListener(type,handler,false);
	}else if(detachEvent){
		elem.detachEvent('on'+type,[type+handler]);
	}else{
		elem['on'+type] = null;
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


