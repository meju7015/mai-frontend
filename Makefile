build:
	docker build -t reg.stickinteractive.com/mai/frontend:latest .

push:
	docker push reg.stickinteractive.com/mai/frontend:latest

deploy: build | push

dev:
	yarn dev
