window.onload=function () 
{   //Creating canvas 
    var canvas=document.querySelector('canvas');
    canvas.width = 400;
	canvas.height = 400;
    var c=canvas.getContext("2d");
    //snake variables
    var snakesize=5;
    
    //directio variable
	var direction = 'right';
	
	//game speed variabled
	var gamespeed=90;

    //dimensions of canvas
    var cwidth=canvas.width;
    var cheight=canvas.height;
    

    var score=0;
    var highscore;
    //if(!localStorage.getItem("highscore"))
    	highscore=localStorage.getItem("highscore");
    //else
    	//highscore=0;

    document.getElementById('highscore').innerHTML=highscore;

    var snake; 
    var food={
    	x:undefined,
    	y:undefined
    };


    var gameloop;

 	function drawbodypart(x,y)
 	{   
 		
 		c.beginPath();
 		c.arc(x,y,5,0,Math.PI*2,true);
 		c.fillStyle='green';
 		c.fill();
 		c.strokeStyle='black';
 		c.stroke();

 	}

 	function drawfoodpart(x,y)
 	{  
 		c.beginPath();
 		c.arc(x,y,5,0,Math.PI*2,true);
 		c.fillStyle='orange';
 		c.fill();
 		c.strokeStyle='black';
 		c.stroke();
 	}

 	function drawsnake()
 	{	
 		c.clearRect(0,0,innerWidth,innerHeight);
 		for(var i=0;i<snakesize;i++)
 		{
 			drawbodypart(snake[i].x,snake[i].y);
 		}
 	}

 	function createSnake(snakex,snakey)
 	{
 		snake=[];
 		snake.push({x:snakex,y:snakey});
 		for(var i=1;i<=snakesize-1;i++)
 			snake.push({x:snakex-10*i,y:snakey});
 	}

 	function createfood(foodx,foody)
 	{	
 		food.x=foodx;
 		food.y=foody;
 	}

 	function moveSnake()
 	{
 		var snakeX=snake[0].x;
		var snakeY=snake[0].y;



		if(direction === 'right')
			snakeX+=10;
		else if(direction==='left')
			snakeX-=10;
		else if(direction==='down')
			snakeY+=10;
		else
			snakeY-=10;

		if(snakeX>=cwidth)
			snakeX=5;
		if(snakeX<=0)
			snakeX=cwidth-5;

		if(snakeY>=cheight)
			snakeY=5;
		if(snakeY<=0)
			snakeY=cheight-5;

		for(var i=snakesize-1;i>=1;i--)
		{
			snake[i].x=snake[i-1].x;
			snake[i].y=snake[i-1].y;
		}
		//check for body collision
		var bodycollison=false;
		for(var i=0;i<snakesize;i++)
		{
			if(snakeX===snake[i].x)
			{
				if(snakeY===snake[i].y)
					bodycollison=true;
			}

		}

		snake[0].x=snakeX;
		snake[0].y=snakeY;

		if(bodycollison===true)
			{   
				if(score>highscore)
					{
						highscore=score;
						alert(highscore);
					}

				document.getElementById('finalscoreinfo').innerHTML=score;	

				score=0;
				document.getElementById('highscore').innerHTML=''+highscore;
				document.getElementById('currentscore').innerHTML=''+score;

				if(localStorage.getItem("highscore")<highscore)
 					localStorage.setItem('highscore',highscore);

				gameloop=clearInterval(gameloop);
				snake=[];
				snakesize=4;
				direction='right';
				c.clearRect(0,0,cwidth,cheight);
				//init();
				createSnake(60,60);
				createfood(80,80);
				document.getElementById('start-btn').disabled=false;
				document.getElementsByClassName('modal')[0].style.display='block';

			}
	
	 }
	 
	 document.getElementById('modalfooter').onclick=function()
	 {
		document.getElementsByClassName('modal')[0].style.display='none';
	 };
	

 	function changedirection()
 	{
 		document.onkeydown=function(event)
 		{
 			var keycode=window.event.keyCode;
 			switch (keycode) 
 			{

        		case 37:
            		if (direction != 'right') {
                		direction = 'left';
            		}
            		console.log('left');
            		break;

        		case 39:
            		if (direction != 'left') {
                		direction = 'right';
                		console.log('right');
            		}
            		break;

        		case 38:
            		if (direction != 'down') {
                		direction = 'up';
                		console.log('up');
            		}
            		break;

        		case 40:
            		if (direction != 'up') {
                		direction = 'down';
                		console.log('down');
            		}
            		break;
        	}
 		}
 	}

 	function checkcollision()
 	{
 		if( Math.abs(food.x-snake[0].x)<10&&Math.abs(food.y-snake[0].y)<10)
 			{	snake.push({x:snake[snakesize-1].x-10,y:snake[snakesize-1].y-10});
 			 	snakesize++;
 			 	console.log(snakesize);
 			 	var foodX=Math.floor(Math.random()*cwidth);
 			 	var foodY=Math.floor(Math.random()*cheight);
 			 	if(foodX<5)
 			 		foodX=foodX+5;
 			 	else if(foodX>cwidth-5)
 			 		foodX=foodX-5;
 			 	
 			 	if(foodY<5)
 			 		foodY=foodY+5;
 			 	else if(foodY>cheight-5)
 			 		foodY=foodY-5;

 			 	food.x=foodX;
 			 	food.y=foodY;

				  score++;
 			 	document.getElementById('currentscore').innerHTML=''+score;

 			}
 	}
 	function init()
 	{
 		createSnake(60,60);
 		createfood(80,80);
 		gameloop=setInterval(function()
 		{	
 			changedirection();
			 moveSnake();
			if(snake.length>0)
 				drawsnake();
			drawfoodpart(food.x,food.y);
			checkcollision();
 		},gamespeed);
 	
	 }
	 
	 document.getElementById('start-btn').onclick=function()
	 {
		init();
		document.getElementById('start-btn').disabled=true;
	 };
};