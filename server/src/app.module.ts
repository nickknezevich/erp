import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiResponseInterceptor } from './interceptors/api-response.interceptor';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { CustomersModule } from './customers/customers.module';
import { SupliersModule } from './supliers/supliers.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { PackagesModule } from './packages/packages.module';
import { InventoriesModule } from './inventories/inventories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, UsersModule, CustomersModule, SupliersModule, WarehousesModule, PackagesModule, ProductsModule, InventoriesModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
  ],
})
export class AppModule {}
