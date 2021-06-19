const getRandom = (num) => { return Math.ceil(Math.random() * num)};

export default getRandom;

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
     if (className){
         $tag.classList.add(className);
     }
    return $tag;
}