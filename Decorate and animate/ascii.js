
let timer = null;
let content = "";
let speed = 2500;
let i;
let args;


function onStart () {

    if (timer != null ) clearInterval(timer);
    content = document.getElementById("text-area").value;
    document.getElementById("stop").disabled = false;
    document.getElementById("start").disabled = true;
    let scenerio = document.getElementById("animation");
    scenerio.disabled = true;
    args = ANIMATIONS[scenerio.value].split("=====");
    let argsLength = args.length; i = 0;
    let start = Date.now(); 

    timer = setInterval(function() {
        let timePassed = Date.now() - start;
        if (i === argsLength ) i = 0;
        draw(timePassed, args[i]); i++;
      }, speed );
}

function draw(time, draft) {
    document.getElementById("text-area").value = draft;
}
function onChoose () {
    
    if (timer != null ) clearInterval(timer);
    content = document.getElementById("text-area").value;
    let args = ANIMATIONS[this.value];
    document.getElementById("text-area").value = args;

}
function onStop () {
    clearInterval(timer);
    document.getElementById("text-area").value = content;
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    document.getElementById("animation").disabled = false;
}
function onCheck () {
    clearInterval(timer);
    speed = document.getElementById("turbo").checked == true ?  50 : 2500;
    let start = Date.now(); 
    timer = setInterval(function() {
        let timePassed = Date.now() - start;
        let argsLength = args.length;
        if (i === argsLength ) i = 0;
        draw(timePassed, args[i]); i++;
      }, speed );
}

function onFontSizeSelected () {
    document.getElementById("text-area").style.fontSize = this.value + 'pt';
}
window.onload = function() {
    let startButt = document.getElementById("start");
    startButt.onclick = onStart;
    document.getElementById("stop").onclick = onStop;
    document.getElementById("animation").onchange = onChoose;
    document.getElementById("turbo").onchange = onCheck;
    document.getElementById("fontsize").onchange = onFontSizeSelected;

}
