import {SnippetTypeEnum} from "@/src/types/enums/snippet-type.enum";


export interface ISnippet {
    id: string;
    title: string;
    content: string;
    tags: string[];
    type: SnippetTypeEnum;
    createdAt: Date;
    updatedAt: Date;
}

