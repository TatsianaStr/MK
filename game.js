import { player1, player2} from "./player.js";
import { $arenas, $formFight, createElement } from "./userInterface.js";
import { createReloadButton } from "./userInterface.js"; 
import { generateLogs } from "./generationLogs.js";
import getRandom from "./utils.js";

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

export function enemyAttack(){
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];
    
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
     }
 }
 
export function playerAttack(){
    const attack = {};
    for (let item of $formFight){ 
    
        if (item.checked && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence'){
             attack.defence = item.value;
        }
         
          item.checked = false;            
    } 
    return attack; 
}

export let playerWins = (name) => {    
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

export let showResult = () => {
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
