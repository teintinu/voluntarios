#!/bin/bash

cd `dirname $0`/../client

while IFS=  read -r -d $'\0'; do
  rm $REPLY
done < <(find . -type f \( -name \*.js -o -name \*.js.map \) -print0)
