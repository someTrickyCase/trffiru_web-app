"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, useUser } from "@/store/store";
import { useTelegram } from "@/hooks/useTelegram";

import { ProductType } from "@/types/dataType";

import { postNewLead, updateProductRowsInLead } from "@/api/bitrixApi";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import Alert from "@/components/shared/Alert";

const OrderPage = () => {
    const Telegram = useTelegram();
    const { setUser } = useUser();
    const { cart } = useStore();
    const [isAllert, setIsAllert] = useState(false);

    const navigator = useRouter();
    const refInputPhone: React.RefObject<HTMLInputElement | null> = useRef(null);
    const refInputName: React.RefObject<HTMLInputElement | null> = useRef(null);
    const refInputEmail: React.RefObject<HTMLInputElement | null> = useRef(null);
    const refInputNote: React.RefObject<HTMLTextAreaElement | null> = useRef(null);

    function getTotalPrice() {
        let totalPrice: number = 0;
        cart.map((item: ProductType) => {
            totalPrice += +item.price;
        });
        return totalPrice;
    }

    function handleBack() {
        navigator.back();
    }

    function handleButtonReady() {
        const queryID = Telegram.webApp?.initDataUnsafe.query_id;
        const name = refInputName.current?.value;
        const phone = refInputPhone.current?.value;
        const email = refInputEmail.current?.value;
        const note = refInputNote.current?.value;

        if (name && phone && email) {
            const bitrixProductRows: object[] = [];
            const productsID: object[] = [];
            cart.map((item: ProductType) => {
                productsID.push({ product_id: item.article });
                bitrixProductRows.push({
                    PRODUCT_ID: item.article.toString(),
                    PRODUCT_NAME: item.link,
                    PRICE: item.price,
                    QUANTITY: item.quantity,
                });
            });

            // make bitrix lead

            let bitrixID: number;
            const leadData = {
                fields: {
                    COMMENTS: note,
                    HONORIFIC: "troffi-web-app",
                    SOURCE_DESCRIPTION: "troffi-web-app",
                    UF_CRM_1728573871: "Мы получили и обрабатываем Ваш заказ",
                    TITLE: `${name} troffi-bot`,
                    NAME: name,
                    OPPORTUNITY: getTotalPrice(),
                    PHONE: [{ VALUE: `${phone}` }],
                    EMAIL: [{ VALUE: `${email}` }],
                },
            };
            postNewLead(leadData).then((res) => {
                if (res.result) {
                    bitrixID = +res.result;
                    updateProductRowsInLead(+res.result, { ROWS: bitrixProductRows });

                    setUser({ bitrixID, orderID: res.id, queryID, name, phone, email, note });
                    navigator.push("/order/confirm");
                } else {
                    setIsAllert(true);
                    setTimeout(() => {
                        setIsAllert(false);
                    }, 2000);
                }
            });
        } else {
            setIsAllert(true);
            setTimeout(() => {
                setIsAllert(false);
            }, 2000);
        }
    }

    return (
        <div className='flex flex-col relative'>
            <div className='min-h-screen'>
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
                    <Image src='/logo.png' width={50} height={50} className='h-[50px]' alt='logo' />
                </div>
                <h1 className='w-full flex justify-center mt-[20px] mb-[20px] text-2xl font-extrabold text-accent'>
                    Детали заказа
                </h1>
                <div className='w-full flex flex-col gap-[10px] ml-[30px]'>
                    <div>
                        <p className='text-lg mb-[5px]'>Ваше Имя</p>
                        <div className='border border-accent w-[300px] h-[40px] rounded-lg'>
                            <input
                                ref={refInputName}
                                spellCheck={false}
                                placeholder='Имя'
                                type='text'
                                className='bg-transparent border-none outline-none px-[10px] h-full'
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-lg mb-[5px]'>Номер телефона</p>
                        <div className='border border-accent w-[300px] h-[40px] rounded-lg'>
                            <input
                                ref={refInputPhone}
                                spellCheck={false}
                                placeholder='Телефон'
                                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                                type='tel'
                                className='bg-transparent border-none outline-none px-[10px] h-full'
                            />
                        </div>
                    </div>
                    <div className='mb-[30px]'>
                        <p className='text-lg mb-[5px]'>Адрес электронной почты</p>
                        <div className='border border-accent w-[300px] h-[40px] rounded-lg'>
                            <input
                                ref={refInputEmail}
                                spellCheck={false}
                                placeholder='Email'
                                pattern='.+@example\.com'
                                type='email'
                                className='bg-transparent border-none outline-none px-[10px] h-full'
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col px-[20px] gap-[5px]'>
                    <h2 className='text-xl font-bold'>Дополнительно</h2>
                    <p className='text-sm font-extralight mb-[5px]'>
                        Примечание к заказу (не обязательно)
                    </p>
                    <div className='border border-accent w-full h-[120px] rounded-lg'>
                        <textarea
                            ref={refInputNote}
                            spellCheck={false}
                            className='bg-transparent border-none outline-none p-[10px] h-full'
                        />
                    </div>
                    <p className='text-sm font-light mt-[5px]'>
                        <span className='text-lg text-accent'>*</span> после форормления заказа наш
                        мененджер свяжется с Вами в ближайшее рабочее время
                    </p>
                </div>
                <div className='h-fit ml-[20px] mt-[30px]'>
                    <div className='cursor-pointer text-lg bg-orange active:animate-ping'>
                        <div onClick={handleButtonReady} className='button !w-[150px] !bg-accent'>
                            Готово
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {isAllert ? <Alert /> : null}
        </div>
    );
};

export default OrderPage;
