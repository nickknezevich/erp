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


## Available API Endpoints

```
/api/auth/register, POST
```

```
/api/auth/login, POST
```

```
/api/auth/profile, GET
```

```/api/users, GET```

```/api/customers, POST```
```/api/customers/:id, GET```
```/api/customers, GET```
```/api/customers/:id, PATCH```
```/api/customers/:id, DELETE```
```/api/suppliers, POST```
```/api/suppliers/:id, GET```
```/api/suppliers, GET```
```/api/suppliers/:id, PATCH```
```/api/suppliers/:id, DELETE```
```/api/warehouses, POST```
