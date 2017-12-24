#!/bin/bash

# this is just for installing the dependancy

python3 -m pip install asyncio || {
    echo install asyncio fail, abort
    exit -1
}
python3 -m pip install aiohttp || {
    echo install asyncio fail, abort
    exit -1
}