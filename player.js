export const player1 = {
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

export const player2 = {
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

