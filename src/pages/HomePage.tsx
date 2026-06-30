import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../scss/Pagination.scss";
import "../scss/HomePage.scss";
import SortSelect from "../components/SortSelect";

import * as ReactPaginateModule from "react-paginate";
function unwrapDefault(mod: any) {
  while (mod && typeof mod === "object" && "default" in mod) {
    mod = mod.default;
  }
  return mod;
}
const ReactPaginate = unwrapDefault(ReactPaginateModule);

function HomePage() {
  const { products, total, page, loading, error, fetchProducts, setPage } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-page container">
      <SortSelect />
      <div className="product-list">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card-link"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

      <ReactPaginate
        pageCount={Math.ceil(total / 12)}
        onPageChange={(event: { selected: number }) =>
          setPage(event.selected + 1)
        }
        forcePage={page - 1}
        containerClassName="pagination"
        activeClassName="pagination__active"
      />
    </div>
  );
}

export default HomePage;
