import ProductPage from "@/pages/ProductPage";

const page = async (props: { params: Promise<{ "product-slug": string }> }) => {
    const searchedProduct = (await props.params)["product-slug"];

    return <ProductPage searchedProduct={searchedProduct} />;
};

export default page;
