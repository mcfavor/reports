import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReportsdto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    link: string;
}