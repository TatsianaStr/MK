'use strict';
const player1 = {
    name: 'Scorpion',
    hp: 80,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',   
    weapon: ['knife', 'sword', 'sai'],
    attack: function(name){
        console.log(this.name +''+ '-Fight!');
    }
};

const player2 = {
    name: 'Sub Zero',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knife', 'sword', 'sai'],
    attack: function(name){
        console.log(this.name +''+ '-Fight!');
    }
};
function createPlayer(hero,object){
    const $player1 = document.createElement('div');    
    $player1.classList.add(hero);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    const $character = document.createElement('div');
    $character.classList.add('character');
    $player1.appendChild($progressbar);
    $player1.appendChild($character);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width= object.hp +'%';
    $progressbar.appendChild($life);

    const $name = document.createElement('div');
    $name.classList.add('name');
    $progressbar.appendChild($name);
    $name.innerHTML=object.name;
    const $img = document.createElement('img');
    $img.src = object.img;
    $character.appendChild($img);

    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player1);

}
createPlayer('player1', player1);
createPlayer( 'player2', player2);