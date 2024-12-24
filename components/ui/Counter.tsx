"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { cn } from "@/lib/utils";

import { ProductType } from "@/types/dataType";

const Counter = ({ item, className }: { item: ProductType; className?: string }) => {
    const [state, setState] = useState<{ isSelected: boolean; quantity?: number }>({
        isSelected: false,
        quantity: 0,
    });
    const { cart, addToCart, removeFromCart, setProductQuantity } = useStore();

    useEffect(() => {
        cart.map((cartItem: ProductType & { quantity: number }) => {
            if (cartItem.article === item.article) {
                setState({ isSelected: true, quantity: cartItem.quantity });
            }
        });
    }, [cart, item.article]);

    function handleSelect() {
        if (state.isSelected) {
            removeFromCart(item);
            setState({ isSelected: false, quantity: 0 });
        }
        if (!state.isSelected) {
            addToCart({ ...item, quantity: 1 });
            setState({ isSelected: true, quantity: 1 });
        }
        return;
    }

    function increase() {
        if (state.quantity) setProductQuantity(state.quantity + 1, item);
        setState((prev: { isSelected: boolean; quantity?: number }) => ({
            isSelected: prev.isSelected,
            quantity: prev.quantity ? prev.quantity : 0 + 1,
        }));
        return;
    }

    function decrease() {
        if (state.quantity && state.quantity <= 1) return;
        if (state.quantity) setProductQuantity(state.quantity - 1, item);
        setState((prev: { isSelected: boolean; quantity?: number }) => ({
            isSelected: prev.isSelected,
            quantity: prev.quantity ? prev.quantity : 0 - 1,
        }));
        return;
    }

    return (
        <div className={cn("h-[50px] w-full flex items-center justify-center gap-2", className)}>
            <div
                onClick={handleSelect}
                className={`button cursor-pointer text-xl text-accent font-extrabold transition-all ${
                    state.isSelected ? "border border-accent" : undefined
                }`}>
                {state.isSelected ? "Добавлено" : "В корзину"}
            </div>
            {state.isSelected ? (
                <div className='h-[50px] flex items-center border-[2px]  border-background rounded-xl w-full px-[5px] justify-between'>
                    <div className='bg-background w-[40px] h-[35px] flex items-center justify-center rounded-lg font-bold'>
                        <p>{state.quantity}</p>
                    </div>
                    <button
                        onClick={decrease}
                        className='flex justify-center items-center active:animate-ping w-[32px] h-[35px] bg-background text-2xl font-bold rounded-lg'>
                        <p className='-translate-y-[3px]'>--</p>
                    </button>
                    <button
                        onClick={increase}
                        className='flex justify-center items-center active:animate-ping w-[32px] h-[35px] bg-background text-2xl font-bold rounded-lg'>
                        <p className='-translate-y-[2px]'>+</p>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default Counter;
