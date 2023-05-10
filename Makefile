IMAGE_NAME := serverless-express-app:latest
CONTAINER_NAME := serverless_app


build:
   docker build -t $(IMAGE_NAME) .

run:
   docker run -it --rm \
   -v ~/.aws:/root/.aws \
   -v `pwd`:/var/task \
   --name $(CONTAINER_NAME) \
   -p 9000:8080 $(IMAGE_NAME)

test:
   curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -H "Content-Type: application/json" -d @events/postEvent.json

test-server:
   curl -XPOST "http://localhost:3000" -H "Content-Type: application/json" -d '{"name":"aaron"}'

test-ip:
   curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -H "Content-Type: application/json" -d @events/ipPostEvent.json

test-ip-server:
   curl -XPOST "http://localhost:3000/ip" -H "Content-Type: application/json" -d '{"name":"aaron"}'

sh:
   docker exec -it $(CONTAINER_NAME) sh
