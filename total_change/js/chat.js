export const output_text = (name, text) => {
	let text_form = document.getElementById("output_form");
	text_form.value += name + ": " + text + "/n";
}
export let button = document.getElementById("input_button");
export button.onclick = function(){
	let input_text = document.querySelector("#input_form");
	output_text(document.querySelector("#name_player").value, input_text.value);
	input_text.value = none;
}
