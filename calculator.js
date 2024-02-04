var numstring = "";
var historyarr = [];

// variables for getting input of operants and operator
var fordot = 0; // check for dot that is not come more than once for each number
var paranthesis = 0;


// add event listner on all the number and operator
const calsulate = document.querySelectorAll('.number').length;
for( let i = 0;i<calsulate;i++){
    document.querySelectorAll('.number')[i].addEventListener('click',function(event) {

        const letter = event.target.innerHTML;
        console.log( "hello letter ", letter);

        if( letter == '=' || letter == 'x^2'){
            // calculate final
            console.log( "final string is " , numstring);
            expressionAnswer(numstring);
        }
        if( letter == 'X'){
            console.log(letter);
            console.log("now delete");
            let chara = numstring[numstring.length - 1];
            console.log("now deleting char " ,chara);
            numstring = numstring.slice(0,-1);
            console.log("now after delete " ,numstring);
            fordot=0;
            if( chara == ')' ){
                paranthesis++;
            }
            if( chara == '(' ){
                paranthesis--;
            }
            for( let as = numstring.length-1;as>=0;as--){
                if( numstring[as] == ')' && as == numstring.length-1){
                    fordot = 1;
                    break;
                }
                if( numstring[as] == '.'){
                    fordot = 1;
                    break;
                }
                if( numstring[as] == '+' || numstring[as] == '-' || numstring[as] == '*' ||numstring[as] == '/' || numstring[as] == '%' || numstring[as] == ')' ){
                    break;
                }
            }
            console.log(numstring);
        }
        if( parseInt(letter) <=9 && parseInt(letter) >=0 ){
            let chara = numstring[numstring.length - 1];
            if( chara != ')'){
                numstring = numstring + letter;
            }
        }
        if( letter == '(' ){
            let chara = numstring[numstring.length - 1];
            if( chara == '+' || chara == '-' || chara == '*' || chara == '/' || chara == '%' || chara == '('){
                numstring = numstring + letter;
                paranthesis++;
            }
        }
        if( letter == ')' && paranthesis > 0){
            let chara = numstring[numstring.length - 1];
            if( chara == '+' || chara == '-' || chara == '*' || chara == '/' || chara == '%' ){
            }else{
                numstring = numstring + letter;
                paranthesis--;
                fordot = 1;
            }
        }
        if( letter == '.' && fordot == 0){
            fordot = 1;
            numstring = numstring + letter;
        }
        if( letter == '+' || letter == '-' || letter == '*' || letter == '/' || letter == '%'){
            let chara = numstring[numstring.length - 1];
            if( chara == '.' || chara == '+' || chara == '-' || chara == '*' || chara == '/' || chara == '%' || chara == '(' || numstring.length == 0){
            }else{
                numstring = numstring + letter;
                fordot = 0;
            }
        }
    })
}

function expressionAnswer(inputstring) {
    console.log(inputstring);
    let arr1 = convertInputtoArray(inputstring);
    console.log(arr1);
    console.log( "we maked final array of nums and operator and now is postprifix");
    let arr2 = changeToPostfix(arr1);
    console.log( "we maked new");
    console.log(arr2);
    console.log( "we maked new 2" );
    let ans = finalAns(arr2);
    console.log(ans);
}

function convertInputtoArray(inputString){
    let currentNumber = '';
    let arr = [];

    for (let i = 0; i < inputString.length; i++) {
        const currentChar = inputString[i];
        console.log(currentChar);
      
        if ( (parseInt(currentChar) <=9 && parseInt(currentChar) >=0) || currentChar == '.' ) {
            currentNumber += currentChar;
        }else {
            if (currentNumber != '') {
                arr.push(currentNumber);
                currentNumber = '';
            }
            arr.push(currentChar);
        }
    }
    if (currentNumber != '') {
        arr.push(currentNumber);
    }

    return arr;
}

function changeToPostfix(infixExpression){

    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3
    };
    
    let newarr = [];
    let stack = [];
    
    for (let i = 0; i < infixExpression.length; i++) {
        const token = infixExpression[i];
    
        if ( parseFloat(token) >=0) {  // operand
            newarr.push(token);
        } else if (token == '(') {

            stack.push(token);
        } else if (token == ')') {

            while (stack.length > 0 && stack[stack.length - 1] != '(') {
                newarr.push(stack.pop());
            }
            stack.pop(); // Discard the '(' from the stack
        }else {  // operator
            while (
                stack.length > 0 &&
                precedence[token] <= precedence[stack[stack.length - 1]]
            ){
                newarr.push(stack.pop());
            }
            stack.push(token);
        }
    }
    
    // Pop any remaining operators from the stack to the output
    while (stack.length > 0) {
        newarr.push(stack.pop());
    }
    
   return newarr;
}

function finalAns(postfixExpression){
    const stack = [];
      
    for (let i = 0; i < postfixExpression.length; i++) {
        const token = postfixExpression[i];
      
        if (parseFloat(token) >=0) {
            // Operand
            stack.push(parseFloat(token));
        } else {
            // Operator
            const operand2 = stack.pop();
            const operand1 = stack.pop();
      
            switch (token) {
                case '+':
                    stack.push(operand1 + operand2);
                    break;
                case '-':
                    stack.push(operand1 - operand2);
                    break;
                case '*':
                    stack.push(operand1 * operand2);
                    break;
                case '/':
                    stack.push(operand1 / operand2);
                    break;
                case '%':
                    stack.push((operand1 ^ operand2));
                    break;
                default:
                    console.log('Invalid operator: ' + token);
            }
        }
    }
      
    if (stack.length !== 1) {
        throw new Error('Invalid postfix expression');
    }
      
    return stack.pop();
}
  