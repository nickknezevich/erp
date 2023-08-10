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


  async widgets(filter: WidgetFilter): Promise<ReportResponse | HttpException> {
    try {
      let sql = `SELECT
            p.id as pid,
            p.name as product_name,
            p2.name as package_name,
            c.name as customer_name,
            p.price,
            s.name as supplier_name,
            i.cost,
            w.name as warehouse_name,
            i.qty,
            i.min_qty
        FROM
            products p
        INNER JOIN products_packages pp ON p.id = pp.product_id
        INNER JOIN packages p2 ON p2.id = pp.package_id
        INNER JOIN products_suppliers ps ON ps.product_id = p.id
        INNER JOIN suppliers s ON s.id = ps.supplier_id 
        INNER JOIN inventories i ON i.product_id = p.id
        INNER JOIN warehouses w ON w.id = i.warehouse_id
        INNER JOIN products_customer pc ON pc.product_id = p.id
        INNER JOIN customers c ON pc.customer_id = c.id
        WHERE 1 < 2`;

      if (filter.customer_id !== undefined) {
        sql = sql.concat(" ", `AND c.id=${filter.customer_id}`);
      }

      if (filter.supplier_id !== undefined) {
        sql = sql.concat(" ", `AND s.id=${filter.supplier_id}`);
      }

      if (filter.product_id !== undefined) {
        sql = sql.concat(" ", `AND p.id=${filter.product_id}`);
      }

      if (filter.warehouse_id !== undefined) {
        sql = sql.concat(" ", `AND w.id=${filter.warehouse_id}`);
      }

      if(filter.page) {
        filter.page = Number(filter.page);
      }

      const resultWithoutPagination = await this.prisma.$queryRaw<WidgetsResponse[]>(Prisma.raw(sql));

      if (filter.page === undefined || filter.page === null || filter.page === 1) {
        const offset = 0;
        const limit = filter.num_per_page ?? 10;
        sql = sql.concat(" ", `LIMIT ${limit} OFFSET ${offset}`);
      }

      const totalPages = Math.floor(resultWithoutPagination.length / filter.num_per_page);

      if (filter.page > 1) {
        // Calculate OFFSET and LIMIT based on pagination parameters
        const offset = (filter.page-1) * filter.num_per_page;
        const limit = filter.num_per_page;
        sql = sql.concat(" ", `LIMIT ${limit} OFFSET ${offset}`);
      }

      const result = await this.prisma.$queryRaw<WidgetsResponse[]>(Prisma.raw(sql));

      console.log(sql)

      return {
        report_data: result,
        pagination: {
          total: resultWithoutPagination.length,
          page: filter.page ?? 1,
          total_pages: totalPages
        }
      };
    } catch (e) {
      throw new HttpException(
        "There was a problem with retrieving report.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }



}
