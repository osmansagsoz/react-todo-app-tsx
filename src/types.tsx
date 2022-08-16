export interface TagType {
    id: number;
    name: string;
}

export interface TodoType {
    completed: boolean;
    id: number;
    priority: string;
    tagId: number;
    time: string | number;
    title: string;
}

export type IAppState = "There was an error!" | "Loading" | "There are no tags!" | "There are no todos!" | "Tags data loaded!"