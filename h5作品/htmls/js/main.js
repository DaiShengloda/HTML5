// JavaScript Document
$(document).on("pageshow",function(){
	var c=$("#myCanvas").get(0),
	    ctx=c.getContext("2d"),
	    wi=document.body.clientWidth||document.documentElement.clientWidth,
	    hei=document.body.clientHeight||document.documentElement.clientHeight,
		per= (wi-hei)>=0?(wi-hei)/2+"px":0.05*wi+"px",
		
	    wid= (wi-hei)>=0?hei:wi;
	$("#myCanvas").attr({width:0.9*wid,height:0.9*wid}).css({"box-shadow":"10px 10px 5px #888888","margin":'1% auto',"margin-left":per});
	var boardWidth=0.9*94*wid/100;
	var gap=(0.9*wid-boardWidth)/2;
	var scal=boardWidth/14;
	ctx.translate(gap,gap);
	
	//画横线
	function drawRowline(i){
	    ctx.beginPath();
	    ctx.moveTo(0,i*scal);
	    ctx.lineTo(boardWidth,i*scal);
	    ctx.closePath();
	    ctx.stroke();
	};
	
	
	//画竖线
	function drawColline(i){
	    ctx.beginPath();
	    ctx.moveTo(i*scal,0);
	    ctx.lineTo(i*scal,boardWidth);
	    ctx.closePath();
	    ctx.stroke();
	};
	
	for(var j=0;j<15;j++){
		if (j==0||j==14){
		    ctx.strokeStyle="black";
		    ctx.lineWidth="2";
			drawRowline(j);
		    drawColline(j);	
		}else{
		    ctx.strokeStyle="#333333";
		    ctx.lineWidth="1"
		    drawRowline(j);
		    drawColline(j);
		}
	};
	
	
	//画圆点
	function drawPoint(i,j){
		ctx.fillStyle="black";
		ctx.beginPath();
		ctx.arc(i*scal,j*scal,2,0,2*Math.PI);
		ctx.closePath();
		ctx.stroke();
	};
	drawPoint(3,3);
	drawPoint(11,3);
	drawPoint(3,11);
	drawPoint(11,11);
	drawPoint(7,7);
	
	
	//画黑棋
	function drawBlack(i,j){
		ctx.strokeStyle="black";
		ctx.beginPath();
		ctx.lineWidth="10";
		ctx.arc(i*scal,j*scal,5,0,2*Math.PI);
		ctx.closePath();
		ctx.stroke();
	};
	
	
	//画白棋
	function drawWhite(i,j){
		ctx.strokeStyle="white";
		ctx.beginPath();
		ctx.lineWidth="10";
		ctx.arc(i*scal,j*scal,5,0,2*Math.PI);
		ctx.closePath();
		ctx.stroke();
	};
	
    
	//定义二维数组
	var bool=true;
	    var arr=new Array(15);
	    for(var x=0;x<15;x++){
		    arr[x]=new Array(15);
		    for(var y=0;y<15;y++){
			    arr[x][y]=0;	
		    }	    
	    }

		
	//检测是否占位
	function playGame(x,y){
	    if (arr[x][y]!=0){
		    return;
		}else{
			if (bool){
			    drawBlack(x,y);
			    bool=false;
				arr[x][y]=1;	
			}else{
			    drawWhite(x,y);
			    bool=true;
				arr[x][y]=2;	
			}
		}		
	};
	
	//检测行
	function juggleRow(x,y){
		var val=arr[x][y];
		var num=0;
		for(var i=0;i<5;i++){
		    if (arr[x-i][y]==val){
				if (i==4){
				    cong(val);	
				}
				for(var j=1;j<5;j++){
				    if (arr[x+j][y]==val){
					    num=i+j;
						if (num==4){
						    cong(val);
						}
					}else{
					    break;	
					}
				}
			}else{
			    break;	
			}
		}
	};
	
	//检测列
	function juggleCol(x,y){
		var val=arr[x][y];
		var num=0;
		for(var i=0;i<5;i++){
		    if (arr[x][y-i]==val){
				if (i==4){
				    cong(val);	
				}
				for(var j=1;j<5;j++){
				    if (arr[x][y+j]==val){
					    num=i+j;
						if (num==4){
						    cong(val);
						}
					}else{
					    break;	
					}
				}
			}else{
			    break;	
			}
		}
	};
	
	//检测左斜线
	function juggleLeftslant(x,y){
		var val=arr[x][y];
		var num=0;
		for(var i=0;i<5;i++){
		    if (arr[x-i][y-i]==val){
				if (i==4){
				    cong(val);	
				}
				for(var j=1;j<5;j++){
				    if (arr[x+j][y+j]==val){
					    num=i+j;
						if (num==4){
						    cong(val);
						}
					}else{
					    break;	
					}
				}
			}else{
			    break;	
			}
		}
	};
	
	//检测右斜线
	function juggleRightslant(x,y){
		var val=arr[x][y];
		var num=0;
		for(var i=0;i<5;i++){
		    if (arr[x+i][y-i]==val){
				if (i==4){
					cong(val);	
				}
				for(var j=1;j<5;j++){
				    if (arr[x-j][y+j]==val){
					    num=i+j;
						if (num==4){
							cong(val);
						}
					}else{
					    break;	
					}
				}
			}else{
			    break;	
			}
		}
	};
	
	//祝贺词
	function cong(val){
		setTimeout(function(){
		if (val==1){
		    alert("黑棋胜!"+'\n'+"重新开始请刷新页面!");
			$("#myCanvas").unbind();	
		}else{
		    alert("白棋胜!"+'\n'+"重新开始请刷新页面!");
			$("#myCanvas").unbind();	
		}
		},10);
	};
	
	//下棋	
	$("#myCanvas").click(function(event){	
		var width=$(this).offset().left;
		var height=$(this).offset().top;
		var x=Math.round((event.clientX+$(document).scrollLeft()-width-gap)/scal);
		var y=Math.round((event.clientY+$(document).scrollTop()-height-gap)/scal);
		playGame(x,y);
		juggleRow(x,y);
		juggleCol(x,y);
		juggleLeftslant(x,y);
		juggleRightslant(x,y);
	    
    })
	
});