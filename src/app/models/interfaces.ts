export interface Banner {
  id: number;
  href: string;
  src: string;
  group: {
    id: number;
    name: string;
  };
}

export interface Group {
  id: number;
  name: string;
  href: string;
  options: Option[];
  images: Image[];
  products: Product[];
}

export interface Option {
  name: string;
  href: string;
  id?: string;
  value?: string;
  selected?: boolean;
  group?: {
    id: number;
    name: string;
    url: string;
  };
} 

export interface Image {
  src: string;
  href: string;
  alt: string;
  group: {
    id: number;
    name: string;
    url: string;
  };
}

export interface Product {
  id: number;
  name: string;
  price: number;
  images?: string;
  quantity: number;
  group?: {
    id: number;
    name: string;
    url: string;
  };
}

export interface PaginationResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; 
  first: boolean;
  last: boolean;
  empty: boolean;
}