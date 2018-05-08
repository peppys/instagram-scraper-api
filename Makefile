run:
	docker-compose up
build:
	docker-compose build
build-image:
	docker build -t xpeppy/instagram-scraper-api .
push-image:
	docker push xpeppy/instagram-scraper-api
run-redis:
	docker run -p 6379:6379 redis:alpine
gcloud-credentials:
	gcloud config set project personal-200804
	gcloud config set compute/zone us-central1-a
	gcloud container clusters get-credentials instagram-scraper
deploy-redis:
	make gcloud-credentials
	kubectl apply -f redis-deployment.yaml
deploy-api:
	make gcloud-credentials
	kubectl apply -f api-deployment.yaml
