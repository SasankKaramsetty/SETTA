import re
import json

# Read logs from file
with open('result.txt', 'r') as file:
    logs = file.read()

# Regular expressions for function enter and exit
enter_pattern = re.compile(r'\[FUNC ENTER\] (.+?) at \((.+?)\), Args: (.+?), Timestamp: (\d+)')
exit_pattern = re.compile(r'\[FUNC EXIT\] (.+?) at \((.+?)\), Return: (.+?), Exception: (.+?), Timestamp: (\d+)')

# Stack to track function calls
call_stack = [('main', None, [], 0)]
function_calls = []

anonymous_counter = 0

# Parse logs
for line in logs.strip().split("\n"):
    enter_match = enter_pattern.match(line)
    exit_match = exit_pattern.match(line)

    if enter_match:
        func_name, location, args, timestamp = enter_match.groups()

        args = json.loads(args)
        timestamp = int(timestamp)

        if func_name == '<anonymous>':
            anonymous_counter += 1
            func_name = f'anonymous_{anonymous_counter}'

        prev_func, prev_loc, prev_args, prev_time = call_stack[-1]
        function_calls.append(((prev_func, prev_loc), (func_name, location)))

        call_stack.append((func_name, location, args, timestamp))
    
    elif exit_match:
        call_stack.pop()

# Print function call details
for caller, callee in function_calls:
    caller_node = f"Caller: {caller[0]} at {caller[1]}"
    callee_node = f"Callee: {callee[0]} at {callee[1]}"
    print(f"{caller_node} -> {callee_node}")
