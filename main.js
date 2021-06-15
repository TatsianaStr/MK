'use strict';
import { player1, player2} from "./player.js";
import { $arenas, $formFight, createPlayer } from "./userInterface.js";
import { showResult,enemyAttack, playerAttack } from "./game.js";
import { generateLogs } from "./generationLogs.js";



$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


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

