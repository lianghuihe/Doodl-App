var doodlData;
doodlData = document.getElementById('doodlData').value;

var doodlArray = [];
doodlArray = doodlData.split('||');

var table = document.createElement('table');
for (var i = 0; i < doodlArray.length; i++){
    var tr = document.createElement('tr');
    var tempArray = doodlArray[i].split('|', 2);

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    var doodlCanvas = document.createElement('canvas');
    var ctx = doodlCanvas.getContext('2d');
    var img = new Image;
    img.onload = function(){
        ctx.drawImage(img,0,0); // Or at whatever offset you like
    };
    img.src = tempArray[1]

    var text1 = document.createTextNode(tempArray[0]);
    var text2 = image;

    td1.appendChild(text1);
    td2.appendChild(text2);
    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);
}

document.body.appendChild(table);