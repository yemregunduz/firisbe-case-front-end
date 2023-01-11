import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ListResponseModel } from '../models/base-response/list-response.model';
import { CategoryModel } from '../models/categories/category.model';
import { CreateCategoryModel } from '../models/categories/create-category.model';
import { DynamicRequestModel } from '../models/dynamic-request/dynamic-request.model';
import { ListRequestParameter } from '../models/list-request-parameter.model';
import { CustomHttpClientService } from '../shared/services/custom-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: CustomHttpClientService) {}
  /**
   * @param listRequestParameter If the ListRequestParameter parameter is not used when calling this function, the function will return all records
   * @returns ListResponseModel<CategoryModel>
   */
  async getList(
    listRequestParameter?: ListRequestParameter,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse: HttpErrorResponse) => void
  ) {
    const result = this.httpClient.get<ListResponseModel<CategoryModel>>({
      controllerName: 'categories',
      action: 'get-category-list',
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
  async create(
    createCategoryModel: CreateCategoryModel,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse: HttpErrorResponse) => void
  ) {
    const result = this.httpClient.post(
      {
        controllerName: 'categories',
        action: 'create',
      },
      createCategoryModel
    );

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
      const result = this.httpClient.post<ListResponseModel<CategoryModel>>(
        {
          controllerName: 'categories',
          action: 'get-category-list-by-dynamic-query',
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
}
