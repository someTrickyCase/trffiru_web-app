"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { cn } from "@/lib/utils";

import { ProductType } from "@/types/dataType";

const CartCounter = ({
    item,
    className,
    handleDelete,
}: {
    item: ProductType;
    className?: string;
    handleDelete: () => void;
}) => {
    const [state, setState] = useState<{ quantity?: number }>({
        quantity: 0,
    });
    const { cart, setProductQuantity } = useStore();

    useEffect(() => {
        cart.map((cartItem: ProductType) => {
            if (cartItem.article === item.article) {
                setState({ quantity: cartItem.quantity });
            }
        });
    }, [cart, item.article]);

    function onDelete() {
        handleDelete();
        return;
    }

    function increase() {
        if (state.quantity) setProductQuantity(state.quantity + 1, item);
        setState((prev: { quantity?: number }) => ({
            quantity: prev.quantity ? prev.quantity : 0 + 1,
        }));
        return;
    }

    function decrease() {
        if (state.quantity && state.quantity <= 1) return;
        if (state.quantity) setProductQuantity(state.quantity - 1, item);
        setState((prev: { quantity?: number }) => ({
            quantity: prev.quantity ? prev.quantity : 0 - 1,
        }));
        return;
    }

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-between gap-[10px] w-[110px]",
                className
            )}>
            <div className='h-[30px] flex items-center rounded-lg w-full px-[5px] justify-between'>
                <button
                    onClick={decrease}
                    className='flex justify-center items-center  active:animate-ping w-[25px] h-[25px] bg-orange text-lg font-bold  rounded-full'>
                    <p>--</p>
                </button>
                <div className='bg-background w-[35px] h-[25px] flex items-center justify-center rounded-lg'>
                    <p className='text-lg font-bold'>{state.quantity}</p>
                </div>
                <button
                    onClick={increase}
                    className='flex justify-center items-center active:animate-ping w-[25px] h-[25px] bg-orange text-lg font-bold  rounded-full'>
                    <p>+</p>
                </button>
            </div>
            <div className='button !bg-accent h-[30px] w-full cursor-pointer '>
                <div onClick={onDelete}>Удалить</div>
            </div>
        </div>
    );
};

export default CartCounter;
