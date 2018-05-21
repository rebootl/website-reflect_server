#!/bin/bash
#
#
LESS_FILE="style.less"
CSS_FILE="style.css"

inotifywait -m -e modify "$LESS_FILE" |
while read -r filename ev; do
    lessc "$LESS_FILE" "$CSS_FILE"
done
