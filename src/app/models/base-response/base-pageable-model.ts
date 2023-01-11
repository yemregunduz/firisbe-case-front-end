export interface BasePageableModel<T>{
    index:number,
    size:number,
    count:number,
    pages:number,
    hasPrevious:number,
    hasNext:number,
    items: T[]
}