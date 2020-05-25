FROM golang:1.13
WORKDIR "/app"
COPY . /app
RUN go build main.go

FROM alpine:latest
WORKDIR "/app"
COPY --from=0 /app .
CMD ["go", "run", "main.go"]
