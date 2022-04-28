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

    var text1 = document.createTextNode(tempArray[0]);
    var text2 = document.createTextNode(tempArray[1]);

    td1.appendChild(text1);
    td2.appendChild(text2);
    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);
}

document.body.appendChild(table);