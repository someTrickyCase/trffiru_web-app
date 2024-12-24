import CategoryPage from "@/pages/CategoryPage";

const page = async (props: { params: Promise<{ "search-request": string }> }) => {
    const searchRequest = (await props.params)["search-request"];

    return <CategoryPage search={searchRequest} />;
};

export default page;
