import { SnippetDocument } from '../schemas/snippet.schema';
import { ISnippet} from '../interfaces/snippet.interface';
import {SnippetType} from "../enums/snippet-type.enum";

export class SnippetMapper {
    static toEntity(doc: SnippetDocument): ISnippet {
        return {
            id: doc._id.toString(),
            title: doc.title,
            content: doc.content,
            tags: doc.tags,
            type: doc.type as SnippetType,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }

    static toEntityList(docs: SnippetDocument[]): ISnippet[] {
        return docs.map((doc) => this.toEntity(doc));
    }
}