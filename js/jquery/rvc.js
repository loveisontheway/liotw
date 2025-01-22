(function($){

	

	$.fn.rvc = function(obj){
		return this.each(function(){
			var self = $(this);
            var startX = 0, startY = 0; //触摸开始时手势横纵坐标 
	        var temPos; //滚动元素当前位置
	        var iCurr = 0; //当前滚动屏幕数
	        var oPosition = {}; //触点位置
			var ww;
			var sw;
			var rvcw = self.children('.rvc-wrapper');
			var rvcw_ul = rvcw.find('ul');			
			var clone1 =rvcw.find('li').clone();
			var clone2 =rvcw.find('li').clone();
			rvcw_ul.append(clone1);
			rvcw_ul.append(clone2);
			var rvcw_li = rvcw.find('li');
			var liw;			
			var liNum = obj.liNum;
			var plr = obj.plr;
			var sb = obj.spaceBetween;
			var time = obj.time;
			var size = rvcw_li.length;
			// alert(size)
			var rvcww;
			var prv = self.find(obj.prv);
			var next = self.find(obj.next);
			var iL;
			var iCurr = size/3;
			var onload = true;
			var iTime;
			var st;
			var next_b = false;
			var prv_b = false;
			var next_num = true;
			var prv_num = true;
			/*判断打开设备*/  
			var system ={    
			    win : false,    
			    mac : false,    
			    xll : false   
			};    
			//检测平台     
			var p = navigator.platform;    
			system.win = p.indexOf("Win") == 0;    
			system.mac = p.indexOf("Mac") == 0;    
			system.x11 = (p == "X11") || (p.indexOf("Linux") == 0); 
			$(window).on('load resize',function(){
				ww = $(window).width();
				self.css('width',ww-plr*2);
				sw = self.width();
				rvcw.css('width',sw-sb*2);
				rvcww = rvcw.width();
				prv.width(sb)
				next.width(sb)
				if (ww>=1024) {
					liw = (rvcww - (obj.spaceBetween*(liNum+1)))/liNum				
				}
				if (ww>=768&&ww<1024){
					liw = (rvcww - (obj.spaceBetween*(3)))/2				
				}
				if (ww<768){
					liw = (rvcww - (obj.spaceBetween*(2)))/1				
				}
				rvcw_li.css({'width':liw,'margin-left':obj.spaceBetween});
				rvcw_ul.css('width',(liw+sb)*size);
				if (onload) {
					rvcw_ul.css('left',-(liw+sb)*(size/3));
					onload = false;
				}
			})			
			//左滑
	        function move_left(){
	        	next_b = true;	        	
	        	rvcw_ul.stop().animate({left:-iCurr*(liw+sb)},time,function(){
        			iCurr++;
        			next_b = false;
		        	if(iCurr==(size/3)*2+1){
			            rvcw_ul.css({left:-(liw+sb)*(size/3)});
			            iCurr=size/3+1;
			        }
		        });		        			        	        
			}
			// var _timer = {};  
			// function delay_till_last(id, fn, wait) {  
			//     if (_timer[id]) {  
			//         window.clearTimeout(_timer[id]);  
			//         delete _timer[id];  
			//     }  
			   
			//     return _timer[id] = window.setTimeout(function() {  
			//         fn();  
			//         delete _timer[id];  
			//     }, wait);  
			// }
			$(next).on('click',function(){
				prv_num = true;
				if (next_num) {
					if (iCurr==size/3) {
						iCurr++;
					}else{
						iCurr+=2;
					}
					next_num = false;
				}else{}
				if (next_b) {
					return;
				}else{
					move_left();
				}
			})
			
			// 右滑
			function move_right(){
				prv_b = true;				
        		rvcw_ul.stop().animate({left:-iCurr*(liw+sb)},time,function(){
        			iCurr--;
        			prv_b = false;
		        	if(iCurr==-1){
			            rvcw_ul.css({left:-(liw+sb)*(size/3)});
			            iCurr=size/3-1;
			        }
		        });		        	   
			}
			$(prv).on('click',function(){
				next_num = true;
				if (prv_num) {
					if (iCurr==size/3) {
						iCurr--;
					}else{
						iCurr-=2;
					}
					prv_num = false;
				}else{}
				if (prv_b) {
					return;
				}else{
					move_right();
				}	
			})
			//获取触点位置
	        function touchPos(e){
	            var touches = e.changedTouches, l = touches.length, touch, tagX, tagY;
	            for (var i = 0; i < l; i++) {
	                touch = touches[i];
	                tagX = touch.clientX;
	                tagY = touch.clientY;
	            }
	            oPosition.x = tagX;
	            oPosition.y = tagY;
	            return oPosition;
	        }
	        //触摸开始
	        function touchStartFunc(e){
	            touchPos(e);
	            startX = oPosition.x;
	            startY = oPosition.y;
	            temPos = rvcw_ul.position().left;
	            st = parseInt(rvcw_ul.css('left'));         
	        }
	        //触摸移动 
	        function touchMoveFunc(e){
	            touchPos(e);
	            var moveX = oPosition.x - startX;
	            var moveY = oPosition.y - startY;
	            var stm = st + moveX;
	            rvcw_ul.css('left',stm);	           
	        }
	        // 触摸结束
	        function touchEndFunc(e){
	            touchPos(e);
	            var moveX = oPosition.x - startX;
	            var moveY = oPosition.y - startY;
	            if (Math.abs(moveY) < Math.abs(moveX)) {
	                if (moveX > 0) {
	                    move_right();
	                }
	                else{
	                   move_left();
	                }	             
	            }
	        }	   
            if(system.win||system.mac||system.xll){
            	// 自动轮播
            	// setInterval(move_left, 5000);
            	// 鼠标事件
	            rvcw_ul.mousedown(function(event){
	            	var event = event || window.event;   
	                var disX = event.clientX;
	                var ol = parseInt(rvcw_ul.css('left'));         
	                $(document).mousemove(function (event){
	                	
	                    var event = event || window.event;
	                    iL = event.clientX - disX;
	                    iul = iL + ol;
	                   
	                    rvcw_ul.css('left',iul);
	                    return false
	                })
	                $(document).mouseup(function(){
	                	
	                	$(document).unbind('mousemove');
	                	$(document).unbind('mouseup');
	                	if (iL>0) {
	                		move_right();
	                	}else{
	                		// let a = Math.abs(iL/liw)
	                		// console.log(Math.abs(iL%liw),liw/2,parseInt(a));
	                		// if(Math.abs(iL%liw) > liw/2){
	                		// 	rvcw_ul.stop().animate({left:-(liw+sb)*(parseInt(a)+iCurr)},time);
	                		// }else{
	                		// 	rvcw_ul.stop().animate({left:-(liw+sb)*(parseInt(a)+1+iCurr)},time);
	                		// }
	                		move_left();
	                	}
	                    
	                })
	                return false
	            })
            }else{           	
            	rvcw_ul.get(0).addEventListener('touchstart', touchStartFunc, false);        
                rvcw_ul.get(0).addEventListener('touchend', touchEndFunc, false);
                rvcw_ul.get(0).addEventListener('touchmove', touchMoveFunc, false);
            }      
		})			      
	}
})(jQuery)