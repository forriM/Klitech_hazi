import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor() { }

  /**
   * Extracts the total number of items from a link header
   * @param header
   * @returns total number of data
   */
  getTotalDataFromHeader(header: string | null): number {

    if (header) {

      let queryString: string = ''
      let links = header.split(',')
      //iterate through the link-s
      links.map(link => {
        // remove > from end of url
        link = link.replace('>', '')
        //if the url points to the last page of data
        if (link.split(';')[1] === ' rel="last"') {
          queryString = link.split(';')[0].split('?')[1]
        }
      })
      const queryParams: Record<string, string> = {};
      if (queryString) {
        //split the query strings in to key value pairs
        const pairs = queryString.split('&'); 

        pairs.forEach(pair => {
          const [key, value] = pair.split('='); // Split each key-value pair
          queryParams[decodeURIComponent(key)] = decodeURIComponent(value); // Decode the key and value and add to queryParams
        });
        /**
         * if the page and pageSize params are present 
         * we calculate the total number of data by multipliing them
         * (it is not completely accurate but this is the best method based on the info the api gives)
         */
        if (queryParams['page'] && queryParams['pageSize']) {
          return +queryParams['page'] * +queryParams['pageSize']
        }
      }
    }
    return 0
  }
}
