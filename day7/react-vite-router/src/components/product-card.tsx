
import { Link } from "@tanstack/react-router";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export function ProductCard(props: ProductCardProps) {
  return (
    <div className="bg-gray-50 p-4 border border-gray-200">
      <div className="text-lg font-medium">{props.title}</div>
      <div className="text-xs">{props.description}</div>
      <img src={props.image} alt={props.title} />
      <div className="font-bold">{props.price}</div>
      <Link to="/products/$id" params={{ id: String(props.id) }}>View Details</Link>
    </div>
  );
}