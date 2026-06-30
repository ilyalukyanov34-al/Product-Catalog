import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../api/products";
import type { Product } from "../types/product";
import "../scss/ProductPage.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        if (!id) {
          return;
        }
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Не удалось загрузить товар");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="product-page">
      <Link to="/" className="product-page__back-link">
        ← To the products
      </Link>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="product-page__swiper"
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={product.title} />
          </SwiperSlide>
        ))}
      </Swiper>
      <h2 className="product-page__title">{product.title}</h2>
      <p className="product-page__description">{product.description}</p>
      <div className="product-page__price">
        <span className="product-page__old-price">${product.price}</span>
        <span className="product-page__new-price">${discountedPrice}</span>
      </div>
      <p className="product-page__stock">In stock: {product.stock}</p>
    </div>
  );
}

export default ProductPage;
