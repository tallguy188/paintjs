// js를 작업할때는 id로 css를 작업할떄는 class로 진행

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;


function stopPainting(){
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else {  // 이부분도 마우스가 움직이는 내내 발생하는 것이다. 단지 클릭했을때만 발생하는 것이 아니다.
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    /* 마우스를 움직이기만 하면 보이지 않는 path가 만들어지지만
    그것이 실제로 사용되는 것은 아니다. 마우스를 클릭하면 path만들기가 
    중단되고, 선이 만들어지는 원리이다.*/
    
}


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } 
    else { 
        filling = true;
        mode.innerText = "Paint";
    }
}

if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click",handleColorClick)
);

if(range) {
    range.addEventListener("input",handleRangeChange);
}

if(mode) {
    mode.addEventListener("click",handleModeClick);
}