#!/bin/sh

profile=`pwd | sed -e "s/^.*\///g"`
echo make sure to be profile \"$profile\"

if [ "$1" == "-n" ]
then
  jpm run -b `which firefox-nightly` -p $profile --debug
else
  jpm run -b `which firefox` -p $profile --debug
fi
