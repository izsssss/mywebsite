var oTips = document.getElementById('tips');
var oTab = document.getElementById('tab');
var aLi = oTab.getElementsByTagName('li');
var oImgs = document.getElementById('imgs');
var aImg = oImgs.getElementsByTagName('img'); 
var index = 0;
for(var i=0;i<aLi.length;i++){
	aLi[i].index = i;
	aLi[i].onmouseover =function(){
		index = this.index
		changeImg(index);
	};

	function changeImg(index){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = "";
				aImg[i].className = "";
			}
			aLi[index].className = "selected";
			aImg[index].className = "selected";
	}
}
var oPrev = document.getElementById('prev');
var oNext = document.getElementById('next');
oPrev.onclick = function(){
	index--;
	if(index == -1){
		index = aLi.length-1;
	}
	changeImg(index);
};
oNext.onclick = function(){
	index++;
	if(index == aLi.length){
		index = 0;
	}
	changeImg(index);
};
play();
var timer;
function play(){
	timer =setInterval(function(){
		oNext.onclick();
		},1500);
	}

oImgs.onmouseover = function(){
		clearInterval(timer);
	};
oImgs.onmouseout = function(){
		play();
	};								


var oNav = document.getElementById('nav');
var aSpan = oNav.getElementsByTagName('span');
var oNavMenuBox = document.getElementById('nav-menu-box');
for(var i=0;i<aSpan.length;i++){
	aSpan[i].onclick = function(){
		if(this.className == 'nav-icon'){
			animate(oNavMenuBox,{top:0});
			// oNavMenuBox.style.top = 0;

		}
		if(this.className == 'nav-close-icon'){
			animate(oNavMenuBox,{top:-92});
			// oNavMenuBox.style.top = -92;
		}
	};
}



var oScBtn = document.getElementById('sc-btn');
var oScNav = document.getElementById('sc-nav');
var flag = 0;
var oScUl = document.getElementById('sc-ul');
var aScLi = oScUl.getElementsByTagName('li');
var oScenery = document.getElementById('scenery');
var aDiv = oScenery.getElementsByTagName('div');
oScBtn.onclick = function(){
	
	if(flag==0){
		oScNav.style.display = 'block';
		flag=1;
	}else{
		oScNav.style.display = 'none';
		flag=0;
	}
	for(var i=0;i<aScLi.length;i++){
		aScLi[i].index = i;
		// aScDiv[i].index = i;
		aScLi[i].onmouseover = function(){
			for(var i=0;i<aScLi.length;i++){
				aScLi[i].className = "";
				aDiv[i].className = "";
			}
		this.className = "selected1";
		aDiv[this.index].className = "selected fadeLeft-animate";
			// console.log(aScDiv[this.index]);
		};
	}
};

//PORTFOLIO
$(function(){
	$('#shanghai a').hover(function(){
		$(this).children('img').stop().animate({
			height: 280,
			width:210,
			marginLeft: -5,
			marginTop: -7
		});
		$(this).children('.mask').stop().show().animate({
			opacity: 0.84
		});
	}, function(){
		$(this).children('img').stop().animate({
			height: 266,
			width:200,
			marginLeft: 0,
			marginTop: 0
		});
		$(this).children('.mask').stop().animate({
			opacity: 0
		});
	});

	var index1 = 0;
	var oShanghai = document.getElementById('shanghai');
	var a = oShanghai.getElementsByTagName('a');
	for(var i=0;i<a.length;i++){
		a[i].setAttribute('index1',i);
	}
	

	$('#shanghai a').on('click',function(){
		var iWidth = this.getAttribute('data-width')>=600?600:this.getAttribute('data-width');
		var iheight = this.getAttribute('data-width')>=600?600/this.getAttribute('data-width')*this.getAttribute('data-height'):this.getAttribute('data-height');
		$div1 = $('<div class="lightbox-mask"></div>').css({
			width:$(window).width(),
			height:$(window).height(),
			top:0,
			left:0
		}).appendTo(document.body);
		
		var oProtfolio = document.getElementById('shanghai');
		var aProtfolioImg = oProtfolio.getElementsByTagName('img');
		$('.lightbox-mask').on('click',function(){
			$('.lightbox-mask,.lightbox-img,.loading').remove();
			
		});
		$div = $('<div class="lightbox-img"><div class="loading">loading</div></div>').css({
			width: iWidth,
			height: iheight,
			left: ($(window).width() - iWidth) / 2,
			top: ($(window).height() - iheight) / 2<0?-($(window).height() - iheight) / 2:($(window).height() - iheight) / 2
		}).appendTo(document.body);
		var oImg = new Image();//document.createElement('img');
		
		oImg.onload = function(){
			$div.children('.loading').hide();
			this.width = iWidth;
			// this.height = iheight;
			 if(iheight>450)
			 {
			 	this.height = 450;
			 	this.width = 450/iheight*iWidth;
			 	$('.lightbox-img').css({
			 		height:450,
			 		width:450/iheight*iWidth,
			 		left: ($(window).width() - this.width) / 2,
					top: ($(window).height() - this.height) / 2<0?-($(window).height() - this.height) / 2:($(window).height() - this.height) / 2
			 	});
			 }
			 
			$div.append(oImg);
		};
		oImg.src = this.getAttribute('data-src');
		// oImg.src = '../img/big1.jpg';
		return false;
	});
	
});

$(function(){
	$('.btn').on('click',function(){
		alert('sorry,没有更多内容了..');
		return false;
	});		
});

//footer
$(function(){
	$('#footer .footer-icon1').hover(function(){
		$(this).css({
			backgroundPosition: '0px -21px'
		});
	},function(){
		$(this).css({
			backgroundPosition: '0px 0px'
		});
	});

	$('#footer .footer-icon2').hover(function(){
		$(this).css({
			backgroundPosition: '-21px -23px'
		});
	},function(){
		$(this).css({
			backgroundPosition: '-21px 0px'
		});
	});

	$('#footer .footer-icon3').hover(function(){
		$(this).css({
			backgroundPosition: '-50px -23px'
		});
	},function(){
		$(this).css({
			backgroundPosition: '-50px 0px'
		});
	});

	$('#footer .footer-icon4').hover(function(){
		$(this).css({
			backgroundPosition: '-80px -23px'
		});
	},function(){
		$(this).css({
			backgroundPosition: '-80px 0px'
		});
	});
});

$(function(){
	$(window).bind('scroll',function(){
		    // var width=$(window).width;
            var len=$(this).scrollTop();
            if(len>=150){
                //显示回到顶部按钮
                 $('.up').css({
					right: '50px'
					});
                $('.up').show();
            }else{
                //影藏回到顶部按钮
                $('.up').hide();
            }
    });
        //绑定回到顶部按钮的点击事件
        $('.up').on('click',function(){
            //动画效果，平滑滚动回到顶部
            $("body,html").animate({ scrollTop: 0 });
            //不需要动画则直接
            //$(document).scrollTop(0)
        });
});

$(function(){
	 $(window).scroll(function(){
	 	if($('body').scrollTop()>=$('#aboutMe').offset().top-100){
	 		$('.zs-pic').addClass('fadeLeft-animate');
	 		$('#introduce1').addClass('fadeRight-animate');
	 	}
	 	if($('body').scrollTop()>=$('#scenery').offset().top-100){
	 		$('#title1 h1').addClass('fadeInUp-animated');
	 		$('#shanghai,#nanjing,#xitang').addClass('fadeLeft-animate');
	 	}
		if($('body').scrollTop()>=$('#tips').offset().top-100){
			$('#title2 h1').addClass('fadeInUp-animated');
			$('#imgs').addClass('fadeLeft-animate');
			$('#myblog').addClass('fadeTop-animate');
			
		}
		if($('body').scrollTop()>=$('#food-div').offset().top-100){
			$('#title3 h1').addClass('fadeInUp-animated');
			$('.food-grid1').addClass('fadeLeft-animate');
			$('.food-grid21').addClass('fadeTop-animate');
		}
		if($('body').scrollTop()>=$('.food-grid21').offset().top-100){
			$('.food-grid11').addClass('fadeRight-animate');
			$('.food-grid22').addClass('fadeLeft-animate');
		}	
	 		
	});
});
