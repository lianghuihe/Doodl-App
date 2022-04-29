window.onload=(function(){
    var doodlData;
    var doodlArray = [];

    doodlData = document.getElementById('doodlData').value;
    doodlArray = doodlData.split('||');

    var table = document.createElement('table');
    table.style.width = "80%";
    table.style.alignSelf = "center";

    var tableHeadingRow = document.createElement('tr');
    var tableHeadingName = document.createElement('th');
    var tableHeadingDoodl = document.createElement('th');
    var tableHeadingReport = document.createElement('th');
    var tableHeadingLike = document.createElement('th');
    var tableHeadingDislike = document.createElement('th');
    tableHeadingName.style.width = "20%";
    tableHeadingReport.style.width = "10%";
    tableHeadingLike.style.width = "10%";
    tableHeadingDislike.style.width = "10%";

    var heading1 = document.createTextNode("Artist");
    var heading2 = document.createTextNode("Doodl");
    var heading3 = document.createTextNode("Report");
    var heading4 = document.createTextNode("Like");
    var heading5 = document.createTextNode("Dislike");

    tableHeadingName.appendChild(heading1);
    tableHeadingDoodl.appendChild(heading2);
    tableHeadingReport.appendChild(heading3);
    tableHeadingLike.appendChild(heading4);
    tableHeadingDislike.appendChild(heading5);

    tableHeadingRow.appendChild(tableHeadingReport);
    tableHeadingRow.appendChild(tableHeadingName);
    tableHeadingRow.appendChild(tableHeadingDoodl);
    tableHeadingRow.appendChild(tableHeadingLike);
    tableHeadingRow.appendChild(tableHeadingDislike);
    table.appendChild(tableHeadingRow);

    var border = document.createElement('tr');
    var bordercontents = document.createElement('td');

    bordercontents.style.borderTop = "2px solid black";
    bordercontents.colSpan = 5;

    border.appendChild(bordercontents);
    table.appendChild(border);

    for (var i = 1; i < doodlArray.length; i++){

        var reportForm = document.createElement('form');
        reportForm.action = '/report';
        reportForm.method = 'get';

        var likeForm = document.createElement('form');
        likeForm.action = '/gallery';
        likeForm.method = 'post';

        var dislikeForm = document.createElement('form');
        dislikeForm.action = '/gallery';
        dislikeForm.method = 'post';
        
        var report = document.createElement('button');
        var like = document.createElement('button');
        var dislike = document.createElement('button');

        var reportDoodlID = document.createElement('input');
        var likeDoodlID = document.createElement('input');
        var dislikeDoodlID = document.createElement('input');

        var likeType = document.createElement('input');
        var dislikeType = document.createElement('input');

        var tr = document.createElement('tr');
        var tempArray = doodlArray[i].split('|', 5);

        likeType.id = 'likeType';
        dislikeType.id = 'dislikeType';

        likeType.name = 'likeType';
        dislikeType.name = 'likeType';

        likeType.type = 'hidden';
        dislikeType.type = 'hidden';

        likeType.value = "Like";
        dislikeType.value = "Dislike";

        var likeCount = document.createElement('text');
        var dislikeCount = document.createElement('text');

        reportDoodlID.id = 'reportDoodlID';
        likeDoodlID.id = 'likeDoodlID';
        dislikeDoodlID.id = 'dislikeDoodlID';

        reportDoodlID.name = 'reportDoodlID';
        likeDoodlID.name = 'doodlID';
        dislikeDoodlID.name = 'doodlID';

        reportDoodlID.type = 'hidden';
        likeDoodlID.type = 'hidden';
        dislikeDoodlID.type = 'hidden';

        reportDoodlID.value = tempArray[4];
        likeDoodlID.value = tempArray[4];
        dislikeDoodlID.value = tempArray[4];

        report.type = 'submit';
        like.type = 'submit';
        dislike.type = 'submit';

        report.innerHTML = '<img src="/images/report.png" height="50px" width="50px">';
        like.innerHTML = '<img src="/images/like.png" height="50px" width="50px">';
        dislike.innerHTML = '<img src="/images/dislike.png" height="50px" width="50px">';

        likeCount.innerHTML = tempArray[2];
        dislikeCount.innerHTML = tempArray[3];


        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        td1.style.alignContent = "center";
        td2.style.alignContent = "center";
        td3.style.alignContent = "center";
        td4.style.alignContent = "center";
        td5.style.alignContent = "center";

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

        reportForm.appendChild(report);
        likeForm.appendChild(like);
        dislikeForm.appendChild(dislike);

        reportForm.appendChild(reportDoodlID);
        likeForm.appendChild(likeDoodlID);
        dislikeForm.appendChild(dislikeDoodlID);

        likeForm.appendChild(likeCount);
        dislikeForm.appendChild(dislikeCount);

        likeForm.appendChild(likeType);
        dislikeForm.appendChild(dislikeType);

        var text1 = reportForm;
        var text2 = document.createTextNode(tempArray[0]);
        var text3 = doodlCanvas;
        var text4 = likeForm;
        var text5 = dislikeForm;
       
        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        td4.appendChild(text4);
        td5.appendChild(text5);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        table.appendChild(tr);
    }

    document.body.appendChild(table);
});