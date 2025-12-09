export interface ProductsResponse {
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;        // ISO date string
  handle: string;
  updated_at: string;        // ISO date string
  published_at: string;      // ISO date string
  template_suffix: string;
  published_scope: string;
  tags: string;
  status: string;
  admin_graphql_api_id: string;
  variants: Variant[];
  options: ProductOption[];
  images: ProductImage[];
  image: ProductImage;
}

export interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: string;                 // viene como string: "799.00"
  position: number;
  inventory_policy: string;
  compare_at_price: string | null;
  option1: string;
  option2: string | null;
  option3: string | null;
  created_at: string;            // ISO date string
  updated_at: string;            // ISO date string
  taxable: boolean;
  barcode: string;
  fulfillment_service: string;
  grams: number;
  inventory_management: string;
  requires_shipping: boolean;
  sku: string;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  admin_graphql_api_id: string;
  image_id: number | null;
}

export interface ProductOption {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface ProductImage {
  id: number;
  alt: string | null;
  position: number;
  product_id: number;
  created_at: string;            // ISO date string
  updated_at: string;            // ISO date string
  admin_graphql_api_id: string;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
}
