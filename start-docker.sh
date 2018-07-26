#!/bin/sh
set -e

container='node-api-boilerplate'
image='node-api-boilerplate:test'

docker build -t $image .

docker run --rm -p 3000:3000 --name $container $image
