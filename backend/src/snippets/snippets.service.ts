import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import {SnippetMapper} from "./mappers/snippet.mapper";
import {ISnippet} from "./interfaces/snippet.interface";
import {MyFilterQuery} from "./interfaces/filter-query.interface";

@Injectable()
export class SnippetsService {
  constructor(
      @InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>
  ) {}

  async create(createSnippetDto: CreateSnippetDto): Promise<ISnippet> {
    const saved = await this.snippetModel.create(createSnippetDto);
    return SnippetMapper.toEntity(saved);
  }

  async findAll(params: { q?: string; tag?: string; page: number; limit: number }) {
    const { q, tag, page, limit } = params;
    const filter: MyFilterQuery<SnippetDocument> = {};


    if (tag) {
      filter.tags = tag;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.snippetModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.snippetModel.countDocuments(filter),
    ]);

    return {
      items: SnippetMapper.toEntityList(items),
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<ISnippet> {
    const snippet = await this.snippetModel.findById(id).exec();
    if (!snippet) throw new NotFoundException('Snippet not found');

    return SnippetMapper.toEntity(snippet);
  }

  async update(id: string, updateSnippetDto: UpdateSnippetDto): Promise<ISnippet> {
    const updated = await this.snippetModel
        .findByIdAndUpdate(id, updateSnippetDto, { new: true })
        .exec();
    if (!updated) throw new NotFoundException(`Snippet not found`);

    return SnippetMapper.toEntity(updated);
  }

  async remove(id: string) {
    const result = await this.snippetModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Snippet not found`);
    return { success: true };
  }
}