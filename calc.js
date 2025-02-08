// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// function calculate(num1, num2, operator) {
//     if (operator === '+') {
//         return num1 + num2;
//     } else if (operator === '-') {
//         return num1 - num2;
//     } else if (operator === '*') {
//         return num1 * num2;
//     } else if (operator === '/') {
//         if (num2 === 0) {
//             return "Error: Division by zero is not allowed!";
//         }
//         return num1 / num2;
//     } else {
//         return "Invalid operator!";
//     }
// }

// function processCalculation() {
//     rl.question("Enter your input: ", (input) => {
//         const parts = input.split(" ");
        
//         if (parts.length < 1) {
//             console.log("Invalid input format. Try again.");
//             processCalculation();
//             return;
//         }

//         const choice = parts[0]; 
//         if (choice === '5') {
//             console.log("Exiting Calculator. Goodbye!");
//             rl.close();
//             return;
//         }

//         if (['1', '2', '3', '4'].includes(choice) && parts.length === 3) {
//             const num1 = parseFloat(parts[1]); 
//             const num2 = parseFloat(parts[2]); 
//             let operator = '';
//             if (choice === '1') operator = '+';
//             else if (choice === '2') operator = '-';
//             else if (choice === '3') operator = '*';
//             else if (choice === '4') operator = '/';

//             const result = calculate(num1, num2, operator);
//             console.log(`Result: ${result}`);
//         } else {
//             console.log("Invalid input format. Make sure to follow: <choice> <number1> <number2>");
//         }
//         processCalculation();
//     });
// }

// console.log("Welcome to the Calculator!");
// processCalculation();



// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// function calculate(num1, num2, operator) {
//     if (operator === '+') {
//         return num1 + num2;
//     } else if (operator === '-') {
//         return num1 - num2;
//     } else if (operator === '*') {
//         return num1 * num2;
//     } else if (operator === '/') {
//         if (num2 === 0) {
//             return "Error: Division by zero is not allowed!";
//         }
//         return num1 / num2;
//     } else {
//         return "Invalid operator!";
//     }
// }

// function asyncCalculate(num1, num2, operator) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             try {
//                 const result = calculate(num1, num2, operator);
//                 resolve(result); 
//             } catch (error) {
//                 reject(error); 
//             }
//         }, 1000); 
//     });
// }

// async function processCalculation() {
//     rl.question("Enter your input: ", async (input) => {
//         const parts = input.split(" ");
        
//         if (parts.length < 1) {
//             console.log("Invalid input format. Try again.");
//             await processCalculation(); 
//             return;
//         }

//         const choice = parts[0]; 
//         if (choice === '5') {
//             console.log("Exiting Calculator. Goodbye!");
//             rl.close();
//             return;
//         }

//         if (['1', '2', '3', '4'].includes(choice) && parts.length === 3) {
//             const num1 = parseFloat(parts[1]); 
//             const num2 = parseFloat(parts[2]); 
//             let operator = '';
//             if (choice === '1') operator = '+';
//             else if (choice === '2') operator = '-';
//             else if (choice === '3') operator = '*';
//             else if (choice === '4') operator = '/';

//             try {
//                 const result = await asyncCalculate(num1, num2, operator);
//                 console.log(`Result: ${result}`);
//             } catch (error) {
//                 console.log("Error during calculation:", error);
//             }
//         } else {
//             console.log("Invalid input format. Make sure to follow: <choice> <number1> <number2>");
//         }
//         await processCalculation(); 
//     });
// }

// console.log("Welcome to the Calculator!");
// processCalculation();







// JSON input
const input = { status: "active", delay: 1000 };

// Async function with setTimeout and Promise
async function processInput(data) {
    console.log("Processing input...");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.status === "active") {
                resolve("Input processed successfully!");
            } else {
                reject("Invalid status in input.");
            }
        }, data.delay);
    });
}

// Main function
function main() {
    try {
        console.log("Starting...");
        const result = processInput(input);
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();