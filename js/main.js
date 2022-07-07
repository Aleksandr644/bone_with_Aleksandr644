let boneEnemy = document.getElementById("bone_enemy");
let contextEnemy = boneEnemy.getContext("2d");
let bonePlayer = document.getElementById("bone_player");
let contextPlayer = bonePlayer.getContext("2d");


let boneOne = new Image();
boneOne.src = "img/one.png";

let boneTwo = new Image();
boneTwo.src = "img/two.png";

let boneThree = new Image();
boneThree.src = "img/three.png";

let boneFour = new Image();
boneFour.src = "img/four.png";

let boneFive = new Image();
boneFive.src = "img/five.png";

let boneSix = new Image();
boneSix.src = "img/six.png";

//let sizeArea = {width: 205, height: 330};
let boneArr = [boneOne, boneTwo, boneThree, boneFour, boneFive, boneSix];
/*let sizeSubArea = {width: 68, height: 66, posX: 0, posY: 0};
let subArea = [];
subArea[0] = Object.assign({}, sizeSubArea);

for(let i = 1; i < 8; i++){
	subArea.push(Object.assign({}, sizeSubArea));
	subArea[i].posX = sizeSubArea.width + subArea[i-1].posX;
	subArea[i].posY = subArea[i-1].posY;
	if(subArea[i].posX >= sizeArea.width){
		subArea[i].posX = 0;
		subArea[i].posY = sizeSubArea.height + subArea[i-1].posY;
	}
}
*/
/*boneTwo.onload = function(){
	for(i = 0; i < 5; i++){
		contextEnemy.drawImage(boneArr[randomInteger(0,5)], {0,0});
		contextPlayer.drawImage(boneArr[randomInteger(0,5)], subArea[i].posX, subArea[i].posY);
	}
}*/
console.log(randomFiveArea(boneEnemy.width, boneEnemy.height))
function randomInteger(min, max){
	return Math.floor(Math.random() * max + 1) + min;
}
function randomFiveArea(width, height){
	let fiveArea = [];
	while(fiveArea.length < 5){
		fiveArea.push([randomInteger(0, width), randomInteger(0,height)]);
		for(let i = 0; i < fiveArea.length -1; i++){
			if(fiveArea[i][0] < fiveArea[fiveArea.length-1][0] && fiveArea[i][0] + 60 > fiveArea[fiveArea.length-1][0]||fiveArea[i][1] < fiveArea[fiveArea.length-1][1] && fiveArea[i][1] + 60 > fiveArea[fiveArea.length-1][1]){
				fiveArea.pop();
				break;
			}
		}
	}
	return fiveArea;
}
