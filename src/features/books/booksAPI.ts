import { BookList } from '../../app/type';

const APIKEY = 'AIzaSyBkfIdu4QIVCvZ3OhtjuJ_ao_1QrtVpFs4';
const URL = 'https://www.googleapis.com/books/v1/volumes';

export type FetchParams = {
  searchValue: string;
  startIndex: number;
  category?: string;
  orderBy?: string;
}

// subject : возвращает результаты, в которых текст, следующий за этим ключевым словом, указан в списке категорий тома.

//Вы можете изменить порядок, установив для параметра orderBy одно из следующих значений:
//     relevance — возвращает результаты в порядке релевантности условий поиска (по умолчанию).
//     newest — возвращает результаты в порядке от самых последних до наименее недавно опубликованных.

export async function fetchThirtyBooks(fetchParams: FetchParams): Promise<BookList | undefined> {
  const { searchValue, startIndex, category, orderBy } = fetchParams;
  let URLMainQuery = category? (URL + `?q=${searchValue}+subject:${category}`) : (URL + `?q=${searchValue}`);
  let URLMainQueryOrdered = orderBy? (URLMainQuery + `&orderBy=${orderBy}`) : (URLMainQuery);

  let URLhWithParams = URLMainQueryOrdered + `&startIndex=${startIndex}` + `&maxResults=30` + `&key=${APIKEY}`;

  let response = await fetch(URLhWithParams, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if (response.ok) {
    let result = await response.json();
    return result;

  } else {
    console.log(response);
  }
}