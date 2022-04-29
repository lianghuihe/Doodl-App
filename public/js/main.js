const canvas = document.getElementById('myDoodlCanvas');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');
const tempPoint = new point(0,0);

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

const settingsSlider = document.getElementById("sizeSlider");


//import { v4 as uuidv4 } from 'uuid';

canvas.width = 0.7*window.innerWidth - canvasOffsetX;
canvas.height = 0.9*window.innerHeight - canvasOffsetY;

let col = "#000000";
let isFill = false;
let isPainting = false;
let isRectangle = false, isCircle = false, isLine = false;
let lineWidth = 5;
let startX;
let startY;
let lastX;
let lastY;
let snapshot;
var timeout_id;
let dailyWord;
var rect = canvas.getBoundingClientRect();
let sliderValue = (sizeSlider.value);
//let randomWord = ["race car","pirate ship","palm trees","tulips","pine cone","space ship","box of candy","sunflowers in a vase","koala bear","angry dog","candy corn","cupcake","sleepy tiger","pizza","disco ninja","girl with really long hair","cookies","sad lady","snake charmer","hula girl","ice cream cone","bottle of poison","flamingo","football","fried egg","red haired man","zombie","mummy","popcorn","vampire","man with a scar","a sword fighter","duck","easter eggs","flaming skull","dolphin","sunflowers in a vase","panda","cobra","happy pig","oreos and milk","monkey in a hat","bunny","gnome","fairy","evil queen","diamond ring","birthday present","hot air balloon","cake with candles","Godzilla","guy with long nails","rooster","dragon","shamrocks","castle","log cabin","igloo","octopus","bodybuilder","carousel horse","shooting star","toucan","flute","saxophone","violin","bird house","seal","Dachshund","football helmet","hockey stick","planets","Happy Clown","Scary Clown","train","dog in pants","mermaid","waffles","lady in an apron","bacon","cup of coffee","baseball player","ballerina","worm in an apple","kleenex","hamburger","girl with a cast","crying baby","angel","mean Santa","paintbrushes","police officer","red wagon","garbage can","dwarf","Zebra in colors","Gumball machine","Bush Baby","fowl","kangaroo","alligator","badger","stork","elephant","albatross","goose","drongo","boa","swan","opossum","wagtail","bear","wagtail","lion","phascogale","blackbuck","caribou","zebra","stilt","chickadee","caribou","caribou","boa","blesbok","fowl","butterfly","lizard","albatross","argalis","heron","chickadee","stilt","tapir","wagtail","spider","blackbuck","bettong","bettong","blackbuck","buffalo","swan","tapir","lion","boar","dolphin","pig","parrot","blesbok","antelope","buffalo","lynx","phascogale","caribou","otter","raven","porcupine","vulture","donkey","dog","starling","barbet","racer","swan","badger","elephant","cordon","bettong","opossum","shark","donkey","crocodile","guinea","eagle","raven","vulture","buffalo","bat","oryx","lizard","bettong","otter","oyster","cordon","deer","stork","crocodile","elephant","crake","cordon","albatross","porcupine","badger","skink","ant","otter","chickadee","kangaroo","dolphin" ];

var tools = document.getElementsByClassName("toolbarIcon");
for (var i = 0; i < tools.length; i++)
{
    tools[i].style.width  = (50 * (1 + (sliderValue / 100))) + "px";
    tools[i].style.height = (50 * (1 + (sliderValue / 100))) + "px";
}

var toolText = document.getElementsByClassName("toolbarText");
for (var i = 0; i < toolText.length; i++)
{
    toolText[i].style.fontSize  = (12 * (1 + (sliderValue / 100))) + "px";
}

resetCanvas();
//dailyWordSetup(randomWord);

function resetCanvas(){
    ctx.fillStyle = "#FFFFFF"; //pure white
    ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
}
/*
function dailyWordSetup(wordList){
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Todays Topic:", canvas.width/2, canvas.height/16);
    dailyWord = wordList[Math.floor(Math.random()*wordList.length)];
    ctx.fillText(dailyWord, canvas.width/2, canvas.height/16 + 40);
}
*/
toolbar.addEventListener('click', e => {
    btn = document.getElementById(e.target.id);
    if (e.target.id === 'clear') {
        resetCanvas();
        dailyWordSetup([dailyWord]);
    }
    if (e.target.id === 'fill') {
        if (isFill == false) {
            if(!blocked()){
                isFill = true;
                btn.style.backgroundColor = "grey";
            }
        } else {
            isFill = false;
            btn.style.backgroundColor = "#1565c0";
        }
    }
    if (e.target.id === 'rectangle') {
             if (isRectangle == false) {
                 if(!blocked()){
                     isRectangle = true;
                     btn.style.backgroundColor = "grey";
                 }
             } else {
                 isRectangle = false;
                 btn.style.backgroundColor = "#1565c0";
             }
         }
    if (e.target.id === 'circle') {
            if (isCircle == false) {
                if(!blocked()){
                    isCircle = true;
                    btn.style.backgroundColor = "grey";
                }
            } else {
                isCircle = false;
                btn.style.backgroundColor = "#1565c0";
            }
        }
    if (e.target.id === 'line'){
        if (isLine == false) {
            if(!blocked()){
                isLine = true;
                btn.style.backgroundColor = "grey";
            }
        } else {
            isLine = false;
            btn.style.backgroundColor = "#1565c0";
        }
        
    }
    if (e.target.id === 'submit'){
        document.getElementById('hiddenCanvasValue').value = canvas.toDataURL('image/png');
    }
});
/*
document.querySelector('#submit').addEventListener('click', ()=> {
    var canvas = document.querySelector("#myDoodl");
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    
    var element = document.createElement('a');
    var filename = 'myDoodl.png';
    element.setAttribute('href', image);
    element.setAttribute('download', filename);
  
    element.click();
  })
  */

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        col = e.target.value;
        ctx.strokeStyle = col;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo((e.clientX-rect.left)/(rect.right - rect.left) * canvas.width, (e.clientY - rect.top)/(rect.bottom - rect.top) * canvas.height);
    ctx.stroke();
}

function point(x, y) {
    this.x = x;
    this.y = y;
}

//---current flood fill function---
function floodFill(x, y, colour, orgColour, pixels, pixelStack) {
    //orgColour = typeof(orgColour)==='undefined' ? null : orgColour ;
    //pixels = typeof(pixels)==='undefined' ? null : pixels ;
    //pixelStack = typeof(pixelStack)==='undefined' ? null : pixelStack ;

    newPixel = new point(0, 0);
    clearTimeout(timeout_id);

    if( pixels == null ) {
        pixels = ctx.getImageData(0, 0, canvas.width, canvas.height) ;
    }

    var linear_cords = ( y * canvas.width + x ) * 4 ;

    if( orgColour == null ) {
        orgColour = {r:pixels.data[linear_cords], g:pixels.data[linear_cords+1], b:pixels.data[linear_cords+2]} ;
    }

    if( pixelStack == null ) {
        pixelStack = [new point (x, y)] ;
    }

    var iterations = 0 ;

    while(pixelStack.length > 0) {
        newPixel = pixelStack.shift() ;
        x = newPixel.x ;
        y = newPixel.y ;

        // coloring the pixels we are on
        linear_cords = ( y * canvas.width + x ) * 4 ;
        pixels.data[linear_cords]   = colour.r ;
        pixels.data[linear_cords+1] = colour.g ;
        pixels.data[linear_cords+2] = colour.b ;

        if(x-1 >= 0 && (pixels.data[linear_cords-4]==orgColour.r && pixels.data[linear_cords-4+1]==orgColour.g && pixels.data[linear_cords-4+2]==orgColour.b) && !is_in_pixel_stack(x-1, y, pixelStack) ) {
            pixelStack.push(new point(x-1, y));
        }
        if( x+1<canvas.width && (pixels.data[linear_cords+4]==orgColour.r && pixels.data[linear_cords+4+1]==orgColour.g && pixels.data[linear_cords+4+2]==orgColour.b) && !is_in_pixel_stack(x+1, y, pixelStack) ) {
            pixelStack.push(new point(x+1, y));
        }
        if( y-1>=0 && (pixels.data[linear_cords-4*canvas.width]==orgColour.r && pixels.data[linear_cords-4*canvas.width+1]==orgColour.g && pixels.data[linear_cords-4*canvas.width+2]==orgColour.b) && !is_in_pixel_stack(x, y-1, pixelStack) ) {
            pixelStack.push(new point(x, y-1));
        }
        if( y+1<canvas.height && (pixels.data[linear_cords+4*canvas.width]==orgColour.r && pixels.data[linear_cords+4*canvas.width+1]==orgColour.g && pixels.data[linear_cords+4*canvas.width+2]==orgColour.b) && !is_in_pixel_stack(x, y+1, pixelStack) ) {
            pixelStack.push(new point(x, y+1));
        }

        iterations++;

        if(iterations >= 1000){
            break;
        }
    }

    ctx.putImageData(pixels, 0, 0 );

    if(pixelStack.length > 0) {
        newPixel = pixelStack.shift() ;
        timeout_id = setTimeout( function() { floodFill(newPixel.x, newPixel.y, colour, orgColour, pixels, pixelStack); }, 50 ) ;
    }
}

function is_in_pixel_stack(x, y, pixelStack) {
    for(var i=0 ; i < pixelStack.length ; i++) {
        if( pixelStack[i].x == x && pixelStack[i].y == y ) {
            return true ;
        }
    }
    return false ;
}

function hexColourToRGB(colour) {
        colour = colour.replace( "#", "" ) ;
        var bigint = parseInt(colour, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return {r:r, g:g, b:b} ;
}

function blocked(){
    return (isFill | isPainting | isRectangle | isCircle | isLine);
}

canvas.addEventListener('click', (e) => {  
    startX = e.clientX;
    startY = e.clientY;
    if (isFill == true){
        let x = e.clientX - canvasOffsetX;
        let y = e.clientY - canvasOffsetY;
        floodFill(x, y, hexColourToRGB(col), null, null, null);
    }
    
    /*
    if(isLine == true){
        function restoreSnapshot() {
            ctx.putImageData(snapshot, 0, 0);
        }
        function takeSnapshot() {
            snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
        canvas.onmousedown = function(e){
            startX = e.pageX - this.offsetLeft;
            startY = e.pageY - this.offsetTop;
            isPainting = true;
            takeSnapshot();
        }
        canvas.onmouseup = function(e){
            isPainting = false;
            restoreSnapshot();
            ctx.beginPath();
            ctx.moveTo(startX,startY);
            ctx.lineTo(lastX,lastY);
            ctx.stroke();
        }
        canvas.onclick = function(e){
            startX = e.pageX - this.offsetLeft;
            startY = e.pageY - this.offsetTop;
            isPainting = true;
        }
        canvas.onmousemove = function(e){
            if(isPainting){
                restoreSnapshot();
                lastX = e.pageX - this.offsetLeft;
                lastY = e.pageY - this.offsetTop;
                ctx.beginPath();
                ctx.moveTo(startX,startY);
                ctx.lineTo(lastX,lastY);
                ctx.stroke();
            }
        }
    }
    */
});

function sendStringToVariable()
{
    var imageString = canvas.toDataURL();
    document.getElementById('doodlString').value = imageString;
}

settingsSlider.oninput = function()
{
    sliderValue = this.value;
    let toolSizeMult = 1 + (sliderValue / 100);

    var tools = document.getElementsByClassName("toolbarIcon");
    var toolText = document.getElementsByClassName("toolbarText");

    for (var i = 0; i < tools.length; i++)
    {
        tools[i].style.width  = (50 * toolSizeMult) + "px";
        tools[i].style.height = (50 * toolSizeMult) + "px";
    }
    
    for (var i = 0; i < toolText.length; i++)
    {
        toolText[i].style.fontSize  = (12 * toolSizeMult) + "px";
    }
}

function selectBackground()
{
    let settingsSelect = document.getElementById('selecterBackground');
    let bkgCol = "f67570";
    switch(settingsSelect.selectedIndex)
    {
        case 0:
            bkgCol = "#f67570";
            break;
        case 1:
            bkgCol = "#292323";
            break;
        case 2:
            bkgCol = "#ededed";
            break;
        case 3:
            bkgCol = "#1565c0";
            break;
    }
    document.body.style.backgroundColor = bkgCol;
}

canvas.addEventListener('mousedown', (e) => {
    if (!blocked()) {
        isPainting = true;
        draw(e);
    }
    startX = e.clientX;
    startY = e.clientY;
    if (isLine){
        tempPoint.x = e.clientX - canvasOffsetX;
        tempPoint.y = e.clientY - canvasOffsetY;
    }
    if(isRectangle){
        tempPoint.x = e.clientX - canvasOffsetX;
        tempPoint.y = e.clientY - canvasOffsetY;
    }
    if(isCircle){
        tempPoint.x = e.clientX - canvasOffsetX;
        tempPoint.y = e.clientY - canvasOffsetY;
    }
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    if (isLine){
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = col;
        ctx.moveTo(tempPoint.x, tempPoint.y);
        ctx.lineTo((e.clientX-rect.left)/(rect.right - rect.left) * canvas.width, (e.clientY - rect.top)/(rect.bottom - rect.top) * canvas.height);
        ctx.stroke();
        ctx.beginPath();
    }
    if(isRectangle){
        let width  = ((e.clientX - canvasOffsetX) - tempPoint.x);
        let height = ((e.clientY - canvasOffsetY) - tempPoint.y);
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = col;
        ctx.rect(tempPoint.x, tempPoint.y, width, height);
        ctx.stroke();
        ctx.beginPath();
    }
    if(isCircle){
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = col;
        ctx.arc(tempPoint.x, tempPoint.y, (((Math.abs((e.clientX - canvasOffsetX) - tempPoint.x) ^ 2) + (Math.abs((e.clientY - canvasOffsetY) - tempPoint.Y) ^ 2)) ^ (0.5)), 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.beginPath();
    }
});

canvas.addEventListener('touchstart', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('touchend', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

canvas.addEventListener('mousemove', (e) => {
    let x = e.clientX - canvasOffsetX;
    let y = e.clientY - canvasOffsetY;
    let temp = ctx.getImageData(x,y,1,1);
    let pixels = temp.data;
    let r = pixels[0];
    let g = pixels[1];
    let b = pixels[2];
    document.getElementById('RGBVal').textContent = r + " " + g + " " + b;
});

canvas.addEventListener('touchmove', (e) => {
    let x = e.clientX - canvasOffsetX;
    let y = e.clientY - canvasOffsetY;
    let temp = ctx.getImageData(x,y,1,1);
    let pixels = temp.data;
    let r = pixels[0];
    let g = pixels[1];
    let b = pixels[2];
    document.getElementById('RGBVal').textContent = r + " " + g + " " + b;
});