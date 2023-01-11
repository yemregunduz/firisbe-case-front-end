import { BasePageableModel } from './base-pageable-model';
import { ResponseModel } from './response.model';

export interface ListResponseModel<T> extends ResponseModel {
    data: BasePageableModel<T>;
}
