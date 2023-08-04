# mini-erp
Mini and rather simplified ERP api which should administer customers, products, inventories, warehoses

## Instalation

```bash
docker-compose build
```

```bash
docker-compose up -d
```

```bash
docker-compose exec -it erp.server bash
```

```bash
npx prisma generate
```

```bash
npx prisma migrate dev
```

```bash
npx prisma db seed
```

To seed the initial dev data.

![Screenshot](erp_schema.png)

Backend will run on http://localhost:3010
