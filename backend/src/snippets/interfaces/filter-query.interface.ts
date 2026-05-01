export type MyFilterQuery<T> = {
    [P in keyof T]?: T[P] | { $regex: string; $options: string } | any;
} & {
    $or?: Array<MyFilterQuery<T>>;
    $and?: Array<MyFilterQuery<T>>;
};
