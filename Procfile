release: ENV_SILENT=true cp .env.production .env 
release: ENV_SILENT=true node ace migration:run --force 
release: ENV_SILENT=true node ace seed --files='UserSeeder.js' --force 
web: ENV_SILENT=true npm start