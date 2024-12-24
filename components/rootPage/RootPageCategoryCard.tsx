import { RootPageCard } from "@/types/dataType";
import React from "react";

import Image from "next/image";
import Link from "next/link";

const RootPageCategoryCard = ({ cardData }: { cardData: RootPageCard }) => {
    const { title, link, image, logo } = cardData;

    return (
        <Link
            href={`/products${link.split("product-category")[1].toString()}`}
            className='w-40 py-3 rounded-2xl text-center items-center flex flex-col gap-2 bg-background-secondary w-'>
            <div className='h-24 w-32 flex items-center justify-center overflow-hidden'>
                <Image width={320} height={240} src={image} alt={title} />
                <div className='absolute py-[5px] backdrop-blur-[1px] w-32 h-[5.5rem] flex items-center justify-center rounded-tl-xl rounded-br-2xl'>
                    <Image width={70} height={60} src={logo} alt={logo} />
                </div>
            </div>
            <h2 className='font-extrabold text-xl leading-5 text-accent'>{title}</h2>
        </Link>
    );
};

export default RootPageCategoryCard;
