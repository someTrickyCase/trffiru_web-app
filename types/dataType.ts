export type ProductType = {
    title: string;
    images?: string[];
    description?: string;
    article: string;
    price: string;
    link: string;
    quantity?: number;
};

export type CategoryType = {
    count: number;
    description: string;
    display: string;
    id: number;
    image: string;
    menu_order: number;
    name: string;
    parent: number;
    slug: string;
    yoast_head: string;
    yoast_head_json: object;
    _links: object;
};

export type UserType = {
    name?: string;
    phone?: number;
    email?: string;
    note?: string;
    orderID?: number;
    bitrixID?: number;
};

export type RootPageCard = {
    image: string;
    logo: string;
    title: string;
    link: string;
};
