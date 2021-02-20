const body = document.querySelector("body");

function imgLoad(){
    const img = new Image();
    const imgNum = Math.floor(Math.random()*4);
    img.src = `images/${imgNum+1}.jpg`
    img.classList.add("bgImg");
    body.appendChild(img);
}

function init(){
    imgLoad();
}

init();