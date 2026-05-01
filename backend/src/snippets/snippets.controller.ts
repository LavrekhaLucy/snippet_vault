import {Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Query} from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import {ParseObjectIdPipe} from "../common/pipes/parse-object-id.pipe";

@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetsService.create(createSnippetDto);
  }


  @Get()
  findAll(
      @Query('q') q?: string,
      @Query('tag') tag?: string,
      @Query('page') page: string = '1',
      @Query('limit') limit: string = '10',
  ) {
    const p = Math.max(1, parseInt(page));
    const l = Math.max(1, parseInt(limit));

    return this.snippetsService.findAll({ q, tag, page: p, limit: l });
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.snippetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateSnippetDto: UpdateSnippetDto
  ) {
    return this.snippetsService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.snippetsService.remove(id);
  }
}
