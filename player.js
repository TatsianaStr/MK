 'use strict';
 import {createElement} from "./utils.js";
 

 class Player {
    constructor(props){
        this.name = props.name;
        this.hp = props.hp;
        this.player = props.player;
        this.img = props.img;
        this.selector = `player${this.player}`;
        this.weapon = props.weapon;
        this.rootSelector = props.rootSelector;

    }
     attack = () => {
        console.log(this.name +''+ '-Fight!');
    }

     changeHP = (randomNumber) => {           
        this.hp -= randomNumber;     
        if(this.hp <= 0 ){      
            this.hp = 0;    
          }          
        return this.hp;//?
       }

     elHP = () => {
        return document.querySelector(`.${this.selector} .life`);// изменили
           }
        
     renderCH = () => {
            this.elHP().style.width = this.hp + '%';  //рендерит поле жизни 
        } 
     createPlayer = () => {
            const $player = createElement('div', this.selector); 
             const $progressbar = createElement('div','progressbar');  
             const $character = createElement('div','character');
             const $life = createElement('div','life');
             const $name = createElement('div','name');
             const $img = createElement('img');
        
            $life.style.width = this.hp +'%';
            $name.innerHTML= this.name;
            
             $img.src = this.img;
           
            $progressbar.appendChild($life);
            $progressbar.appendChild($name);   
           
            $character.appendChild($img); 
             $player.appendChild($progressbar);
            $player.appendChild($character);  
             
            const $root = document.querySelector(`.${this.rootSelector}`);
            $root.appendChild($player);
             return $player;
        }
}
export default Player;
 



