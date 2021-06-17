import dateTime from "./utilsTime.js";
import getRandom from "./utils.js";
import { player1, player2} from "./player.js";
const $chat =  document.querySelector('.chat');
export function generateLogs(type, player1, player2, playerValue){
    let text;  
    let el;    
    switch (type){        
        case 'start':
            text = logs[type]
            .replace('[time]', dateTime())
            .replace('[player1]',namePlayer1)
            .replace('[player2]',namePlayer2);
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
             el = `<p> ${dateTime()} ${text}</p>`;
             break;       
    }        
   
    $chat.insertAdjacentHTML('afterbegin', el);

}
const{name: namePlayer1, player, hp, weapon} = player1;
const{name: namePlayer2, player: numPlayer2, hp: hpPlayer2, weapon: weaponPlayer2} = player2;