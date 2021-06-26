'use strict';
import Player from "./player.js";
import {createElement} from "./utils.js";
import dateTime from "./utilsTime.js";
import getRandom from "./utils.js";
import {logs, ATTACK, HIT} from "./constant.js";
import { switchToMainPage } from "./index.js";


class  Game{
    constructor(props){        
       this.$arenas = document.querySelector('.arenas');
       this.$formFight = document.querySelector('.control');
       this.$chat =  document.querySelector('.chat');       
       this.player1;
       this.player2;       
    }
       getPlayers = async() => {
           const body = fetch('https://json.extendsclass.com/bin/13108960b152').then(res => res.json())
           .catch((err) =>{
            console.log('Fetch Error:', err);
        });           
           return body;           
       }
       start = async() => {        
           const players = await this.getPlayers();
           console.log(players);           
           //const p1 = players[getRandom(players.length)-1];
           const p1 =JSON.parse(localStorage.getItem('player1'));
           const p2 = players[getRandom(players.length)-1];
          console.log(p1,p2);
           this.player1 = new Player({
             ...p1,
              player: 1,
             rootSelector: 'arenas',
           });
           this.player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas',
         });

         this.player1.createPlayer();
         this.player2.createPlayer();

         this.generateLogs('start', this.player1, this.player2); 
                     
         this.$formFight.addEventListener  ('submit', (e) => { 
         e.preventDefault();               
         const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = this.enemyAttack();
         const {hit, defence, value} = this.playerAttack();     
          if(defence != hitEnemy){
              this.player1.changeHP(valueEnemy);
              this.player1.renderCH();
             this.generateLogs('hit', this.player2, this.player1, valueEnemy);
          } else {
              this.generateLogs('defence', this.player2, this.player1);
          }           
          if (defenceEnemy != hit){
              this.player2.changeHP(value);
              this.player2.renderCH();        
              this.generateLogs('hit', this.player1, this.player2, value);
          } 
          else {
            this.generateLogs('defence', this.player1, this.player2);  
          }            
        this.showResult();   
    });  
         
}    
       generateLogs = (type, player1, player2, playerValue) => {
        let text;  
        let el;    
        switch (type){        
            case 'start':
                text = logs[type]
                .replace('[time]', dateTime())
                .replace('[player1]',this.player1.name)
                .replace('[player2]',this.player2.name);
                el = `<p>${text}</p>`;
                break;
            case 'hit': 
                text = logs[type][getRandom(logs[type].length-1) - 1]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
                el = `<p>${dateTime()} ${text}  -${playerValue}  ${player2.hp}/100</p>`;
                break;
            case 'end':
                text = logs[type][getRandom(logs[type].length-1) - 1]
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
                el = `<p>${text}</p>`;
                break;
            case 'defence':
                 text = logs[type][getRandom(logs[type].length) - 1]
                 .replace('[playerKick]', player1.name)
                 .replace('[playerDefence]',player2.name);   
                 el = `<p>${text}</p>`;
                break; 
             case 'draw':
                 text = logs[type]
                 el = `<p>${dateTime()} ${text}</p>`;
                 break;       
        }        
       
        this.$chat.insertAdjacentHTML('afterbegin', el);    
    }
    showResult = () => {
        if(this.player1.hp === 0 || this.player2.hp === 0){
            this.$formFight.disabled = true;        
            this.createReloadButton();
          }
         if(this.player1.hp === 0 && this.player1.hp < this.player2.hp ){        
            this.$arenas.appendChild(this.playerWins(this.player2.name));
            this.generateLogs('end', this.player2, this.player1); 
         }
         else if(this.player2.hp === 0 && this.player2.hp < this.player1.hp ){
           this.$arenas.appendChild(this.playerWins(this.player1.name));
           this.generateLogs('end', this.player1, this.player2); 
         }
         else if(this.player1.hp === 0 && this.player2.hp === 0){
           this.$arenas.appendChild(this.playerWins()); 
           this.generateLogs('draw');       
        }           
            
      }     
    playerWins = (name) => {    
        const $loseTitle = createElement('div', 'loseTitle');
        if(name){        
           $loseTitle.innerHTML = name + ' wins';  
        }
        else{         
            $loseTitle.innerHTML = 'Draw'; 
        }
        return $loseTitle;
    }
     createReloadButton = () => {    
    const $reloadButton = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button'); 
    $button.innerHTML = "Restart";
    $reloadButton.appendChild($button);
    this.$arenas.appendChild($reloadButton);
    $reloadButton.addEventListener ('click', function(){   
        switchToMainPage()});     
    };
    enemyAttack = () => {
        const hit = ATTACK[getRandom(3)-1];
        const defence = ATTACK[getRandom(3)-1];
        
        return {
            value: getRandom(HIT[hit]),
            hit,
            defence,
         }
     }
       playerAttack=()=>{
          const attack = {};
          for (let item of this.$formFight){ 
        
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
    }
 export default Game;