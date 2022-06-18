import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/uzer/decorators/get-user.decorator';
import { ReportsService } from './reports.service';
import { CreateReportsdto } from './dtos/create-reports.dto';
import { EditReportsdto } from './dtos/edit-report.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) {}

    @Get()
    getReports(@GetUser('id') userId: number) {
        return this.reportService.getReports(userId);
    }

    @Get(':id')
    getReportsById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) ReportId: number) {
        return this.reportService.getReportsById(userId, ReportId)
    }

    @Post('create')
    createReport(@GetUser('id') userId: number, @Body() dto: CreateReportsdto) {
        return this.reportService.createReport(userId, dto);
    }

    @Patch(':id')
    editReport(@GetUser('id') userId: number, ReportId: number, @Body() dto: EditReportsdto) {
        console.log(userId);
        console.log(dto);
        return this.reportService.editReport(userId, ReportId , dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteReport(@GetUser('id') userId: number, @Param('id', ParseIntPipe) ReportId: number) {
        return this.reportService.deleteReport(userId, ReportId)
    }
}
