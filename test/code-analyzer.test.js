import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {parsedtoTable} from '../src/js/code-analyzer';
import {getModule} from '../src/js/code-analyzer';

/*describe('The javascript parser', () => {
it('is parsing an empty function correctly', () => {
assert.equal(
JSON.stringify(parseCode('')),
'{"type":"Program","body":[],"sourceType":"script"}'
);
});

it('is parsing a simple variable declaration correctly', () => {
assert.equal(
JSON.stringify(parseCode('let a = 1;')),
'{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a"},"init":{"type":"Literal","value":1,"raw":"1"}}],"kind":"let"}],"sourceType":"script"}'
);
});
});
*/
//1)simple
describe('The javascript program', () => {
    it('is converting a simple function correctly', () => {
        let parsedCode = parseCode("function add(a,b){return a+b;}");
        let mod = parsedtoTable(parsedCode);
        assert.equal(mod.join(),"index,line,type,name,condition,value,0,1,function declaration,add,,,1,1,variable declaration,a,,,2,1,variable declaration,b,,,3,1,return statement,,,a + b" );
    })});
    //2)example
    describe('The javascript program', () => {
        it('is converting a complex function correctly', () => {
            let parsedCode = parseCode(`function binarySearch(X, V, n){
                let low, high, mid;
                low = 0;
                high = n - 1;
                while (low <= high) {
                    mid = (low + high)/2;
                    if (X < V[mid])
                    high = mid - 1;
                    else if (X > V[mid])
                    low = mid + 1;
                    else
                    return mid;
                }
                return -1;
            }`);
            let mod = parsedtoTable(parsedCode);
            assert.equal(mod.join(),"index,line,type,name,condition,value,0,1,function declaration,binarySearch,,,1,1,variable declaration,X,,,2,1,variable declaration,V,,,3,1,variable declaration,n,,,4,2,variable declaration,low,,null,5,2,variable declaration,high,,null,6,2,variable declaration,mid,,null,7,3,assignment expression,low,,0,8,4,assignment expression,high,,n - 1,9,5,while statement,,low <= high,,10,6,assignment expression,mid,,(low + high) / 2,11,7,if statement,,X < V[mid],,12,8,assignment expression,high,,mid - 1,13,9,else if statement,,X > V[mid],,14,10,assignment expression,low,,mid + 1,15,12,return statement,,,mid,16,14,return statement,,,-1" );
        })});
        //3) assigning vars
        describe('The javascript program', () => {
            it('is assigning varaibles correctly', () => {
                let parsedCode = parseCode(`    function vardecs(a, b, c){
                    a = 2;
                    b = 3;
                    c = 4;
                    return (b*c)/2;
                }`);
                let mod = parsedtoTable(parsedCode);
                assert.equal(mod.join(),"index,line,type,name,condition,value,0,1,function declaration,vardecs,,,1,1,variable declaration,a,,,2,1,variable declaration,b,,,3,1,variable declaration,c,,,4,2,assignment expression,a,,2,5,3,assignment expression,b,,3,6,4,assignment expression,c,,4,7,5,return statement,,,b * c / 2" );
            })});
            // 4,5,6 if else
            describe('The javascript program', () => {
                it('is checking if else correctly, returning the smaller argument', () => {
                    let parsedCode = parseCode(`    function ifelse(a, b){
                        a = 2;
                        b = 3;
                        if (a < b)
                        return a;
                        else
                        return b;
                    }`);
                    let mod = parsedtoTable(parsedCode);
                    assert.equal(mod.join(),"index,line,type,name,condition,value,0,1,function declaration,ifelse,,,1,1,variable declaration,a,,,2,1,variable declaration,b,,,3,2,assignment expression,a,,2,4,3,assignment expression,b,,3,5,4,if statement,,a < b,,6,5,return statement,,,a,7,7,return statement,,,b" );
                })});

                describe('The javascript program', () => {
                    it('is checking if else correctly, returning the smaller argument', () => {
                        let parsedCode = parseCode(`    function ifelse(a, b){
                            a = 6;
                            b = 3;
                            if (a < b)
                            return a;
                            else
                            return b;
                        }`);
                        let mod = parsedtoTable(parsedCode);
                        assert.equal(mod.join(),"index,line,type,name,condition,value,0,1,function declaration,ifelse,,,1,1,variable declaration,a,,,2,1,variable declaration,b,,,3,2,assignment expression,a,,6,4,3,assignment expression,b,,3,5,4,if statement,,a < b,,6,5,return statement,,,a,7,7,return statement,,,b" );
                    })});

                    describe('The javascript program', () => {
                        it('is checking if else correctly, returning the smaller argument', () => {
                            let parsedCode = parseCode(` function simpleif(a,b){
                                if(a === b)
                                return true;
                            }`);
                            let mod = parsedtoTable(parsedCode);
                            assert.equal(mod.join(),"index,line,type,name,condition,value,0,1,function declaration,simpleif,,,1,1,variable declaration,a,,,2,1,variable declaration,b,,,3,2,if statement,,a === b,,4,3,return statement,,,true" );
                        })});

                        // 7 for loop
                        describe('The javascript program', () => {
                            it('is converting a simple function with for correctly', () => {
                                let parsedCode = parseCode(`function forloop(a, b, c){
                                    let k = 8;
                                    for(let i=0; i<c; i++){
                                        a = a + b;
                                    }
                                    return a;
                                }`);
                                let mod = parsedtoTable(parsedCode);
                                assert.equal(mod.join(),"index,line,type,name,condition,value,0,1,function declaration,forloop,,,1,1,variable declaration,a,,,2,1,variable declaration,b,,,3,1,variable declaration,c,,,4,2,variable declaration,k,,8,5,3,for statement,,i = 0;i < c;i++,,6,6,return statement,,,a" );
                            })});

                            // 8 while

                            describe('The javascript program', () => {
                                it('is converting a simple function with while correctly', () => {
                                    let parsedCode = parseCode(`function whileloop(a, b, c){
                                        let k = 8;
                                        while(a+b<k){
                                            a = a + b;
                                        }
                                        return a;
                                    }`);
                                    let mod = parsedtoTable(parsedCode);
                                    assert.equal(mod.join(),"index,line,type,name,condition,value,0,1,function declaration,whileloop,,,1,1,variable declaration,a,,,2,1,variable declaration,b,,,3,1,variable declaration,c,,,4,2,variable declaration,k,,8,5,3,while statement,,a + b < k,,6,4,assignment expression,a,,a + b,7,6,return statement,,,a" );
                                })});
                                // 9 return statement
                                describe('The javascript program', () => {
                                    it('is converting a simple function with a complex return statement correctly', () => {
                                        let parsedCode = parseCode(`function toCelsius(fahrenheit) {
                                            return (5/9) * (fahrenheit-32);
                                        }`);
                                        let mod = parsedtoTable(parsedCode);
                                        assert.equal(mod.join(),"index,line,type,name,condition,value,0,1,function declaration,toCelsius,,,1,1,variable declaration,fahrenheit,,,2,2,return statement,,,5 / 9 * (fahrenheit - 32)" );
                                    })});

                                    //10 function array & var decs
                                    describe('The javascript program', () => {
                                        it('is converting a simple function with arrays and var declarations correctly', () => {
                                            let parsedCode = parseCode(`function map(f, a) {
                                                var result = [],i; // Create a new Array
                                                for (i = 0; i != a.length; i++)
                                                result[i] = f(a[i]);
                                                return result;
                                            }`);
                                            let mod = parsedtoTable(parsedCode);
                                            assert.equal(mod.join(),"index,line,type,name,condition,value,0,1,function declaration,map,,,1,1,variable declaration,f,,,2,1,variable declaration,a,,,3,2,variable declaration,result,,[],4,2,variable declaration,i,,null,5,3,for statement,,i = 0i != a.length;i++,,6,5,return statement,,,result" );
                                        })});
