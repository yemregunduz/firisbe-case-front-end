/**
    * Should use for pagination. If this model is not used in listing operations, all data will be listed in a single page.
*/
export interface ListRequestParameter { 
    /**
     * What page are you on (it starts from 0)
    **/
    page: number;
    /**
     * Number of items to be displayed on one page.
     */
    pageSize: number;
}