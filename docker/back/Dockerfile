FROM python:3.10

ARG USER_ID=1000

ENV ROOT=/app
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

WORKDIR ${ROOT}

# Install Docker CLI
RUN apt update
RUN apt-get -y install \
  ca-certificates \
  gnupg \
  tmux \
  ffmpeg \
  lsb-release
RUN mkdir -m 0755 -p /etc/apt/keyrings
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
RUN echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt update
RUN apt -y install docker-ce-cli docker-compose-plugin

# Install Python packages
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools wheel

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# # Create non root user and setup environment.
# RUN useradd -m -d /home/user -g root -G sudo -u ${USER_ID} user
# RUN usermod -aG sudo user
# # Set user password
# RUN echo "user:user" | chpasswd
# # Ensure sudo group users are not asked for a password when using sudo command by ammending sudoers file
# RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# RUN groupadd -g 1001 docker && \
#   usermod -aG docker user

# # Switch to new uer and workdir.
# USER ${USER_ID}
# WORKDIR /home/user

# # Add local user binary folder to PATH variable.
# ENV PATH="${PATH}:/home/user/.local/bin"
# SHELL ["/bin/bash", "-c"]

# USER ${USER_ID}
WORKDIR ${ROOT}
