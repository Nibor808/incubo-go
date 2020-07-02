FROM golang:1.13
ENV GO111MODULE=on
WORKDIR /incubo

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o app .

FROM alpine:latest
WORKDIR /root/
COPY --from=0 /incubo/app .
EXPOSE 5000
CMD ["./app"]
