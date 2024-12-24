import Feed from "@/components/shared/Feed";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

const CategoryPage = ({ category, search }: { category?: string; search?: string }) => {
    return (
        <main>
            <Header />
            {category && <Feed category={category} />}
            {search && <Feed search={search} />}
            <Footer />
        </main>
    );
};

export default CategoryPage;
