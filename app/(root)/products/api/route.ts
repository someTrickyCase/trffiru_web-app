import { getCategoryPageData } from "@/scrapper/getCategoryPageData";

export async function POST(request: Request) {
    const { slug } = await request.json();
    const data = await getCategoryPageData(`https://troffi.ru/product-category/${slug}`);

    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json",
        },
        status: 200,
    });
}
