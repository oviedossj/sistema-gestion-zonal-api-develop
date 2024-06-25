type HttpParams<T extends object> = T;

export interface IHttpClient {
  get<T extends object, K extends object>(url: string, params?: HttpParams<T>): Promise<K>;
  post<T extends object, K extends object>(url: string, params?: HttpParams<T>): Promise<K>;
}

export class ErrorHTTP extends Error {
  constructor(
    public status: number,
    message: string | { message: string }
  ) {
    const msg = typeof message === 'string' ? message : message.message;
    super(msg);
  }
}

export interface AddressData {
  direccionOriginal: string;   
  estandar: string;           
  altura: string;            
  x: string;                  
  y: string;                  
  cgm: string;                
}
