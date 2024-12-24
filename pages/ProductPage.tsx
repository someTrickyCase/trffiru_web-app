import ProductDescriptionCard from "@/components/productPage/ProductDescriptionCard";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

const ProductPage = ({ searchedProduct }: { searchedProduct: string }) => {
    return (
        <main>
            <section className='min-h-screen'>
                <Header navigateBack />
                <ProductDescriptionCard searchedProduct={searchedProduct} />
            </section>
            <Footer />
        </main>
    );
};

export default ProductPage;
