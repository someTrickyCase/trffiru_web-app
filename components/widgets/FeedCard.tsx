import { ProductType } from "@/types/dataType";
import { getRanKey } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import Counter from "../ui/Counter";

const FeedCard = ({ item }: { item: ProductType }) => {
    const { price, title, description, article, link, images } = item;

    return (
        <div className='justify-self-center w-[300px] flex flex-col gap-[10px] mb-[20px] bg-[#fff]/[0.03] py-[40px] px-[20px] rounded-2xl'>
            <div className='flex justify-between'>
                <div className='relative rounded-xl w-[100px] h-[100px] overflow-x-scroll flex snap-x '>
                    <div className='relative rounded-xl w-[100px] h-[100px] overflow-x-scroll flex snap-x '>
                        <div className='h-full w-[10px] bg-orange absolute' />

                        {images ? (
                            (images as string[])?.map((image) => (
                                <Image
                                    key={getRanKey()}
                                    className='snap-always snap-start'
                                    src={image}
                                    alt={title}
                                    width={150}
                                    height={50}
                                />
                            ))
                        ) : (
                            <Image
                                key={getRanKey()}
                                className='snap-always snap-start'
                                src={"/image-placeholder.jpg"}
                                alt={title}
                                width={150}
                                height={50}
                            />
                        )}
                    </div>
                    <div className='h-full w-[10px] bg-orange absolute' />
                </div>
                <div className='text-sm font-light flex flex-col justify-between'>
                    <div>
                        <p>Артикул:</p>
                        <p>{article}</p>
                    </div>
                    <p className='text-orange text-2xl font-black text-accent'>{price} руб</p>
                </div>
            </div>
            <h2 className='text-xl font-bold h-[3.5rem] overflow-hidden'>{title}</h2>
            <div className='text-sm h-[3.9rem] font-light overflow-y-scroll'>{description}</div>

            <Link
                href={"/products/" + link.split("troffi.ru")[1].toString()}
                className='button text-accent'>
                Подробнее
            </Link>

            <div className='flex justify-between gap-[10px]'>
                <Counter item={item} />
            </div>
        </div>
    );
};

export default FeedCard;
