#!/bin/bash

# this is just for installing the dependancy


####################
# python3 dependency
####################

python3 -m pip install asyncio || {
    echo install asyncio fail, abort
    exit -1
}
python3 -m pip install aiohttp || {
    echo install asyncio fail, abort
    exit -1
}

####################
# poetry stuff
####################
[ ! -d build ] && mkdir build
old_pwd_tmp=`pwd`
cd build
poem_file=poem.dat # where poem lies
[ -f poetry.sql ] || { # download when not exist
    wget https://github.com/hebingchang/ancient_poetry/raw/master/poetry.sql
}
left=`grep INSERT poetry.sql`

old_IFS_tmp=$IFS
IFS="),("
count=0
echo "seperate progress start..."
for i in $left ; do
    echo $i
done > poem_seperate.tmp
IFS=$old_IFS_tmp

echo "merge progress start..."
awk '\
BEGIN{ forgetFirstLine="T"; line=0} \
{ \
  if (forgetFirstLine == "T") { forgetFirstLine="F"; } \
  else { \
    if ($0 == "") { line=0;}\
    else if (line > 4) {} \
    else {printf $0","; line=line+1; if(line==5) print "";} \
  } \
} \
' poem_seperate.tmp > poem_with_quote.tmp
sed -e "s/\'//g"  poem_with_quote.tmp > $poem_file
cd "$old_pwd_tmp"

echo done