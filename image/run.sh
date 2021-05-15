#!/bin/bash

set -x

scl enable ondemand -- erb -T- /tmp/run.sh.erb > /tmp/run.sh

/bin/bash /tmp/run.sh
