import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

var index;
var elseif = false;
var module;


const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse, { loc: true });
};



let parsedtoTable = (parsedCode) =>{
    module = [ ['index','line','type','name', 'condition', 'value']];
    index = 0;
    let func = parsedCode.body[0];     // function declaration
    let line = func.id.loc.start.line;
    let type = 'function declaration';
    let name = func.id.name;
    addRow(line,type,name);
    for (let i = 0; i < func.params.length; i++) {     // params
        let type = 'variable declaration';
        let name = func.params[i].name;
        let line = func.params[i].loc.start.line;
        addRow(line,type,name);
    }
    for (let i = 0; i < func.body.body.length; i++) {
        expToTable(func.body.body[i]);
    }
    return module;
};


let blockStatementExpression = (exp) => {
    for (var i = 0; i < exp.body.length; i++)
        expToTable(exp.body[i]);
};

let expressionStatement =(exp) => {
    expToTable(exp.expression);
};

let assignmentExpression = (exp) => {
    let type = 'assignment expression';
    let name = escodegen.generate(exp.left);
    let line = exp.loc.start.line;
    let value = escodegen.generate(exp.right);
    addRow(line,type,name,undefined,value);
};

let variableDeclaration = (exp) => {
    for (var i = 0; i < exp.declarations.length; i++) {
        let type = 'variable declaration';
        let name = exp.declarations[i].id.name;
        let line = exp.declarations[i].loc.start.line;
        let value = 'null';
        if(exp.declarations[i].init != null){
            value =  escodegen.generate(exp.declarations[i].init);
        }
        addRow(line,type,name,undefined,value);
    }
};

let whileStatement = (exp) => {
    let type = 'while statement';
    let condition = escodegen.generate(exp.test);
    let line = exp.loc.start.line;
    addRow(line,type,undefined,condition,undefined);
    expToTable(exp.body);
};

let ifStatement = (exp) => {
    let type = 'if statement';
    if(elseif === true){
        type = 'else if statement';
        elseif = false;
    }
    let condition = escodegen.generate(exp.test);
    let line = exp.loc.start.line;
    addRow(line,type,undefined,condition,undefined);
    expToTable(exp.consequent);
    if(exp.alternate != undefined){
        if(exp.alternate.type === 'IfStatement')
            elseif = true;
        expToTable(exp.alternate);
    }
};

let returnStatement =(exp) => {
    let type = 'return statement';
    let value = escodegen.generate(exp.argument);
    let line = exp.loc.start.line;
    addRow(line,type,undefined,undefined,value);
};

let forStatement = (exp) => {
    let type = 'for statement';
    let init = escodegen.generate(exp.init).replace('let ','');
    let test = escodegen.generate(exp.test);
    let update= escodegen.generate(exp.update);
    let condition = init  + test +';' + update;
    let line = exp.loc.start.line;
    addRow(line,type,undefined,condition,undefined);
};

var dictionary = {};
dictionary.BlockStatement = blockStatementExpression;
dictionary.ExpressionStatement = expressionStatement;
dictionary.AssignmentExpression = assignmentExpression;
dictionary.VariableDeclaration = variableDeclaration;
dictionary.WhileStatement = whileStatement;
dictionary.IfStatement = ifStatement;
dictionary.ReturnStatement = returnStatement;
dictionary.ForStatement = forStatement;

let expToTable = (exp) => {
    dictionary[exp.type](exp);
};


let addRow =(line,type,name,condition,value) =>{
    module.push([index++,line,type,name,condition,value]);
    //console.log(module.join());
    //console.log(module);
    /*var row = table.insertRow();
    var cellLine = row.insertCell(0);
    var cellType = row.insertCell(1);
    var cellName = row.insertCell(2);
    var cellCondition = row.insertCell(3);
    var cellValue = row.insertCell(4);
    cellLine.innerHTML = line;
    cellType.innerHTML = type;
    if(name!=undefined)
    cellName.innerHTML = name;
    if(condition!=undefined)
    cellCondition.innerHTML = condition;
    if(value!=undefined)
    cellValue.innerHTML = value;
    */
};

/*
let updateTable = (table , module) =>{
for(let i=0; i<module.length; i++){
var row = table.insertRow();
var cellLine = row.insertCell(0);
var cellType = row.insertCell(1);
var cellName = row.insertCell(2);
var cellCondition = row.insertCell(3);
var cellValue = row.insertCell(4);
let line = module[i][1];
let type = module[i][2];
let name = module[i][3];
let condition = module[i][4];
let value = module[i][5];
cellLine.innerHTML = line;
cellType.innerHTML = type;
if(name!=undefined)
cellName.innerHTML = name;
if(condition!=undefined)
cellCondition.innerHTML = condition;
if(value!=undefined)
cellValue.innerHTML = value;
}

}
*/
export {parsedtoTable};
export {parseCode};
