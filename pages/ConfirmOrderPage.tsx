"use client";

import { useEffect } from "react";
import { useStore, useUser } from "@/store/store";

import { useRouter } from "next/navigation";
import { useTelegram } from "@/hooks/useTelegram";
import { updateLeadHonorific } from "@/api/bitrixApi";

import Image from "next/image";
import { ProductType } from "@/types/dataType";

const ConfirmOrderPage = () => {
    const Telegram = useTelegram();
    const navigator = useRouter();
    const { cart, cleanUpCart } = useStore();
    const { user } = useUser();

    Telegram.webApp?.MainButton.setParams({
        text: "Оформить",
        color: "#c80a21",
        text_color: "#fff",
    });
    Telegram.webApp?.MainButton.show();

    // on send data
    const onSendData = () => {
        cleanUpCart();
        updateLeadHonorific(user.orderID);

        Telegram.webApp?.sendData(JSON.stringify({ bitrixID: user.bitrixID }));

        Telegram.webApp?.close();
    };

    useEffect(() => {
        Telegram.webApp?.onEvent("mainButtonClicked", onSendData);
        return () => {
            Telegram.webApp?.offEvent("mainButtonClicked", onSendData);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSendData]);

    function getTotalPrice() {
        let totalPrice: number = 0;
        cart.map((item: ProductType) => {
            totalPrice += item.quantity ? +item.price * item.quantity : +item.price;
        });
        return totalPrice;
    }

    function handleBack() {
        Telegram.webApp?.MainButton.hide();
        navigator.back();
    }
    return (
        <div>
            <div className='w-full h-[50px] flex items-center px-[20px] justify-between'>
                <div onClick={handleBack} className='flex items-center gap-[24px]'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='size-6'>
                        <path
                            fillRule='evenodd'
                            d='M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z'
                            clipRule='evenodd'
                        />
                    </svg>
                    <p className='text-md tracking-wide text-accent font-special'>TroffiRu</p>
                </div>
                <Image
                    src='/logo.png'
                    className='h-[50px]'
                    width={50}
                    height={50}
                    alt='toyota_logo'
                />
                {/* <img src='/logo.png' className='h-[35px]' alt='toyota_logo' /> */}
            </div>
            <div className='bg-background border-t-[1px] border-t-accent'>
                <div className='flex flex-col items-center px-[20px] mt-[10px]'>
                    <h2 className='text-2xl font-bold text-accent mb-[10px]'>Ваш заказ</h2>
                    <div>
                        <div className='flex flex-col gap-[10px] items-center justify-center'>
                            <h2 className='font-light text-sm '>
                                Пожалуйста, проверьте точность заполненных данных. Если какие-то
                                данные не соответствуют, вернитесь на предыдущую страницу
                            </h2>
                            <div className='w-full flex flex-col gap-[10px] items-start text-lg mt-[20px] text-white'>
                                <p>
                                    <span className='text-[#3d3d3d]'>Имя: </span>
                                    {user?.name}
                                </p>
                                <p>
                                    <span className='text-[#3d3d3d]'>Телефон: </span>
                                    {user?.phone}
                                </p>
                                <p>
                                    <span className='text-[#3d3d3d]'>Email: </span>
                                    {user?.email}
                                </p>
                                <p>
                                    <span className='text-[#3d3d3d]'>Примечание: </span>
                                    {user?.note}
                                </p>
                            </div>
                            <h2 className='text-xl text-[#fff] font-bold mt-[10px]'>Товары</h2>
                            <ol className='list-decimal text-start flex flex-col gap-[10px] text-[#3d3d3d]'>
                                {cart.map((item: ProductType) => (
                                    <li
                                        key={JSON.stringify(
                                            item
                                        )}>{`${item.title} - ${item.quantity} шт.`}</li>
                                ))}
                            </ol>
                            <h2 className='text-lg self-end mt-[10px] text-start text-[#3d3d3d]'>
                                Итого: <span className='text-[#fff]'>{getTotalPrice()} руб.</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmOrderPage;
