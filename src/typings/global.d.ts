export declare type IconNamesType = Record<string, string>
export declare type RoutesReferenceType = Record<string, RouteName>

 declare module 'axios' {
  interface AxiosResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: AxiosResponseHeaders;
    config: AxiosRequestConfig<D>;
    request?: any;
    links: Record<string, string>;
  }
}
