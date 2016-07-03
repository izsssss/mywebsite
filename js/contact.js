// var oNav = document.getElementById('nav');
// var aSpan = oNav.getElementsByTagName('span');
// var oNavMenuBox = document.getElementById('nav-menu-box');
// for(var i=0;i<aSpan.length;i++){
// 	aSpan[i].onclick = function(){
// 		if(this.className == 'nav-icon'){
// 			animate(oNavMenuBox,{top:0});
// 			// oNavMenuBox.style.top = 0;

// 		}
// 		if(this.className == 'nav-close-icon'){
// 			animate(oNavMenuBox,{top:-192});
// 			// oNavMenuBox.style.top = -192;
// 		}
// 	};
// }

$(function(){
	setInterval(function(){
		$('#text').slideDown(400);
		
	},300);
	
});

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


	$(window).bind('scroll',function(){
		    // var width=$(window).width;
            var len=$(this).scrollTop();
            if(len>=150){
                //显示回到顶部按钮
                 $('.up').css({
					left: '1280px'
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