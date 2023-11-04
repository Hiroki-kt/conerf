FROM python:3.10

RUN apt update && apt install -y \
  tmux \
  ffmpeg

RUN pip install --upgrade pip
RUN pip install --upgrade setuptools wheel

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /app
WORKDIR /app
