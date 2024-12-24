import { getProductPageData } from "@/scrapper/getProductPageData";

export async function POST(request: Request) {
    const { slug } = await request.json();

    const data = await getProductPageData(`https://troffi.ru/product/${slug}`);

    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json",
        },
        status: 200,
    });
}
