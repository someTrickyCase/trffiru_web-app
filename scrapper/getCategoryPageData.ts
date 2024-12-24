import * as cheerio from "cheerio";
import axios from "axios";

async function getHTML(url: string) {
    const HTML = await axios.get(url);
    const $ = cheerio.load(HTML.data);
    return $;
}

export async function getCategoryPageData(url: string) {
    if (!url) return;

    const categoryPage = await getHTML(url);

    // Products List
    const productsTitles: string[] = [];
    const productsImages: (string | undefined)[][] = [];
    const productsPrice: string[] = [];
    const productsArticle: (string | undefined)[] = [];
    const productsLink: (string | undefined)[] = [];
    const productDescription: string[] = [];

    //  Titles and Links
    categoryPage("div.w-grid-list")
        .find("h3.post_title")
        .each((i, el) => {
            productsTitles.push(categoryPage(el).text());
            productsLink.push(categoryPage(el).find("a").attr("href"));
        });

    // Descriptions
    categoryPage("div.w-grid-list")
        .find("div.w-post-elm.post_content.usg_post_content_1")
        .each((i, el) => {
            productDescription.push(categoryPage(el).find("p").text());
        });

    // Prices
    categoryPage("div.w-grid-list")
        .find("span.woocommerce-Price-amount")
        .each((i, el) => {
            productsPrice.push(categoryPage(el).find("bdi").text().split("₽")[0]);
        });

    // Articles
    categoryPage("div.w-grid-list")
        .find("span.sku")
        .each((i, el) => {
            productsArticle.push(categoryPage(el).text());
        });

    // Images
    categoryPage("div.w-post-elm.post_image").each((i, el) => {
        const arr: (string | undefined)[] = [];
        categoryPage(el)
            .find("img.attachment-full")
            .each((i, el) => {
                arr.push(categoryPage(el).attr("src"));
            });
        productsImages.push(arr);
    });

    const products = [];
    for (let i = 0; i < productsTitles.length / 2; i++) {
        products.push({
            title: productsTitles[i],
            images: productsImages[i],
            description: productDescription[i],
            article: productsArticle[i],
            price: productsPrice[i],
            link: productsLink[i],
        });
    }

    return products;
}
