import { getRootPageData } from "@/scrapper/getRootPageData";

export async function GET() {
    const data = await getRootPageData();
    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json",
        },
        status: 200,
    });
}
