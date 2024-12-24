import CategoryPage from "@/pages/CategoryPage";

const page = async (props: { params: Promise<{ category: string }> }) => {
    const searchedCategory = (await props.params).category.split("%20").join("-").toLowerCase();

    return <CategoryPage category={searchedCategory} />;
};

export default page;
