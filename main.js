'use strict';
const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat =  document.querySelector('.chat');

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
    return this.hp;//?
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
        generateLogs('end', player1, player2); 
       $loseTitle.innerHTML = name + ' wins';  
    }
    else{
        generateLogs('draw', player1, player2); 
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
function playerAttack(){
    const attack = {};
    for (let item of $formFight){ 
    
        if (item.checked && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence'){
             attack.defence = item.value;
        }
        //if(attack.hit === enemy.defence){
        //  enemy.value=0;
       // } 
       // if(attack.defence === enemy.hit){        
       //     attack.value = 0;        
       // }    
          item.checked = false;            
    } 
    return attack; 
}
function showResult(){
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
    
}

function generateLogs(type, player1, player2, playerValue, playerHp){
    let text;
    let dateTime = new Date();
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let seconds = dateTime.getSeconds();
    if (hours<= 9) {
        hours = "0" + minutes;
        }
     if (minutes <= 9) {
       minutes = "0" + minutes;
       }
     if (seconds <= 9) {
       seconds = "0" + seconds;
      }
 let time = hours + ":" + minutes + ":" + seconds;     
    let el;    
    switch (type){        
        case 'start':
            text = logs[type]
            .replace('[time]', time)
            .replace('[player1]',player1.name)
            .replace('[player2]',player2.name);
            el = `<p>${text}</p>`;
            break;
        case 'hit': 
            text = logs[type][getRandom(logs[type].length) - 1]
            .replace('[playerKick]', player1.name)
            .replace('[playerDefence]', player2.name);
            el = `<p>${time} ${text}  -${playerValue}  ${playerHp}/100</p>`;
            break;
        case 'end':
            text = logs[type][getRandom(logs[type].length) - 1]
            .replace('[playerWins]', player1.name)
            .replace('[playerLose]', player2.name);
            el = `<p>${text}</p>`;
            break;
        case 'defence':
             text = logs[type][getRandom(logs[type].length) - 1]
             .replace('[playerKick]', player2.name)
             .replace('[playerDefence]',player1.name);   
             el = `<p>${time} ${text}</p>`;
            break; 
         case 'draw':
             el = `<p>$logs[type]</p>`;
             break;       
    }        
   
    $chat.insertAdjacentHTML('afterbegin', el);

}
window.addEventListener('load', function(e){
 e.preventDefault();
   generateLogs('start', player1, player2); 
});

$formFight.addEventListener('submit', function(e){ 
    e.preventDefault();   
const enemy = enemyAttack();
const player = playerAttack();
      if(player.defence != enemy.hit){
          player1.changeHP(enemy.value);
          player1.renderCH();
          generateLogs('hit', player2, player1, enemy.value, player1.hp);
      } else {
          generateLogs('defence', player2, player1);
      }
    

      if (enemy.defence != player.hit){
          player2.changeHP(player.value);
          player2.renderCH();        
          generateLogs('hit', player1, player2, player.value, player2.hp);
      } 
      else {
        generateLogs('defence', player1, player2);  
      }
    
  showResult(); 
  
});

