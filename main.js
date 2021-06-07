'use strict';
const $arenas = document.querySelector('.arenas');
const $randonButton = document.querySelector('.button');

const player1 = {
    name: 'Scorpion',
    player: 1,
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',   
    weapon: ['knife', 'sword', 'sai'],
    attack: function(name){
        console.log(this.name +''+ '-Fight!');
    }
};

const player2 = {
    name: 'Sub Zero',
    player: 2,
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knife', 'sword', 'sai'],
    attack: function(name){
        console.log(this.name +''+ '-Fight!');
    }
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

    //$player1.classList.add(hero);
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
//function changeHP(player){
    //const $playerLife = document.querySelector('.player' + player.player + ' .life');
    //player.hp -= Math.ceil(Math.random() * 20 + 1);
    // $playerLife.style.width = player.hp + '%';
    
    //if(player.hp <= 0){
    //    $arenas.appendChild(playerLose(player.name)); 
     //   player.hp = 0; 
    //}   
    //   console.log(player.hp);
      // $randonButton.disabled = true;
   //}
   function changeHP(player){
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.ceil(Math.random() * 20 + 1);
     $playerLife.style.width = player.hp + '%';
    
    if(player1.hp <= 0 && player2.hp>0){
        $arenas.appendChild(playerWin(player2.name)); 
        player1.hp = 0;
         $randonButton.disabled = true;
        
    }  
    else if(player2.hp<=0 && player1.hp>0){
        $arenas.appendChild(playerWin(player1.name)); 
        player2.hp = 0;
         $randonButton.disabled = true;
         
    } 
    else if(player2.hp<=0 && player1.hp<=0){
        $arenas.appendChild(playerDraw(player1.name, player2.name)); 
       player1.hp=0;
       player2.hp=0;        
        $randonButton.disabled = true;
        
    }
    console.log(player.hp);
       
   }
    function playerWin(name){
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerHTML = name + ' wins';
    return $winTitle;
}
function playerDraw(name1, name2){
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerHTML = name1 + '\n '+ name2  + ' wins';
    return $winTitle;
}
 

$randonButton.addEventListener('click', function(){
    console.log('####: Click Random Button'); 
    changeHP(player1);
    changeHP(player2);   
});
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
