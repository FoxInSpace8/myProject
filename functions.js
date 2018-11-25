var player1;
var player2;
var prevPlayer;
var win;
var resArr;
var move;
var n;
var arr;

function newGame(){
	win = false;
	resArr = [];
	move = 1;
	arr = [];
	document.getElementById("div1").hidden = false;
	document.getElementById("div2").hidden = true;
	document.getElementById("newGame").hidden = true;
	document.getElementById("player1").value="";
	document.getElementById("player2").value="";
	document.getElementById("count").value="";

}		  

function goToGame(){
	document.getElementById("player1").style.borderColor = "";
	document.getElementById("player2").style.borderColor = "";
	document.getElementById("count").style.borderColor = "";
	player1=document.getElementById("player1").value;
	player2=document.getElementById("player2").value;
	n=Number(document.getElementById("count").value);
	console.log(n);
	var valid = true;
	var msg ="";
	if(player1==""){
		valid=false;
		document.getElementById("player1").style.borderColor = "red";
		document.getElementById("validPopup").hidden=false;
		document.getElementById("validMess").hidden=false;
		msg = "Введите имя первого игрока"+"<br/>" +"<br/>";
	}
	if(player1==player2){
		valid=false;
		document.getElementById("player1").style.borderColor = "red";
		document.getElementById("player2").style.borderColor = "red";
		document.getElementById("validPopup").hidden=false;
		document.getElementById("validMess").hidden=false;
		msg = "Имена игроков не должны совпадать"+"<br/>" +"<br/>";
	}
	if(player2==""){
		valid=false;
		document.getElementById("player2").style.borderColor = "red";
		document.getElementById("validPopup").hidden=false;
		document.getElementById("validMess").hidden=false;
		msg +="Введите имя второго игрока" +"<br/>" +"<br/>";
	}
	if (n=="" || n < 3 || n > 10 || isNaN(n)){
		valid=false;
		document.getElementById("count").style.borderColor = "red";
		document.getElementById("validPopup").hidden=false;
		document.getElementById("validMess").hidden=false;
		msg +="Размерность должна быть в интервале от 3 до 10";
	}
	if(msg){
		document.getElementById("validMess").innerHTML=msg;
	}
	if(valid){
	//создаем таблицу размерности n
	var page ='';
	for (var i=0; i<n; i++){
		page =page+'<tr>';
		arr[i]=[];
		for (var j=0; j<n; j++)
		{
			arr[i][j]=0;
			page = page +'<td id ="td'+i+j+'" x="'+i+'" y ="'+j+'" onclick="newMove(this)" class="cell"></td>';
		}
		page =page+'</tr>';
	}
	console.log(arr);
	document.getElementById("div1").hidden = true;
	document.getElementById("div2").hidden = false;
	document.getElementById("tableXO").innerHTML =page;	
	document.getElementById("current").textContent = "Ход игрока "+player1;	
	}
}

function clearValid(id){
	if(document.getElementById(id).style.borderColor == "red"){
		document.getElementById(id).style.borderColor = "";
		document.getElementById("validPopup").hidden=true;
		document.getElementById("validMess").hidden=true;

	}
}

function newMove(element){
	console.log("new move");
	console.log(element.textContent);
	console.log(win);
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
			
