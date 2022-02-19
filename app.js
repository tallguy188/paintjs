// js를 작업할때는 id로 css를 작업할떄는 class로 진행

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
/* cavvas는 위 코드부터 아래 코드로 실행되어서 처음 fillStyle이 white였다가
나중에 밑의 코드에서는 black이 된다.*/
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
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
    ctx.fillStyle = color;
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

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
    // fillRect메소드는 canvas의 사각형을 가장 최근의 fillStyle로 채워줌.
}

function handleRightClick(event) {
    event.preventDefault();

}

function handleSaveImage () {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaingJS";
    // a 태그의 attribute인 download는 링크를 복사하도록 해준다. 
    link.click();   // 클릭을 거짓으로 만드는부분(?)

}


if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleRightClick);
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

if(save) {
    save.addEventListener("click",handleSaveImage);
}