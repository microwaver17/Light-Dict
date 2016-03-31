#!/bin/sh

profile=`pwd | sed -e "s/^.*\///g"`
firefox=`which firefox-nightly`
echo make sure to be profile \"$profile\"

if [ "$1" == "-noinstall" ]
then
  $firefox -p $profile
elif [ "$1" == "-debug" ]
then
  jpm run -b $firefox -p $profile --debug
else
  jpm run -b $firefox -p $profile
fi
