import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ListResponseModel } from '../models/base-response/list-response.model';
import { SingleResponseModel } from '../models/base-response/single-response.model';
import { BookModel } from '../models/books/book.model';
import { CreateBookModel } from '../models/books/create-book.model';
import { DynamicRequestModel } from '../models/dynamic-request/dynamic-request.model';
import { ListRequestParameter } from '../models/list-request-parameter.model';
import { CustomHttpClientService } from '../shared/services/custom-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: CustomHttpClientService) {}
  /**
   * @param listRequestParameter If the ListRequestParameter parameter is not used when calling this function, the function will return all records
   * @returns ListResponseModel<BookModel>
   */
  async getList(
    listRequestParameter?: ListRequestParameter,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse: HttpErrorResponse) => void
  ) {
    const result = this.httpClient.get<ListResponseModel<BookModel>>({
      controllerName: 'books',
      action: 'get-book-list',
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
    const result = this.httpClient.post<ListResponseModel<BookModel>>(
      {
        controllerName: 'books',
        action: 'get-book-list-by-dynamic-query',
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
    createBookModel: CreateBookModel,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse: HttpErrorResponse) => void
  ) {
    const result = this.httpClient.post<SingleResponseModel<BookModel>>({
      controllerName:'books',
      action:'create'
    },createBookModel)
    const promiseData = firstValueFrom(result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => {
        errorCallBack ? errorCallBack(err) : null;
      });
    return await promiseData;
  }
}
