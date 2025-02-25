// const fs = require('fs');
// const { exec } = require('child_process');

// // Read logs from file
// const logs = fs.readFileSync('result.txt', 'utf8');

// // Regular expressions for function enter and exit
// const enterPattern = /\[FUNC ENTER\] (.+?) at \((.+?):(\d+)\), Args: (.+?), Timestamp: (\d+)/;
// const exitPattern = /\[FUNC EXIT\] (.+?) at \((.+?):(\d+)\), Return: (.+?), Exception: (.+?), Timestamp: (\d+)/;

// // Stack to track function calls
// const callStack = [['main', null, [], 0, 0]];
// const functionCalls = [];

// let anonymousCounter = 0;

// // Parse logs
// logs.trim().split('\n').forEach(line => {
//     const enterMatch = enterPattern.exec(line);
//     const exitMatch = exitPattern.exec(line);

//     if (enterMatch) {
//         let [_, funcName, file, lineNumber, args, timestamp] = enterMatch;

//         args = JSON.parse(args);
//         timestamp = parseInt(timestamp, 10);

//         if (funcName === '<anonymous>') {
//             anonymousCounter++;
//             funcName = `anonymous_${anonymousCounter}`;
//         }

//         const [prevFunc, prevFile, prevLine, prevArgs, prevTime] = callStack[callStack.length - 1];
//         functionCalls.push([[prevFunc, prevFile, prevLine, prevTime], [funcName, file, lineNumber, timestamp]]);

//         callStack.push([funcName, file, lineNumber, args, timestamp]);
//     } else if (exitMatch) {
//         callStack.pop();
//     }
// });

// // Generate Graphviz DOT representation
// let dot = 'digraph FunctionCalls {\n';
// functionCalls.forEach(([caller, callee]) => {
//     const callerNode = `"${caller[0]}\nFile: ${caller[1]}\nLine: ${caller[2]}\nTimestamp: ${caller[3]}"`;
//     const calleeNode = `"${callee[0]}\nFile: ${callee[1]}\nLine: ${callee[2]}\nTimestamp: ${callee[3]}"`;
//     dot += `    ${callerNode} -> ${calleeNode};\n`;
// });
// dot += '}';

// // Write DOT file
// fs.writeFileSync('function_calls.dot', dot);

// // Generate PNG using Graphviz
// exec('dot -Tpng function_calls.dot -o function_calls.png', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error generating graph: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`Graphviz stderr: ${stderr}`);
//         return;
//     }
//     console.log('Function call graph generated: function_calls.png');
// });




// const fs = require('fs');
// const { exec } = require('child_process');

// // Read logs from file
// const logs = fs.readFileSync('result.txt', 'utf8');

// // Regular expressions for function enter and exit
// const enterPattern = /\[FUNC ENTER\] (.+?) at \((.+?):(\d+)\), Args: (.+?), Timestamp: (\d+)/;
// const exitPattern = /\[FUNC EXIT\] (.+?) at \((.+?):(\d+)\), Return: (.+?), Exception: (.+?), Timestamp: (\d+)/;

// // Stack to track function calls
// const callStack = [];
// const functionCalls = [];
// const returnEdges = [];

// let anonymousCounter = 0;

// // Parse logs
// logs.trim().split('\n').forEach(line => {
//     const enterMatch = enterPattern.exec(line);
//     const exitMatch = exitPattern.exec(line);

//     if (enterMatch) {
//         let [_, funcName, file, lineNumber, args, timestamp] = enterMatch;

//         args = JSON.parse(args);
//         timestamp = parseInt(timestamp, 10);

//         if (funcName === '<anonymous>') {
//             anonymousCounter++;
//             funcName = `anonymous_${anonymousCounter}`;
//         }

//         // Get the parent function from the stack if it exists
//         if (callStack.length > 0) {
//             const parent = callStack[callStack.length - 1];
//             functionCalls.push({
//                 parent: parent.funcName,
//                 parentDetails: parent,
//                 child: funcName,
//                 childDetails: { funcName, file, lineNumber, args, timestamp }
//             });
//         }

//         // Push the current function to the stack
//         callStack.push({ funcName, file, lineNumber, args, timestamp });
//     } else if (exitMatch) {
//         let [_, funcName, file, lineNumber, returnValue, exception, timestamp] = exitMatch;

//         timestamp = parseInt(timestamp, 10);

//         if (callStack.length > 0) {
//             const lastFunction = callStack.pop();

//             // Match the exit to the most recent enter
//             if (lastFunction.funcName === funcName) {
//                 // Add a return edge
//                 returnEdges.push({
//                     from: lastFunction,
//                     to: { funcName, file, lineNumber, returnValue, exception, timestamp }
//                 });
//             }
//         }
//     }
// });

// // Generate Graphviz DOT representation
// let dot = 'digraph FunctionCalls {\n';
// dot += '    node [shape=box];\n'; // Optional: Use box-shaped nodes for clarity

// dot += '    edge [color=black];\n'; // Default edge color

// functionCalls.forEach(({ parent, parentDetails, child, childDetails }) => {
//     const parentNode = `"${parent}\nFile: ${parentDetails.file}\nLine: ${parentDetails.lineNumber}\nTimestamp: ${parentDetails.timestamp}"`;
//     const childNode = `"${child}\nFile: ${childDetails.file}\nLine: ${childDetails.lineNumber}\nTimestamp: ${childDetails.timestamp}"`;
//     dot += `    ${parentNode} -> ${childNode};\n`;
// });

// // Add return edges in a different color
// returnEdges.forEach(({ from, to }) => {
//     const fromNode = `"${from.funcName}\nFile: ${from.file}\nLine: ${from.lineNumber}\nTimestamp: ${from.timestamp}"`;
//     const toNode = `"${to.funcName}\nFile: ${to.file}\nLine: ${to.lineNumber}\nTimestamp: ${to.timestamp}\nReturn: ${to.returnValue}"`;
//     dot += `    ${fromNode} -> ${toNode} [label="return", style=dashed, color=red];\n`;
// });

// dot += '}';

// // Write DOT file
// fs.writeFileSync('function_calls.dot', dot);

// // Generate PNG using Graphviz
// exec('dot -Tpng function_calls.dot -o function_calls.png', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error generating graph: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`Graphviz stderr: ${stderr}`);
//         return;
//     }
//     console.log('Function call graph generated: function_calls.png');
// });



const fs = require('fs');
const { exec } = require('child_process');

// Read logs from file
const logs = fs.readFileSync('result.txt', 'utf8');

// Regular expressions for function enter and exit
const enterPattern = /\[FUNC ENTER\] (.+?) at \((.+?):(\d+)\), Args: (.+?), Timestamp: (\d+)/;
const exitPattern = /\[FUNC EXIT\] (.+?) at \((.+?):(\d+)\), Return: (.+?), Exception: (.+?), Timestamp: (\d+)/;

// Stack to track function calls
const callStack = [];
const functionCalls = [];
const returnEdges = [];

let anonymousCounter = 0;

// Convert UNIX timestamp to human-readable date-time format
	// function unixTimeToHumanReadable(seconds)
    function formatTimestampToIST(timestamp) {
        var date = new Date(parseInt(timestamp));
    
        // Convert UTC time to IST (UTC +5:30)
        var istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
        var istDate = new Date(date.getTime() );
    
        // Format the date and time in IST
        var formattedDate = 
            (istDate.getMonth() + 1) + '/' + istDate.getDate() + '/' + istDate.getFullYear() + 
            ' ' + istDate.getHours().toString().padStart(2, '0') + ':' + 
            istDate.getMinutes().toString().padStart(2, '0') + ':' + 
            istDate.getSeconds().toString().padStart(2, '0') + ' IST';
    
        return formattedDate;
    }
    
// Parse logs
logs.trim().split('\n').forEach(line => {
    const enterMatch = enterPattern.exec(line);
    const exitMatch = exitPattern.exec(line);

    if (enterMatch) {
        let [_, funcName, file, lineNumber, args, timestamp] = enterMatch;

        args = JSON.parse(args);
        timestamp = parseInt(timestamp, 10);
        const formattedTimestamp = formatTimestampToIST(timestamp);

        if (funcName === '<anonymous>') {
            anonymousCounter++;
            funcName = `anonymous_${anonymousCounter}`;
        }

        // Get the parent function from the stack if it exists
        if (callStack.length > 0) {
            const parent = callStack[callStack.length - 1];
            functionCalls.push({
                parent: parent.funcName,
                parentDetails: parent,
                child: funcName,
                childDetails: { funcName, file, lineNumber, args, timestamp: formattedTimestamp }
            });
        }

        // Push the current function to the stack
        callStack.push({ funcName, file, lineNumber, args, timestamp: formattedTimestamp });
    } else if (exitMatch) {
        let [_, funcName, file, lineNumber, returnValue, exception, timestamp] = exitMatch;

        timestamp = parseInt(timestamp, 10);
        const formattedTimestamp = formatTimestampToIST(timestamp);

        if (callStack.length > 0) {
            const lastFunction = callStack.pop();

            // Match the exit to the most recent enter
            if (lastFunction.funcName === funcName) {
                // Add a return edge
                returnEdges.push({
                    from: lastFunction,
                    to: { funcName, file, lineNumber, returnValue, exception, timestamp: formattedTimestamp }
                });
            }
        }
    }
});

// Generate Graphviz DOT representation
let dot = 'digraph FunctionCalls {\n';
dot += '    node [shape=box];\n'; // Optional: Use box-shaped nodes for clarity

dot += '    edge [color=black];\n'; // Default edge color

functionCalls.forEach(({ parent, parentDetails, child, childDetails }) => {
    const parentNode = `"${parent}\nFile: ${parentDetails.file}\nLine: ${parentDetails.lineNumber}\nTime: ${parentDetails.timestamp}"`;
    const childNode = `"${child}\nFile: ${childDetails.file}\nLine: ${childDetails.lineNumber}\nTime: ${childDetails.timestamp}"`;
    dot += `    ${parentNode} -> ${childNode};\n`;
});

// Add return edges in a different color
returnEdges.forEach(({ from, to }) => {
    const fromNode = `"${from.funcName}\nFile: ${from.file}\nLine: ${from.lineNumber}\nTime: ${from.timestamp}"`;
    const toNode = `"${to.funcName}\nFile: ${to.file}\nLine: ${to.lineNumber}\nTime: ${to.timestamp}\nReturn: ${to.returnValue}"`;
    dot += `    ${fromNode} -> ${toNode} [label="return", style=dashed, color=red];\n`;
});

dot += '}';

// Write DOT file
fs.writeFileSync('function_calls.dot', dot);

// Generate PNG using Graphviz
exec('dot -Tpng function_calls.dot -o function_calls.png', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error generating graph: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Graphviz stderr: ${stderr}`);
        return;
    }
    console.log('Function call graph generated: function_calls.png');
});



// const fs = require('fs');
// const { exec } = require('child_process');

// const logs = fs.readFileSync('result.txt', 'utf8');

// const enterPattern = /\[FUNC ENTER\] (.+?) at \((.+?):(\d+)\), Args: (.+?), Timestamp: (\d+)/;
// const exitPattern = /\[FUNC EXIT\] (.+?) at \((.+?):(\d+)\), Return: (.+?), Exception: (.+?), Timestamp: (\d+)/;

// const nodes = new Map(); // Stores merged function calls by file:lineNumber
// const edges = new Map(); // Tracks relationships (parent -> child)

// let anonymousCounter = 0;
// const callStack = [];

// logs.trim().split('\n').forEach(line => {
//     const enterMatch = enterPattern.exec(line);
//     const exitMatch = exitPattern.exec(line);

//     if (enterMatch) {
//         let [_, funcName, file, lineNumber, args, timestamp] = enterMatch;

//         args = JSON.parse(args);
//         timestamp = parseInt(timestamp, 10);

//         if (funcName === '<anonymous>') {
//             anonymousCounter++;
//             funcName = `anonymous_${anonymousCounter}`;
//         }

//         const key = `${file}:${lineNumber}`;
//         if (!nodes.has(key)) {
//             nodes.set(key, new Set());
//         }
//         nodes.get(key).add(funcName);

//         if (callStack.length > 0) {
//             const parentKey = callStack[callStack.length - 1];
//             if (!edges.has(parentKey)) {
//                 edges.set(parentKey, new Set());
//             }
//             edges.get(parentKey).add(key);
//         }

//         callStack.push(key);
//     } else if (exitMatch) {
//         let [_, funcName, file, lineNumber, returnValue, exception, timestamp] = exitMatch;
//         timestamp = parseInt(timestamp, 10);
//         const key = `${file}:${lineNumber}`;

//         if (callStack.length > 0 && callStack[callStack.length - 1] === key) {
//             callStack.pop();
//         }
//     }
// });

// // Generate Graphviz DOT representation
// let dot = 'digraph FunctionCalls {\n';
// dot += '    node [shape=box];\n';

// dot += '    edge [dir=both, color=black];\n';

// // Define nodes
// nodes.forEach((funcSet, key) => {
//     const label = `${Array.from(funcSet).join(', ')}\n${key.replace(/"/g, '\\"')}`;
//     dot += `    "${key}" [label="${label}"];\n`;
// });

// // Define edges
// edges.forEach((children, parent) => {
//     children.forEach(child => {
//         dot += `    "${parent}" -> "${child}";\n`;
//     });
// });

// dot += '}';

// // Write DOT file
// fs.writeFileSync('function_calls.dot', dot);

// // Generate PNG using Graphviz
// exec('dot -Tpng function_calls.dot -o function_calls.png', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error generating graph: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`Graphviz stderr: ${stderr}`);
//         return;
//     }
//     console.log('Function call graph generated: function_calls.png');
// });
