
let timer = null;
let content = "";
let speed = 250;
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
    document.getElementById("stop").disabled = false;
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
    speed = document.getElementById("turbo").checked == true ?  50 : 250;
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
    tester();

}

function sum(x,y) {
    return x + y;
}
function substract(x,y) {
    return x - y;
}
function tester() {
    describe("sum function", function (){
        it("return the sum of two numbers", function () {
            assert.equal(sum(2,7),9);
        });
    });
    describe("substract function",function () {
        it("return the substract of two numbers",function () {
            assert.equal(substract(2,7),-5);
        });
    });
    mocha.run();
}