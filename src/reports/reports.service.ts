import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportsdto } from './dtos/create-reports.dto';
import { EditReportsdto } from './dtos/edit-report.dto';
import { User } from '@prisma/client';

@Injectable()
export class ReportsService {

    constructor(private prisma: PrismaService) {}
    
    getReports(userId: number) {
        return this.prisma.reports.findMany({
            where: {
                userId
            },
        });
    }

    
    getReportsById(userId: number, reportId: number) {
        return this.prisma.reports.findFirst({
            where: {
                id: reportId,
                userId
            }
        });
    }

    
    async createReport(userId: number, dto: CreateReportsdto) {
        const report = await this.prisma.reports.create({
            data: {
                userId,
                ...dto   
            },
        });

        return report;
    }

    
    async editReport(userId: number, reportId: number, dto: EditReportsdto) {
         const report = await this.prisma.reports.findUnique({
             where: {
                id: reportId
             }
         });
         if (!report || report.userId !== userId) {
             throw new ForbiddenException('Access to report denied');
         }

         return this.prisma.reports.update({
             where: {
                 id: reportId
            },
             data: {
                 ...dto
             }
         });
    }

    
    async deleteReport(userId: number, reportId: number) {
        const report = await this.prisma.reports.findUnique({
            where: {
                id: reportId
            }
            });
            if (!report || report.userId !== userId) {
                throw new ForbiddenException('Access to report denied');
            }

            await this.prisma.reports.delete({
                where: {
                    id: reportId
                }
            })
        }
}
