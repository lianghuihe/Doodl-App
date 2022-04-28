window.onload=(function(){
    var doodlData;
    var doodlArray = [];

    doodlData = document.getElementById('doodlData').value;
    doodlArray = doodlData.split('||');

    var table = document.createElement('table');
    table.style.width = "70%";
    table.style.alignSelf = "center";

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

    var border = document.createElement('tr');
    var bordercontents = document.createElement('td');

    bordercontents.style.borderTop = "2px solid black";
    bordercontents.colSpan = 2;

    border.appendChild(bordercontents);
    table.appendChild(border);

    for (var i = 1; i < doodlArray.length; i++){
        var tr = document.createElement('tr');
        var tempArray = doodlArray[i].split('|', 2);

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        td1.style.alignContent = "center";
        td2.style.alignContent = "center";

        let url = tempArray[1];
        let doodlCanvas = document.createElement('canvas');
        doodlCanvas.style.border = "5px solid #000000";
        doodlCanvas.style.position = "relative";
        doodlCanvas.width = 450;
        doodlCanvas.height = 300;

        let ctx = doodlCanvas.getContext('2d');
        let img = new Image;
        img.onload = function(){
            ctx.drawImage(img, 0, 0, doodlCanvas.width, doodlCanvas.height);
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