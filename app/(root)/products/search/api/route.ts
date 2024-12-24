import { getCategoryPageData } from "@/scrapper/getCategoryPageData";

export async function POST(request: Request) {
    const { searchRequest, page } = await request.json();

    const data = await getCategoryPageData(
        `https://troffi.ru/page/${page}/?s=${searchRequest}&post_type=product`
    );

    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json",
        },
        status: 200,
    });
}
