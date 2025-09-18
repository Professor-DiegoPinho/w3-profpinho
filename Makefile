# Makefile para simplificar comandos Docker

.PHONY: help build dev prod logs clean stop restart

# Comando padrão
help:
	@echo "Comandos disponíveis:"
	@echo "  build     - Build da imagem Docker"
	@echo "  dev       - Executa em modo desenvolvimento"
	@echo "  prod      - Executa em modo produção"
	@echo "  nginx     - Executa com Nginx (produção)"
	@echo "  logs      - Ver logs da aplicação"
	@echo "  clean     - Remove containers e volumes"
	@echo "  stop      - Para todos os containers"
	@echo "  restart   - Reinicia os containers"

# Build da imagem
build:
	docker-compose build --no-cache

# Desenvolvimento
dev:
	docker-compose -f docker-compose.dev.yml up --build

# Produção
prod:
	docker-compose up --build -d

# Produção com Nginx
nginx:
	docker-compose --profile with-nginx up --build -d

# Ver logs
logs:
	docker-compose logs -f

# Limpar containers e volumes
clean:
	docker-compose down -v --remove-orphans
	docker system prune -f

# Parar containers
stop:
	docker-compose down

# Reiniciar
restart:
	docker-compose restart

# Status dos containers
status:
	docker-compose ps