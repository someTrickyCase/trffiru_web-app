"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";

import SearchBar from "./SearchBar";
import Image from "next/image";
import Link from "next/link";

const Header = ({ navigateBack }: { navigateBack?: boolean }) => {
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const { cart } = useStore();
    const navigator = useRouter();

    useEffect(() => {
        if (cart.length !== 0) setIsCartEmpty(false);
        if (cart.length === 0) setIsCartEmpty(true);
    }, [cart.length]);

    function handleBack() {
        navigator.back();
    }

    return (
        <div className='z-50 cursor-pointer w-[365px] h-[50px] flex items-center justify-between fixed top-2 left-1/2 translate-x-[-50%] !backdrop-blur-[10px] shadow-lg border border-white/[0.3] rounded-full'>
            {navigateBack ? (
                <div onClick={handleBack} className='flex items-center gap-[10px] ml-2'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='size-6 -translate-y-[2px]'>
                        <path
                            fillRule='evenodd'
                            d='M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z'
                            clipRule='evenodd'
                        />
                    </svg>
                    <p className='text-md tracking-wide text-accent font-special'>TroffiRu</p>
                </div>
            ) : (
                <Link href={"/"} className='flex items-center gap-[4px]'>
                    <Image
                        priority
                        width={55}
                        height={40}
                        role='presentation'
                        src={"/logo.png"}
                        alt='troffiru-logo'
                        className='translate-y-[-9%] translate-x-[-7%]'
                    />
                    <p className='text-md tracking-wide text-accent font-special'>TroffiRu</p>
                </Link>
            )}

            <div className='flex items-center gap-2 mr-5'>
                <SearchBar />
                <Link href={"/cart"} className='relative'>
                    <div
                        className={`${
                            isCartEmpty ? "hidden" : "block"
                        } h-[12px] w-[12px] rounded-full bg-orange absolute right-[-10px] top-[-5px] flex items-center justify-center`}>
                        <p className='text-[12px]'>{cart.length}</p>
                    </div>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        className='size-6 fill-accent transition-all'>
                        <path d='M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z' />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Header;
