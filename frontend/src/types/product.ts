export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  imageUrl?: string;
  rating: number;
}

export interface ProductCardProps {
  product: Product;
  onShowDetails: (id: string) => void;
}
