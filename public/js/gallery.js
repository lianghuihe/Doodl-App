window.onload=(function(){
    var doodlData;
    var doodlArray = [];

    doodlData = document.getElementById('doodlData').value;
    doodlArray = doodlData.split('||');

    var table = document.createElement('table');

    for (var i = 1; i < doodlArray.length; i++){
        var tr = document.createElement('tr');
        var tempArray = doodlArray[i].split('|', 2);

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        let url = tempArray[1];
        let doodlCanvas = document.createElement('canvas');
        let ctx = doodlCanvas.getContext('2d');
        let img = new Image;
        img.onload = function(){
            ctx.drawImage(img,0,0);
        };
        img.src = url;

        var text1 = document.createTextNode(tempArray[0]);
        var text2 = doodlCanvas;

        td1.appendChild(text1);
        td2.appendChild(text2);
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    }

    document.body.appendChild(table);
});