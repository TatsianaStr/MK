'use strict';
import Game from "./game.js";
const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

let styles = {};
styles.width = '165px';  // задаем параметры
styles.height = '535px';
 
function Animation(spriteLight, Name, styles) {  
	const img = document.createElement('img');
	let q = 0;
	img.onload = function () {  //как только спрайт загружается
		var el = document.getElementById(spriteLight);
		el.style.width      = styles.width;
		el.style.height     = styles.height;
		var i = 0;
		let	interval = setInterval(function() {  //запускаем интервал
				if (q < img.width) { //для смены позиции изображения
					i=i+30; // если дошли до конца спрайта
				} else { 
					i = 0; // то возвращаемся к началу
				}
				q = 8.8*i; //сдвиг по слайду
				el.style.background = "url('" + Name + "') " + q + "px 50%";  
			} , 1000/5) //меняем позиционирование спрайта
		}
	img.src = Name; 
}
Animation('spriteLight', 'lightning.png', styles); 
Animation('spriteLight1', 'lightning.png', styles); 
//SPA
let SPAState = {};

function switchToStateFromURLHash() {
    let URLHash=window.location.hash;
    let stateStr=URLHash.substr(1);
    if ( stateStr!="" ) { // если закладка непустая, читаем из неё состояние и отображаем
        let parts=stateStr.split("_")
        SPAState={ pagename: parts[0] }; // первая часть закладки - номер страницы       
      }
      else
        SPAState={pagename:'Main'}; // иначе показываем главную страницу
  
      console.log('Новое состояние приложения:');
      console.log(SPAState);
     
    switch ( SPAState.pagename ) {
      case 'Main':
        document.getElementById('aUs').style.display = 'block';
        document.getElementById('sGame').style.display = 'block';
        document.getElementById('game_about').style.display = 'none';
        document.getElementById('selectPlayer').style.display = 'none';
        document.getElementById('wrapper_start').style.display = 'block';
        break;
      case 'Start':
        document.getElementById('wrapper_start').style.display = 'none';
        document.getElementById('selectPlayer').style.display = 'flex';
        document.getElementById('arenaGame').style.display = 'none';
        break;
      case 'About':        
       document.getElementById('aUs').style.display = 'none';
       document.getElementById('sGame').style.display = 'none';
       document.getElementById('game_about').style.display = 'block';
       document.getElementById('arenaGame').style.display = 'none';
        break;
        case 'Arena':        
        document.getElementById('wrapper_start').style.display = 'none';       
        document.getElementById('arenaGame').style.display = 'flex';
        document.getElementById('selectPlayer').style.display = 'none';
        
        const game = new Game();
        game.start();        
         break; 
    }  
  }
  
  function switchToState(newState) { 
    var stateStr=newState.pagename;
       location.hash=stateStr;  
  }

  export function switchToMainPage() {
    switchToState( { pagename:'Main' } );
  }

  function switchToStartPage() {
    switchToState( { pagename:'Start'} );
  }

  function switchToAboutPage() {
    switchToState( { pagename:'About' } );
  }
  function switchToArenaPage() {
    switchToState( { pagename:'Arena' } );
    
  }
  function observer () {
    window.addEventListener('hashchange', switchToStateFromURLHash);
    
}
        document.getElementById('sGame').addEventListener('click', () => {
            switchToStartPage('Start');
            
        });       

        document.getElementById('aUs').addEventListener('click', () => {
            switchToAboutPage('About');
        });

        observer();
        switchToStateFromURLHash();
                
          function s(){  window.addEventListener('beforeunload', (eo) => {
                if (location.hash === '#Arena') {
                    eo.returnValue = 'You will lose your score!!!';
                    if (eo.returnValue) {
                        window.location.reload();
                    }
                }
            });
    
            window.addEventListener('popstate', (eo) => {
               
                if (location.hash === '#Arena') {
                    let conf = confirm('You will lose your score!!!');
                    if (conf) {
                        location.hash = '#Main';
                       // window.location.reload();
                    } else {
                        location.hash = '#Arena';
                    }
                }
            });
        }
        
const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
}

async function init() {
    localStorage.removeItem('player1');
    const players = await fetch('https://json.extendsclass.com/bin/13108960b152').then(res => res.json());
    let imgSrc = null;
    

    players.forEach(item => {
        const el = createElement('div', ['characterSelect', `div${item.id}`]);
        const img = createElement('img');
        el.addEventListener('mousemove', () => {
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {            
            localStorage.setItem('player1', JSON.stringify(item));
             
             setTimeout(() => {                
                switchToArenaPage('Arena');
                
            }, 1000/100);
        });
             img.src = item.avatar;
               img.alt = item.name;

             el.appendChild(img);
             $parent.appendChild(el);         

      
    });
}

init();
