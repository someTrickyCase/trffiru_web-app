"use client";

import { useState } from "react";
import useSWR from "swr";

import { ProductType } from "@/types/dataType";
import { cn } from "@/lib/utils";

import Sonner from "./Sonner";
import FeedCard from "../widgets/FeedCard";
import PaginationBar from "./PaginationBar";

const Feed = ({
    category,
    search,
    className,
}: {
    category?: string;
    search?: string;
    className?: string;
}) => {
    const [curPage, setCurPage] = useState(1);

    const { data, isLoading } = useSWR(`/root/products/${category}/page/${curPage}`, () => {
        // Fetching Category
        if (category) {
            return fetch(`/products/api`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ slug: `product-category/${category}/page/${curPage}` }),
            }).then((data) => data.json());
        }

        // Fetching user search request
        if (search) {
            return fetch(`/products/search/api`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ searchRequest: search, page: curPage }),
            }).then((data) => data.json());
        }
    });

    function setPage(pageSetTo: number) {
        setCurPage(pageSetTo);
        return;
    }

    return (
        <div
            className={cn(
                "grid grid-cols-1 min-h-screen pt-20 px-5 items-center justify-items-center ",
                className
            )}>
            <h2
                className={`text-2xl font-bold text-accent text-center ${
                    data ? "mb-8" : "absolute top-20"
                }`}>
                {category && category?.split("-").join(" ").toUpperCase()}
                {search && `Реультаты поиска по запросу "${decodeURI(search)}"`}
            </h2>
            {isLoading && <Sonner className='self-center justify-self-center' />}
            {data &&
                data.map((item: ProductType) => (
                    <FeedCard key={JSON.stringify(item)} item={item} />
                ))}
            <PaginationBar
                curPage={curPage}
                setPage={setPage}
                className={data ? "visible" : "hidden"}
            />
        </div>
    );
};

export default Feed;
