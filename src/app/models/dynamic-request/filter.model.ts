export interface FilterModel{
    field:string,
    operator:string,
    value?:string,
    logic?:string,
    filters?: FilterModel[]
}