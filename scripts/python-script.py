import json
import sys


def first_function():
    json_obj = open(sys.argv[2])
    data = json.load(json_obj)
    calculatedResults = [1, 2, 4, 3]
    X = data['X']
    y = data['y']
    json_object_result = json.dumps(calculatedResults, indent=4)

    with open(sys.argv[3], 'w') as outfile:
        outfile.write(json_object_result)
    print("OK")


if sys.argv[1] == 'first_function':
    first_function()

sys.stdout.flush()
