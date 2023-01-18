import Layout from "@/components/Layout/Layout";
import ProductItem from "@/components/ProductItem/ProductItem";
import data from "../utils/data";

export default function Home() {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.productsList.map((products) => (
          <ProductItem product={products} key={products.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  );
}
