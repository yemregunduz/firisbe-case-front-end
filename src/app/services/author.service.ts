import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthorModel } from '../models/authors/author.model';
import { CreateAuthorModel } from '../models/authors/create-author.model';
import { ListResponseModel } from '../models/base-response/list-response.model';
import { SingleResponseModel } from '../models/base-response/single-response.model';
import { DynamicRequestModel } from '../models/dynamic-request/dynamic-request.model';
import { ListRequestParameter } from '../models/list-request-parameter.model';
import { CustomHttpClientService } from '../shared/services/custom-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private httpClient: CustomHttpClientService) {}
  /**
   * @param listRequestParameter If the ListRequestParameter parameter is not used when calling this function, the function will return all records
   * @returns ListResponseModel<AuthorModel>
   */
  async getList(
    listRequestParameter?: ListRequestParameter,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse: HttpErrorResponse) => void
  ) {
    const result = this.httpClient.get<ListResponseModel<AuthorModel>>({
      controllerName: 'authors',
      action: 'get-author-list',
      queryString: `${
        listRequestParameter
          ? `pageSize=${listRequestParameter.pageSize}&page=${listRequestParameter.page}`
          : ''
      }`,
    });

    const promiseData = firstValueFrom(result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => {
        errorCallBack ? errorCallBack(err) : null;
      });
    return await promiseData;
  }
  /**
   * 
   * @param listRequestParameter If the ListRequestParameter parameter is not used when calling this function, the function will return without pagination
   * @param dynamicRequestModel If the DynamicRequestModel parameter is not used when calling this function, the function will return all records
   * @returns ListResponseModel<Book>
   */
  async getListByDynamicQuery(
    listRequestParameter?: ListRequestParameter,
    dynamicRequestModel?: DynamicRequestModel,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse: HttpErrorResponse) => void
  ) {
    const result = this.httpClient.post<ListResponseModel<AuthorModel>>(
      {
        controllerName: 'authors',
        action: 'get-author-list-by-dynamic-query',
        queryString: `${
          listRequestParameter
            ? `pageSize=${listRequestParameter.pageSize}&page=${listRequestParameter.page}`
            : ''
        }`,
      },
      dynamicRequestModel ?? {}
    )
    const promiseData = firstValueFrom(result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => {
        errorCallBack ? errorCallBack(err) : null;
      });
    return await promiseData;
  }
  async create(
    createAuthorModel: CreateAuthorModel,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse: HttpErrorResponse) => void
  ) {
    const result = this.httpClient.post<SingleResponseModel<AuthorModel>>({
      controllerName:'authors',
      action:'create'
    },createAuthorModel)
    const promiseData = firstValueFrom(result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => {
        errorCallBack ? errorCallBack(err) : null;
      });
    return await promiseData;
  }
}
