import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { WidgetsResponse } from './responses/widgets.response'
import { WidgetFilter } from './filters/widget.filter';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('reports')
export class ReportsController {
  
  constructor(
    private readonly reportsService: ReportsService
    ) {}

  @Get('widgets')
  async widgets(@Query() query: WidgetFilter): Promise<ReportResponse|HttpException> {
    return await this.reportsService.widgets(query);
  }
}
