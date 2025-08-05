export interface HttpOptions {
  headers: { [key: string]: string };
  params: { [param: string]: string | number | boolean };
}
