import {SnippetType} from "../enums/snippet-type.enum";

export interface ISnippet {
    id: string;
    title: string;
    content: string;
    tags: string[];
    type: SnippetType;
    createdAt: Date;
    updatedAt: Date;
}

