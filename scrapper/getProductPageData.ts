import * as cheerio from "cheerio";
import axios from "axios";
import { sliceHalfString } from "@/lib/utils";

async function getHTML(url: string) {
    const HTML = await axios.get(url);
    const $ = cheerio.load(HTML.data);
    return $;
}

export async function getProductPageData(url: string) {
    if (!url) return;

    const productPage = await getHTML(url);

    let productTitle: string = "";
    let productDescription: string = "";
    let productPrice: string = "";
    let productArticle: string = "";
    let productImage: string | undefined = "";

    productTitle = productPage("section").find("h1.post_title").text();
    productDescription = productPage("section").find(".post_content").text();
    productPrice = productPage("section")
        .find(".woocommerce-Price-amount")
        .children("bdi")
        .text()
        .split("₽")[0];
    productArticle = productPage("section").find("span.sku").text();
    productImage = productPage("section").find("img.wp-post-image").attr("src");

    return {
        title: sliceHalfString(productTitle),
        description: sliceHalfString(productDescription),
        article: sliceHalfString(productArticle),
        price: productPrice,
        image: productImage,
    };
}
