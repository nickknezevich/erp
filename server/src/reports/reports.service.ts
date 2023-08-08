import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { Prisma, Supplier } from '@prisma/client';
import { WidgetsResponse } from './responses/widgets.response'
import { WidgetFilter } from './filters/widget.filter';


@Injectable()
export class ReportsService {

  constructor(
    private prisma: PrismaService
  ) { }


  async widgets(filter: WidgetFilter): Promise<WidgetsResponse[]|HttpException> {

    try {
      let sql = `select
      p.id as pid,
      p.name as product_name,
      p2.name as customer_name,
      c.name,
      p.price,
      s.name as supplier_name,
      i.cost,
      w.name as warehouse_name,
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
      pc.customer_id = c.id WHERE 1<2`

      if (filter.customer_id !== undefined) {
        sql = sql.concat(" ", `AND c.id=${filter.customer_id}`)
      }

      if (filter.supplier_id !== undefined) {
        sql = sql.concat(" ", `AND s.id=${filter.supplier_id}`)
      }

      if (filter.product_id !== undefined) {
        sql = sql.concat(" ", `AND p.id=${filter.product_id}`)
      }

      if (filter.warehouse_id !== undefined) {
        sql = sql.concat(" ", `AND w.id=${filter.warehouse_id}`)
      }
      const result = await this.prisma.$queryRaw<WidgetsResponse[]>(
        Prisma.raw(sql)
      )
      return result;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
        }
      }
      throw new HttpException("There was a problem with retrieving report.", HttpStatus.INTERNAL_SERVER_ERROR)
    }


  }


}
