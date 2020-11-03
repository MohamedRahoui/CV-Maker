#!/usr/bin/env bash
set -e pipefail
python -m pip install virtualenv
python -m virtualenv env

pip install -U pip

pip install -r requirements.txt
