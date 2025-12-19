.PHONY: up down logs infra-clean

# Start infrastructure
up:
	docker compose up -d

# Stop infrastructure
down:
	docker compose down

# View logs
logs:
	docker compose logs -f

# Clean infrastructure data (Use with caution!)
infra-clean:
	docker compose down -v
	rm -rf infrastructure/clickhouse_data
	rm -rf infrastructure/clickhouse_logs
	rm -rf infrastructure/postgres_data
	rm -rf infrastructure/minio_data

# Run Go API (Dev)
api-dev:
	cd apps/api && go run main.go

# Run Web (Dev)
web-dev:
	cd apps/web && npm run dev
