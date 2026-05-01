import { IsString, IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import {SnippetType} from "../enums/snippet-type.enum";



export class CreateSnippetDto {
    @IsString()
    @IsNotEmpty({ message: 'Title cannot be empty.' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Content cannot be empty.' })
    content: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags: string[] = [];

    @IsEnum(SnippetType, { message: 'Type must be: link, note or com' })
    type: SnippetType;
}
