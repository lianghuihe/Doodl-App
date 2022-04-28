window.onload=(function(){
    var doodlData;
    var doodlArray = [];

    doodlData = document.getElementById('doodlData').value;
    doodlArray = doodlData.split('||');

    var table = document.createElement('table');
    table.style.width = "100%";

    var tableHeadingRow = document.createElement('tr');
    var tableHeadingName = document.createElement('th');
    var tableHeadingDoodl = document.createElement('th');
    tableHeadingName.style.width = "20%";

    var heading1 = document.createTextNode("Artist");
    var heading2 = document.createTextNode("Doodl");

    tableHeadingName.appendChild(heading1);
    tableHeadingDoodl.appendChild(heading2);
    tableHeadingRow.appendChild(tableHeadingName);
    tableHeadingRow.appendChild(tableHeadingDoodl);
    table.appendChild(tableHeadingRow);

    for (var i = 1; i < doodlArray.length; i++){
        var tr = document.createElement('tr');
        var tempArray = doodlArray[i].split('|', 2);

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        let url = tempArray[1];
        let doodlCanvas = document.createElement('canvas');
        doodlCanvas.style.border = "5px solid #000000";
        doodlCanvas.style.position = "relative";
        doodlCanvas.width = 300;
        doodlCanvas.height = 200;

        let ctx = doodlCanvas.getContext('2d');
        let img = new Image;
        img.onload = function(){
            ctx.drawImage(img, 0, 0, 300, 200);
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