import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { Supplier } from '@prisma/client';

@Injectable()
export class ReportsService {

  constructor(
    private prisma: PrismaService
  ) { }


  async widgets(): Promise<any> {
    const result = await this.prisma.$queryRaw`
                select
              p.id as pid,
              p.name as product_name,
              p2.name,
              c.name,
              p.price,
              s.name as supplier_name,
              i.cost,
              w.name,
              i.qty ,
              i.min_qty
            from
              products p
            inner join products_packages pp on
              p.id = pp.product_id
            inner join packages p2 on
              p2.id = pp.package_id
            inner join products_suppliers ps on
              ps.product_id = p.id
            inner join suppliers s on
              s.id = ps.supplier_id 
            inner join inventories i on
              i.product_id = p.id
            inner join warehouses w on
              w.id = i.warehouse_id
            inner join products_customer pc on
              pc.product_id = p.id
            inner join customers c on
              pc.customer_id = c.id
              where 1 < 2`;
    
    return result;
  }

  
}
