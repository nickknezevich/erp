import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  
  constructor(
    private readonly reportsService: ReportsService
    ) {}

  @Get('widgets')
  async widgets(): Promise<any> {
    return await this.reportsService.widgets();
  }
}
