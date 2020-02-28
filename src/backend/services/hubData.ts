import request from 'request';

export class Hub {
  _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;

  }

  public async getData(queryString: string): Promise<any | Error> {
    const url = `${this._baseUrl}${queryString}`;
    console.log(url);
    return new Promise((resolve, reject) => {
      request(url, { json: true}, (err, res, body) => {
        if (err) {
          console.log(`Query error: ${err.message}`);
          resolve(err);
        } else {
          // console.log(res);
          resolve(body);
        }
      });
    });
  }
}
