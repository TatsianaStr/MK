export class Player{
    constructor(props){
        this.name = props.name;
        this.hp = props.hp;
        this.player = props.player;
        this.img = props.img;
        this.weapon = props.weapon;

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
        return document.querySelector('.player' + this.player + ' .life');
           }
        
     renderCH = () => {
            this.elHP().style.width = this.hp + '%';  //рендерит поле жизни 
        } 
}
export const player1 = new Player({
    name: 'Scorpion',
    player: 1,
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',   
    weapon: ['knife', 'sword', 'sai'],
     
});

export const player2 = new Player({
    name: 'Sub Zero',
    player: 2,
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knife', 'sword', 'sai'],
       
});


