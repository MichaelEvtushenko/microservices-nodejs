FROM golang:1.15 AS builder
WORKDIR /
COPY . .
RUN go build -ldflags "-w -s -linkmode external -extldflags -static" -a main.go

FROM scratch
COPY --from=builder /main .
CMD ["./main"]