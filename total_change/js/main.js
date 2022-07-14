var status_game = 0;
/* status_game = 0 Приветствие.
 * status_game = 1 ожидание ввода имени.
 * status_game = 2 Займ, ставки.
 * status_game = 3 Бросок кубиков.
 * status_game = 4 Переброс кубиков.
 * status_game = 5 Определение победителя. затем 1 или конец, возвращение долга.
 */
var player_text = "";
var enemy_text = "";
var at_stake = 0;
var gold_enemy = 10000;
var gold_player = 0;
var debt = 0;
var player = document.querySelector("#name_player").innerHTML;
var enemy = document.querySelector("#name_enemy").innerHTML;

const setGoldPlayer = () => {
	 document.querySelector("#gold_player").innerHTML = "<span style='color:gold'>GOLD:</span> <span style='color:white'>" + gold_player + "</span>";
}
const setGoldEnemy = () => {
	 document.querySelector("#gold_enemy").innerHTML = "<span style='color:gold'>GOLD:</span> <span style='color:white'>" + gold_enemy + "</span>";
}
const setAtStake = () => {
	 document.querySelector("#at_stake").innerHTML = "<span style='color:gold'>At stake: </span>"+"<p style='color:white'>" + at_stake +"</p>";
}

const countElement = (text, elem) => {
	console.log("подсчет");
	return text.split(elem).length -1;
}

const output_text = (name, text) => {
	let text_form = document.getElementById("output_form");
	text_form.innerHTML = text_form.innerHTML + name + ": " + text + "<br>";
	while(countElement(text_form.innerHTML, "<br>") > 32){
		text_form.innerHTML = text_form.innerHTML.slice(text_form.innerHTML.indexOf("<br>") + 4);
	}
	console.log(countElement(text_form.innerHTML));
}
document.addEventListener("keydown", function(event){
	if(event.keyCode == 13){
		event.preventDefault();
		document.querySelector("#input_button").click();
	}
});
document.querySelector("#input_button").onclick = function(){
	let input_text = document.querySelector("#input_form");
	player_text = input_text.value;
	output_text(player, player_text);
	input_text.value = "";
	console.log("вставка текста");
	answerEnemy();
}
const answerEnemy = () => {
	enemy_text = '';
	if(~player_text.search(/^\d+$/)){
		enemy_text = "Что? " + player_text.match(/\d+/);
	}
	else if(~player_text.search(/(В|в)озвр|(О|о)тда/)){
		let numb = Number(player_text.match(/\d+/));
		if(!numb){
			enemy_text = "Ты не написал сумму";
		}
		else if(numb > gold_player){
			enemy_text = 'Ты меня хочешь обмануть? У тебя нет столько.';
		}
		else if(numb <= gold_player){
			gold_player -= numb;
			gold_enemy += numb;
			enemy_text = "Долг платежом красен, а займ отдачею.";
		}
		else{
			enemy_text = "Ничего не понял =(";
		}
	}
	else if(status_game == 0){
		if(~player_text.search(/(П|п)рив|(З|з)драв/)){
		enemy_text = "Привет. Как тебя зовут?";
		status_game = 1;
		}
	}
	else if(status_game == 1){
		player = '<span style="color: Cyan;">' + player_text + '</span>';
		document.querySelector("#name_player").innerHTML = player;
		status_game = 2;
		enemy_text = "Даже вчерашний шторм тебя не разбудил " + player + "... играть будем?";
	}
	else if(gold_player < 1 && status_game > 1){
		if(~player_text.search(/(Д|д)олг|(З|з)айм|(Д|д)а(й|в)/)){
			let numb = Number(player_text.match(/\d+/));
			if(!numb){
				enemy_text = "Ты не написал сумму";
			}
			else if(numb && numb < gold_enemy){
				enemy_text = "Я займу тебе "+ numb +". Но не забудь отдать!";
				gold_enemy -= numb;
				gold_player += numb;
				debt += numb;
			}
			else{
				enemy_text = 'Извини, но я не могу столько занять, проси меньше.';
			}
		}
		else{
		enemy_text = "К сожалению на вашем счете недостаточно средств. Напишите номер Вашей банковской карты(шучу).<br> Попроси меня занять тебе золота, иначе дальше у нас разговора не получиться =(";
		}
	}
	else if(status_game == 2){
		if(~player_text.search(/(П|п)рив|(З|з)драв/)){
		enemy_text = "Привет " + player + " еще раз!";
		}
	    if(~player_text.search(/(Д|д)а|(С|с)огла|(П|п)(О|о)(Е|е)/)){
			enemy_text = "Ну что? Как говорил один великий человек: ПОЕЕЕХАЛИ!!<br>Сколько ставишь на кон?";
			status_game = 3;
		}
		else{
			enemy_text = "Играть то будем?";
		}
		
	}
	else if(status_game == 3){
		if(~player_text.search(/(П|п)рив|(З|з)драв/)){
		enemy_text = "Привет " + player + " еще раз!";
	    }
	    else if(~player_text.search(/(С|с)тав|(Д|д)ав/)){
			let numb = Number(player_text.match(/\d+/));
			if(!numb){
				enemy_text = "Ты не написал сумму";
			}
			else if(numb > gold_enemy){
				if(debt){
					enemy_text = "Это больше чем у меня есть! Не хочешь вернуть мне " + debt + " которые занимал?"
				}
			}
			else if(numb <= gold_player && !at_stake){
				gold_player -= numb;
				at_stake += numb;
				if(numb < gold_enemy/100){
					enemy_text = "Поднимаю до " + Math.floor(gold_enemy/100);
					gold_enemy -= Math.floor(gold_enemy/100);
					at_stake += Math.floor(gold_enemy/100);
					
				}
				else{
					enemy_text = "Поддерживаю!!!";
					status_game = 4;
					gold_enemy -= numb;
					at_stake += numb;
				}
			}
			else{
				enemy_text = 'Ты меня хочешь обмануть? У тебя нет столько.';
			}
		}
		else{
			enemy_text = "Поскольку мы деловые люди и занимаемся делами, так сколько на кон?";
		}
	}
	else if(status_game == 4){
		if(~player_text.search(/(П|п)рив|(З|з)драв/)){
		enemy_text = "Привет " + player + " еще раз!";
	    }	
	}
	else if(status_game == 5){
		if(~player_text.search(/(П|п)рив|(З|з)драв/)){
		enemy_text = "Привет " + player + " еще раз!";
	    }	
	}
	
	/*if(~player_text.search(/((З|з)айм|(Д|д)олг)/)){
		if(enemy_text != ""){
			enemy_text += ". ";
		}
		let numb = Number(player_text.match(/\d+/));
		if(!numb){
			enemy_text = "Ты не написал сумму";
		}
		else if(numb && numb < gold_enemy){
			enemy_text += "Конечно я могу занять "+ numb +". Но не забудь отдать!";
			gold_enemy -= numb;
			gold_player += numb;
			debt += numb;
	    }
	    else{
			enemy_text += 'Извини, но у меня нет такой возможности.';
		}
	}
	if(~player_text.search(/((О|о)тда|(В|в)озвращ)/)){
		let numb = Number(player_text.match(/\d+/));
		if(numb && debt >= numb && numb <= gold_player){
			gold_enemy += numb;
			gold_player -= numb;
			debt -= numb;
			enemy_text = "Долг платежом красен, а займ отдачею.";
		}
		else if(numb){
			if(numb < debt){
				enemy_text = "Ты должен меньше, а чужого мне не надо!";
			}
			else{
				enemy_text = "Но у тебя нет такой суммы!!!";
			}
		}
		else{
			enemy_text = "Ты не написал сумму";
		}
	}
	if(~player_text.search(/(Д|д)авай|(Д|д)а\s/)){
		if(gold_player < 1){
			enemy_text = "Но у тебя же нет золота! Попробуй у меня занять.";
		}
		
	}
	if(enemy_text == "Привет"){
		enemy_text += "! Будем играть?"
	}
	if(enemy_text == ""){
		enemy_text = "Я тебя не понимаю, попробуй перефразировать."
	}*/
	
	setGoldPlayer();
	setGoldEnemy();
	setAtStake();
	output_text(enemy, enemy_text);
}
