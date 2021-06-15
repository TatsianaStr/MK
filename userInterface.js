export const $arenas = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');

export let createElement = (tag, className) => {
    const $tag = document.createElement(tag);
     if (className){
         $tag.classList.add(className);
     }
    return $tag;
}
export let createPlayer = (object) => {
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
export function createReloadButton(){
    const $reloadButton = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button'); 
    $button.innerHTML = "Restart";
    $reloadButton.appendChild($button);
    $arenas.appendChild($reloadButton);
    $button.addEventListener('click', function(){
     window.location.reload()
    });
}  