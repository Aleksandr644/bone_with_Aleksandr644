let elemEnemy = document.getElementById("bone_enemy");
let contextEnemy = elemEnemy.getContext("2d");
let elemPlayer = document.getElementById("bone_player");
let contextPlayer = elemPlayer.getContext("2d");
/*bone_enemy.onclick = function(){
		alert("click");
}*/

function randomInteger(min, max){
	return Math.floor(Math.random() * max + 1) + min;
}

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

class Bone{
    constructor(posX, posY, width = 60, height = 60){
	    this.value = randomInteger(0,5);
		this.width = width;
		this.height = height;
		this.up = posY;
		this.bottom = this.up + this.height;
		this.left = posX;
		this.right = this.left + this.width;
		
    }
    objectTouch(obj){
		
		if(this.up <= obj.up && this.bottom >= obj.up || this.up <= obj.bottom && this.bottom >= obj.bottom){
		    if(this.left <= obj.left && this.right >= obj.left || this.left <= obj.right && this.right >= obj.right){
				return true;
			}
		}		
		return false;		
    }
}

function randomFiveBone(width, height){
	let fiveBone = [];
	while(fiveBone.length < 5){
		let bone = new Bone(randomInteger(0, width), randomInteger(0, height));
		fiveBone.push(Object.assign({}, bone));
		for(let i=0;i < fiveBone.length -1; i++){
			if(bone.objectTouch(fiveBone[i])){
				fiveBone.pop();
				break;
			}
		}
	}
	return fiveBone;
}

let boneArr = [boneOne, boneTwo, boneThree, boneFour, boneFive, boneSix];

onload = function(){
	let boneEnemy = randomFiveBone(elemEnemy.width - 60, elemEnemy.height - 60);
	let bonePlayer = randomFiveBone(elemPlayer.width - 60, elemPlayer.height - 60);
	for(i = 0; i < 5; i++){
		contextEnemy.drawImage(boneArr[boneEnemy[i].value], boneEnemy[i].left, boneEnemy[i].up);
		contextPlayer.drawImage(boneArr[bonePlayer[i].value], bonePlayer[i].left, bonePlayer[i].up);
	}
}
