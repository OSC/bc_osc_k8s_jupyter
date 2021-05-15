ARG BASE_IMAGE=docker-registry.osc.edu/osc/osc-cluster-base
ARG BASE_IMAGE_VERSION=latest
FROM $BASE_IMAGE:$BASE_IMAGE_VERSION

RUN yum -y install centos-release-scl https://yum.osc.edu/ondemand/latest/ondemand-release-web-latest-1-6.noarch.rpm \
    && yum clean all && rm -rf /var/cache/yum/*
RUN yum -y install ondemand-ruby && yum clean all && rm -rf /var/cache/yum/*

COPY before.sh.erb /tmp/
COPY script.sh.erb /tmp/
RUN cat /tmp/before.sh.erb /tmp/script.sh.erb > /tmp/run.sh.erb
COPY run.sh /run.sh
