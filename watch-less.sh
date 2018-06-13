#!/bin/bash
#
#
LESS_FILE="reflect_client/style.less"
CSS_FILE="reflect_client/style.css"

inotifywait -m -e modify "$LESS_FILE" |
while read -r filename ev; do
    lessc "$LESS_FILE" "$CSS_FILE"
done
