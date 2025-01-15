"use client";

import useSWR from "swr";
import Sonner from "../shared/Sonner";
import Image from "next/image";
import DescriptionTabs from "../widgets/DescriptionTabs";
import Counter from "../ui/Counter";

const ProductDescriptionCard = ({ searchedProduct }: { searchedProduct: string }) => {
    const { data, isLoading } = useSWR(`/root/products/product/${searchedProduct}`, () =>
        fetch(`/products/product/api`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug: searchedProduct }),
        }).then((data) => data.json())
    );

    return (
        <div className='mt-16 w-full flex justify-center min-h-[calc(100vh-4rem)]'>
            {isLoading && <Sonner className='self-center' />}
            {data && (
                <div className='w-full flex flex-col px-5 items-center gap-2'>
                    <div className='bg-background-secondary flex flex-col items-center gap-4 w-full md:w-[50%]  rounded-lg py-2'>
                        <div className='flex flex-col items-center'>
                            <h2 className='text-xl font-bold text-center'>{data.title}</h2>
                            <p className='text-sm font-light'>Артикул: {data.article}</p>
                        </div>
                        <div className='w-64 rounded-xl overflow-hidden'>
                            <Image width={320} height={320} src={data.image} alt={data.title} />
                        </div>
                        <div className='flex items-center flex-col w-full gap-2'>
                            <Counter item={data} className='w-[260px]' />
                            <p className='text-lg font-black text-accent'>{data.price}руб.</p>
                        </div>
                    </div>
                    <DescriptionTabs description={data.description} />
                </div>
            )}
        </div>
    );
};

export default ProductDescriptionCard;
