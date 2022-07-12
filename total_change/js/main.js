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
	output_text(document.querySelector("#name_player").innerHTML, input_text.value);
	input_text.value = "";
	console.log("вставка текста");
}
