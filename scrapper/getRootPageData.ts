import * as cheerio from "cheerio";
import axios from "axios";

async function getHTML(url: string) {
    const HTML = await axios.get(url);
    const $ = cheerio.load(HTML.data);
    return $;
}

export async function getRootPageData() {
    const categoriesPage = await getHTML("https://troffi.ru/");

    const vcmTitles: string[] = [];
    const vcmCategoryImgs: string[] = [];
    const vcmCategoryLogo: string[] = [];
    const vcmLinks: string[] = [];
    const vcms: { title: string; logo: string; image: string; link: string }[] = [];

    const pickupsTitles: string[] = [];
    const pickupsCategoryImgs: string[] = [];
    const pickupsCategoryLogo: string[] = [];
    const pickupsLinks: string[] = [];
    const pickups: { title: string; logo: string; image: string; link: string }[] = [];

    // ____VMC
    categoriesPage("section")
        .eq(2)
        .each((i, el) => {
            // ____LINK
            categoriesPage(el)
                .find("a")
                .each((i, el) => {
                    const link = categoriesPage(el).attr("href");
                    if (link) vcmLinks.push(link);
                });

            // ____IMAGE & LOGO IMAGE
            categoriesPage(el)
                .find("img")
                .each((i, el) => {
                    if (i % 2 !== 0) {
                        const categoryImg = categoriesPage(el).attr("src");
                        if (categoryImg) vcmCategoryImgs.push(categoryImg);
                    } else {
                        const categoryImg = categoriesPage(el).attr("src");
                        if (categoryImg) vcmCategoryLogo.push(categoryImg);
                    }
                });

            // ____TITLE
            categoriesPage(el)
                .find(".w-text-value")
                .each((i, el) => {
                    if (i === 0) return;
                    const title = categoriesPage(el).text();
                    vcmTitles.push(title);
                });

            for (let i = 0; i < vcmTitles.length; i++) {
                const vcm = {
                    title: vcmTitles[i],
                    logo: vcmCategoryLogo[i],
                    image: vcmCategoryImgs[i],
                    link: vcmLinks[i],
                };
                if (vcm) vcms.push(vcm);
            }
        });

    // ________ PICKUPS
    categoriesPage("section")
        .eq(3)
        .each((i, el) => {
            // ____LINK
            categoriesPage(el)
                .find("a")
                .each((i, el) => {
                    const link = categoriesPage(el).attr("href");
                    if (link) pickupsLinks.push(link);
                });

            // ____IMAGE & LOGO IMAGE
            categoriesPage(el)
                .find("img")
                .each((i, el) => {
                    if (i % 2 !== 0) {
                        const categoryImg = categoriesPage(el).attr("src");
                        if (categoryImg) pickupsCategoryImgs.push(categoryImg);
                    } else {
                        const categoryImg = categoriesPage(el).attr("src");
                        if (categoryImg) pickupsCategoryLogo.push(categoryImg);
                    }
                });

            // ____TITLE
            categoriesPage(el)
                .find(".w-text-value")
                .each((i, el) => {
                    if (i === 0) return;
                    const title = categoriesPage(el).text();
                    pickupsTitles.push(title);
                });

            for (let i = 0; i < pickupsTitles.length; i++) {
                const pickup = {
                    title: pickupsTitles[i],
                    logo: pickupsCategoryLogo[i],
                    image: pickupsCategoryImgs[i],
                    link: pickupsLinks[i],
                };
                pickups.push(pickup);
            }
        });

    return { vcms, pickups };
}
