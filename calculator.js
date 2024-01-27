var numstring = "";
// var arr = [];
var historyarr = [];


// variables for getting input of operants and operator
var operator = 0; // it says that operator is at the end or not ( if at the end then don't take again )
var fordot = 0; // it check for dot that is not come more than once
var checkdot = 0; // help for do backspace operation 


// add event listner on all the number and operator
const calsulate = document.querySelectorAll('.number').length;
for( let i = 0;i<calsulate;i++){
    document.querySelectorAll('.number')[i].addEventListener('click',function(event) {

        const letter = event.target.innerHTML;

        if( letter == '=' || letter == 'x^2' || letter == '1/x'){
            // calculate final
            console.log( "final string is " , numstring);
            expressionAnswer(numstring);
        }
        if( letter == '+/-' ){
            console.log(letter);
            numstring = '-' + numstring;
            console.log(numstring);
        }
        if( letter == 'X'){
            console.log(letter);
            let chara = numstring[numstring.length - 1];
            numstring.slice(0,-1);
            if( chara == '.' ){
                fordot == 0
            }
            if( chara == '+' || chara == '-' || chara == '*' ||chara == '/' || chara == '%' ){
                operator = 0;
            }
            console.log(numstring);
        }
        if( parseInt(letter) <=9 && parseInt(letter) >=0 ){
            operator = 0;
            console.log(letter);
            numstring = numstring + letter;
            console.log(numstring);
        }
        if( letter == '.' && fordot == 0){
            fordot = 1;
            console.log(letter);
            numstring = numstring + letter;
            console.log(numstring);
        }
        if( (letter == '+' || letter == '-' || letter == '*' || letter == '/' || letter == '%') && operator == 0 ){
            operator = 1;
            fordot = 0;
            console.log(letter);
            let chara = numstring[numstring.length - 1];
            if( chara == '.' ){
                fordot == 0
                numstring[numstring.length - 1] = letter;
                console.log(numstring);
            }else{
                numstring = numstring + letter;
                console.log(numstring);
            }
        }
    })
}

function expressionAnswer(inputstring) {
    console.log(inputstring);
    let arr1 = convertInputtoArray(inputstring);
    console.log(arr1);
    let arr2 = changeToPostfix(arr1);
    console.log(arr2);
    let ans = finalAns(arr2);
    console.log(ans);
}

function convertInputtoArray(inputString){
    let currentNumber = '';
    let arr = [];
    console.log( "we are in form of string start" , arr ," ",currentNumber);

    for (let i = 0; i < inputString.length; i++) {
        const currentChar = inputString[i];
        console.log(currentChar);
      
        if ( (parseInt(currentChar) <=9 && parseInt(currentChar) >=0) || currentChar == '.' ) {
            console.log("here " ," ",currentNumber);
            currentNumber += currentChar;
            console.log("here " ," ",currentNumber);
        }else {
            console.log(" now ",arr ," ",currentNumber);
            arr.push(currentNumber);
            currentNumber = '';
            console.log(" now ",arr ," ",currentNumber);
            arr.push(currentChar);
            console.log(" now ",arr ," ",currentNumber);
        }
    }
    if (currentNumber != '') {
        arr.push(currentNumber);
    }

    console.log( "we are in form of string " , arr);
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
    const stack = [];
    
    for (let i = 0; i < infixExpression.length; i++) {
        const token = infixExpression[i];
    
        if ( parseFloat(token) <=9 && parseFloat(token) >=0) {  // operand
            newarr.push(token);
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

function finalAns(){
    const stack = [];
      
    for (let i = 0; i < postfixExpression.length; i++) {
        const token = postfixExpression[i];
      
        if (parseFloat(token) <=9 && parseFloat(token) >=0) {
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
                    stack.push((operand1 % operand2));
                    break;
                default:
                    throw new Error('Invalid operator: ' + token);
            }
        }
    }
      
    if (stack.length !== 1) {
        throw new Error('Invalid postfix expression');
    }
      
    return stack.pop();
      
}




// function infixToPostfix(infixExpression) {
//     const precedence = {
//       '+': 1,
//       '-': 1,
//       '*': 2,
//       '/': 2,
//       '^': 3
//     };
  
//     let output = '';
//     const stack = [];
  
//     for (let i = 0; i < infixExpression.length; i++) {
//       const token = infixExpression[i];
  
//       if (/[a-zA-Z0-9]/.test(token)) {
//         // Operand
//         output += token;
//       } else if (token === '(') {
//         // Left parenthesis
//         stack.push(token);
//       } else if (token === ')') {
//         // Right parenthesis
//         while (stack.length > 0 && stack[stack.length - 1] !== '(') {
//           output += stack.pop();
//         }
//         stack.pop(); // Discard the '(' from the stack
//       } else {
//         // Operator
//         while (
//           stack.length > 0 &&
//           precedence[token] <= precedence[stack[stack.length - 1]]
//         ) {
//           output += stack.pop();
//         }
//         stack.push(token);
//       }
//     }
  
//     // Pop any remaining operators from the stack to the output
//     while (stack.length > 0) {
//       output += stack.pop();
//     }
  
//     return output;
//   }
  
//   // Example usage:
//   const infixExpression = "a + b * (c - d) / e";
//   const postfixExpression = infixToPostfix(infixExpression);
//   console.log(postfixExpression);  // Output: "a b c d - * e / +"
  