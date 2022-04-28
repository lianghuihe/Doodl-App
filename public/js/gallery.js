var table = document.createElement('table');
var doodlData;
var canvases=[];
var contexts=[];
doodlData = document.getElementById('doodlData').value;

var doodlArray = [];
doodlArray = doodlData.split('||');

for (var i = 1; i < (doodlArray.length / 2); i++){
    var canvas = document.createElement("canvas");
    canvas.style.border = "5px solid #000000";
    canvas.style.position = "relative"; 

    var context = canvas.getContext("2d");

    canvases[i] = canvas;
    contexts[i] = context;
}

for (var i = 1; i < doodlArray.length; i++){
    var tr = document.createElement('tr');
    var tempArray = doodlArray[i].split('|', 2);

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    var image = new Image;
    image.src = tempArray[1];
    image.onload = function(){
        contexts[i].drawImage(image,0,0);
    };
 
    td1.appendChild(document.createTextNode(tempArray[0]));
    td2.appendChild(canvases[i]);
    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);
}

document.body.appendChild(table);