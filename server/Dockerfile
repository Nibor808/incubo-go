FROM golang:1.13 AS builder
ENV GO111MODULE=on
WORKDIR /app

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build
EXPOSE 5000
ENTRYPOINT ["/app/incubo-go-server"]
