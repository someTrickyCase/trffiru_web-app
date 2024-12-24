import { ProductType } from "@/types/dataType";
import CartCounter from "../ui/CartCounter";
import Image from "next/image";
import { getRanKey } from "@/lib/utils";

const CartCard = ({
    item,
    deleteHandler,
}: {
    item: ProductType;
    deleteHandler: (item: ProductType) => void;
}) => {
    const { price, title, images, quantity } = item;

    function onDelete() {
        deleteHandler(item);
    }

    return (
        <div className='flex flex-col w-[300px] gap-[10px] mb-[10px] bg-background-secondary py-[10px] px-[20px] rounded-2xl justify-self-center'>
            <div className='flex gap-[12px] justify-between'>
                <div className='relative rounded-xl overflow-x-scroll flex snap-x '>
                    <div className='h-full w-[10px] bg-accent absolute' />
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

                <h2 className='text-sm font-bold w-[200px]'>{title}</h2>
            </div>
            <div className=' text-sm font-light flex justify-between items-center px-[10px]'>
                <p className='text-orange text-xl font-black '>
                    {quantity ? +Number(price) * quantity : Number(price)} руб
                </p>
                <CartCounter handleDelete={onDelete} item={item} />
            </div>
        </div>
    );
};

export default CartCard;
