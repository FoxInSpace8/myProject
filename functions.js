var player1;
var player2;
var prevPlayer;
var win = false;
var resArr = [];
var move = 1;
var n;
var arr = [];

function newGame(){
	document.getElementById("gameBody").innerHTML = '<div id="div2" ><h1>Новая игра</h1><label for="text" id="label">Введите имя первого игрока: </label><input type="text" name="player1" id="player1" /><br/><br/><label for="text" id="label">Введите имя второго игрока: </label><input type="text" name="player2" id="player2" /><br/><br/><label for="count" id="label">Введите размерность:</label><input type="text" name="count" id="count" />   <input type="button" name="ok" id="ok" value="Ok" onclick="goToGame()"/></div>';
}		  

function goToGame(){
	
	if(player1=="")
		alert("Введите имя первого игрока");
	else if(player2=="")
		alert("Введите имя второго игрока");
	player1=document.getElementById("player1").value;
	player2=document.getElementById("player2").value;
	n=Number(document.getElementById("count").value);
	console.log(n);
	if (n=="" || n < 3 || n > 10 )
		alert("Размерность должна быть в интервале от 3 до 10");
	//создаем таблицу размерности n
	var page ='<div id="div3"><h1>ИГРА</h1></br><h2 id="header2"><div id="current"></div></h2></br><table id="tableXO" border="5">';
	for (var i=0; i<n; i++){
		page =page+'<tr>';
		arr[i]=[];
		for (var j=0; j<n; j++)
		{
			arr[i][j]=0;
			page = page +'<td id ="td'+i+j+'" x="'+i+'" y ="'+j+'" bgcolor ="white" height="50" width="50" align="center" onclick="newMove(this)"></td>';
		}
		page =page+'</tr>';
	}
	page=page+'</table></br><input type="button" id="newGame" value="Новая игра" onclick="newGame()" hidden="true"></div>';
	console.log(arr);
	document.getElementById("gameBody").innerHTML =page;	
	document.getElementById("current").textContent = "Ход игрока "+player1;
	
	
	
	/*else
	{
		document.getElementById("div2").hidden = "true";
		document.getElementById("div3").hidden = "";	
	}*/
}

function newMove(element){
	if(element.textContent == "" && !win){
		var x=element.getAttribute("x");
		var y=element.getAttribute("y");
		if(move%2 != 0){
			element.textContent = "X";
			document.getElementById("current").textContent = "Ход игрока "+player2;
			prevPlayer = player1;
			arr[x][y]="X";
		}
		else{	
			element.textContent = "O";		
			document.getElementById("current").textContent = "Ход игрока "+player1;
			prevPlayer = player2;
			arr[x][y]="O";
		}
		//проверка на победу
		if(move >=(n+n-1) && checkElement(x, y)){
			document.getElementById("current").innerHTML = "<font color='red' >Выйграл игрок "+prevPlayer+". Поздравляем!</font>";
			for (var i = 0; i< n; i ++)
			{
				console.log("td"+resArr[i]);
				document.getElementById("td"+resArr[i]).setAttribute("style", "background-color: lime");
			}
			win = true;
			document.getElementById("newGame").hidden = "";	
		}


	}
	move++;
}

function checkElement(x,y){
	var result = false;
	var element = arr[x][y];
	// проверка по x
	for( var i=0; i< n; i++){
		if(element != arr[x][i]){
			result = false;
			resArr=[];
			break;
		}
		else {
		result = true;
		resArr[i]=x.toString()+i.toString();		
		}
	}
	if(result == true)
			return true;
	//проверка по y
	for(var i=0; i<n; i++){
		if(element != arr[i][y]){
			result = false;
			resArr=[];
			break;
		}
		else {
			result = true;
			resArr[i]=i.toString()+y.toString();				
		}
	}
	if(result == true)
			return true;
	//проверка диагоналей
	if(x==y){
		for(var i=0; i< n; i++){
			if(element != arr[i][i]){
			result = false;
			resArr=[];
			break;
		}
		else {
			result = true;
			resArr[i]=i.toString()+i.toString();				
		}
		}
		if(result == true)
			return true;	
	}
	if((Number(x)+Number(y))==(n-1))
	{
		for(var i=0; i <n ; i++){
			if(element != arr[i][(n-1)-i]){
				resArr=[];
				result = false;
			break;
			}
			else {
			result = true;
			resArr[i]=i.toString()+((n-1)-i).toString();				
		}
		}
		if(result == true)
			return true;
	}
	return result;
	}
			
