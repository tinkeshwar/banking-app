export type Model<TModel> = TModel;

export interface PaginationMetaInterface {
  page: number;
  perPage: number;
  total: number;
}

export interface AlertMetaInterface {
  title: string;
  description: string;
  icon: string; 
  color: string;
  duration: number;
}