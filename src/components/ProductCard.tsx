import type { Product } from "../types/product";
import "../scss/ProductCard.scss";

interface ProductCardProps {
  product: Product; 
}

function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="product-card">
      <img className="product-card__img" src={product.thumbnail} alt={product.title} />
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__description">{product.description}</p>
      <div className="product-card__price">
        <span className="product-card__old-price">${product.price}</span>
        <span className="product-card__new-price">${discountedPrice}</span>
      </div>
        <p className="product-card__stock">In stock: {product.stock}</p>
    </div>
  );
}

export default ProductCard;
