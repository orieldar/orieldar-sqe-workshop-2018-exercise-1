import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {parsedtoTable} from './code-analyzer';


$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let table = document.getElementById('myTable');
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        updateTable(table,parsedtoTable(parsedCode));
        //$('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
});

let updateTable = (table , module) =>{
    deleteRows(table);
    for(let i=1; i<module.length; i++){
        var row = table.insertRow();
        var cellLine = row.insertCell(0);
        var cellType = row.insertCell(1);
        var cellName = row.insertCell(2);
        var cellCondition = row.insertCell(3);
        var cellValue = row.insertCell(4);
        cellLine.innerHTML = module[i][1];//line
        cellType.innerHTML = module[i][2];//type
        if(module[i][3]!=undefined)
            cellName.innerHTML = module[i][3];//name
        if( module[i][4]!=undefined)
            cellCondition.innerHTML = module[i][4];//condition
        if( module[i][5]!=undefined)
            cellValue.innerHTML = module[i][5];//value
    }
};

let deleteRows = (table) => {
    let count = table.rows.length;
    for (let i = 1; i < count; i++) {
        table.deleteRow(1);
    }
};
