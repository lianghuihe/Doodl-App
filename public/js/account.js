window.onload=(function(){
    var doodlData;
    var doodlArray = [];

    doodlData = document.getElementById('doodlData').value;
    doodlArray = doodlData.split('||');

    var table = document.createElement('table');
    table.style.width = "70%";
    table.style.alignSelf = "center";
    table.setAttribute('id', 'accountTable');

    var tableHeadingRow = document.createElement('tr');
    var tableHeadingDate = document.createElement('th');
    var tableHeadingPrompt = document.createElement('th');
    var tableHeadingDoodl = document.createElement('th');
    tableHeadingPrompt.style.width = "20%";
    tableHeadingDate.style.width = "20%";

    var heading1 = document.createTextNode("Date");
    var heading2 = document.createTextNode("Prompt");
    var heading3 = document.createTextNode("Doodl");

    tableHeadingDate.appendChild(heading1);
    tableHeadingPrompt.appendChild(heading2);
    tableHeadingDoodl.appendChild(heading3);
    tableHeadingRow.appendChild(tableHeadingDate);
    tableHeadingRow.appendChild(tableHeadingPrompt);
    tableHeadingRow.appendChild(tableHeadingDoodl);

    table.appendChild(tableHeadingRow);

    var border = document.createElement('tr');
    var bordercontents = document.createElement('td');

    bordercontents.style.borderTop = "2px solid black";
    bordercontents.colSpan = 3;

    border.appendChild(bordercontents);
    table.appendChild(border);

    for (var i = 1; i < doodlArray.length; i++){
        var tr = document.createElement('tr');
        var tempArray = doodlArray[i].split('|', 3);

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        td1.style.alignContent = "center";
        td2.style.alignContent = "center";
        td3.style.alignContent = "center";

        let url = tempArray[2];
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
        var text2 = document.createTextNode(tempArray[1]);
        var text3 = doodlCanvas;

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }

    document.body.appendChild(table);
});


try {
    let bkgTemp = sessionStorage.getItem('backColorOption');
    //console.log(bkgTemp);
    document.getElementById('selecterBackground').selectedIndex = parseInt(bkgTemp);
    selectBackground();
} catch (error) {
    console.log(error);
    //console.log("no bkgCol stored.");
}

function selectBackground()
{
    let settingsSelect = document.getElementById('selecterBackground');
    bkgCol = "#f67570";
    btnCol = "#1565c0";
    let txtCol = "#ededed";
    switch(settingsSelect.selectedIndex)
    {
        case 0:
            bkgCol = "#f67570";
            btnCol = "#1565c0";
            txtCol = "#171717";
            break;
        case 1:
            bkgCol = "#171717";
            btnCol = "#ededed";
            txtCol = "#ededed";
            break;
        case 2:
            bkgCol = "#ededed";
            btnCol = "#171717";
            txtCol = "#171717";
            break;
        case 3:
            bkgCol = "#1565c0";
            btnCol = "#f67570";
            txtCol = "#ededed";
            break;
    }
    document.body.style.backgroundColor = bkgCol;

    document.getElementById('generalTools').style.backgroundColor = bkgCol;
    let genTools = document.getElementsByClassName("generalIcons");
    for(var i = 0; i < genTools.length; i++)
    {
        genTools[i].style.backgroundColor = bkgCol;
    }

    //setting colour of all table elements:
    let t = document.getElementById('accountTable');
    let rows = t.rows;
    for(var i = 0; i < rows.length; i++)
    {
        let cells  = rows[i].cells;
        for(var l = 0; l < cells.length; l++)
        {
            cells[l].style.backgroundColor = bkgCol;
            cells[l].style.color = txtCol;
        }
    }

    sessionStorage.setItem('backColorOption', settingsSelect.selectedIndex.toString());
}