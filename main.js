'use strict';
const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    name: 'Scorpion',
    player: 1,
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',   
    weapon: ['knife', 'sword', 'sai'],
    attack,
    changeHP,
    elHP,
    renderCH,
};

const player2 = {
    name: 'Sub Zero',
    player: 2,
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knife', 'sword', 'sai'],
    attack, 
    changeHP,
    elHP,
    renderCH,
};
function createElement(tag, className){
    const $tag = document.createElement(tag);
     if (className){
         $tag.classList.add(className);
     }
    return $tag;
}

function createPlayer(object){
    const $player1 = createElement('div', 'player' + object.player); 
    const $progressbar = createElement('div','progressbar');  
    const $character =createElement('div','character');
     const $life = createElement('div','life');
     const $name = createElement('div','name');
     const $img = createElement('img');

    $life.style.width= object.hp +'%';
    $name.innerHTML=object.name;
    $player1.appendChild($progressbar);
    $player1.appendChild($character);
     $img.src = object.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);   
   
    $character.appendChild($img);   
    
     return $player1;
}
function attack (name){
    console.log(this.name +''+ '-Fight!');
}

function changeHP(randomNumber){           
    this.hp -= randomNumber;     
    if(this.hp <= 0 ){      
        this.hp = 0;    
      }          
     // console.log("player1.hp is " + player1.hp)
      //console.log("player2.hp is " + player2.hp)
   }

function elHP(){
return document.querySelector('.player' + this.player + ' .life');
   }

function renderCH(){
    this.elHP().style.width = this.hp + '%';  //рендерит поле жизни 
} 
 function playerWins(name){
    const $loseTitle = createElement('div', 'loseTitle');
    if(name){
       $loseTitle.innerHTML = name + ' wins';  
    }
    else{
        $loseTitle.innerHTML = 'Draw'; 
    }
    return $loseTitle;
}

function getRandom(num){
    const a =Math.ceil(Math.random() * num);
   return  a;
}

function createReloadButton(){
    const $reloadButton = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button'); 
    $button.innerHTML = "Restart";
    $reloadButton.appendChild($button);
    $arenas.appendChild($reloadButton);
    $button.addEventListener('click', function(){
     window.location.reload()
    });
}  
 
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack(){
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];
    
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
     }
 }

$formFight.addEventListener('submit', function(e){
e.preventDefault();
const attack = {};
const enemy = enemyAttack();


for (let item of $formFight){ 

    if (item.checked && item.name === 'hit'){
        attack.value = getRandom(HIT[item.value]);
        attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence'){
         attack.defence = item.value;
    }
    if(attack.hit === enemy.defence){
      enemy.value=0;
    } 
    if(attack.defence === enemy.hit){        
        attack.value = 0;        
    }    
      item.checked = false;            
}          
     if(player1.hp === 0 || player2.hp === 0){
        $formFight.disabled = true;
        createReloadButton();
      }
     if(player1.hp === 0 && player1.hp < player2.hp ){
         $arenas.appendChild(playerWins(player2.name));
     }
     else if(player2.hp === 0 && player2.hp < player1.hp ){
       $arenas.appendChild(playerWins(player1.name));
     }
     else if(player1.hp === 0 && player2.hp === 0){
       $arenas.appendChild(playerWins()); 

}
player1.changeHP(attack.value);
player1.renderCH();

player2.changeHP(enemy.value);
player2.renderCH();

//console.log('####:a2', attack);
//console.log('####:e2', enemy);
});

