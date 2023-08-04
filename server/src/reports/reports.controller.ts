import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { WidgetsResponse } from './responses/widgets.response'
import { WidgetFilter } from './filters/widget.filter';

@Controller('reports')
export class ReportsController {
  
  constructor(
    private readonly reportsService: ReportsService
    ) {}

  @Get('widgets')
  async widgets(@Query() query: WidgetFilter): Promise<WidgetsResponse[]|HttpException> {
    return await this.reportsService.widgets(query);
  }
}
