import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/store/store";

const SearchBar = () => {
    const { setSearchedText } = useSearch();
    const [isActive, setIsActive] = useState(false);
    const navigator = useRouter();
    const inputRef: React.RefObject<HTMLInputElement | null> = useRef(null);

    function handleIsActive() {
        if (!isActive) {
            setIsActive(true);
        } else {
            setIsActive(false);
            if (inputRef.current?.value !== "") {
                setSearchedText(inputRef.current?.value);
                inputRef.current?.setAttribute("data", "");
                navigator.push(`/products/search/${inputRef.current?.value}`);
            }
        }
    }
    // ?s=lada&post_type=product

    return (
        <div
            className={` ${
                isActive ? "w-[250px] bg-background" : "w-[50px] bg-black/[0.1]"
            }  flex items-center h-[30px] border border-white/[0.2] absolute right-14 rounded-lg z-10 transition-all ease-in-out`}>
            <div className='w-full'>
                <input
                    spellCheck={false}
                    ref={inputRef}
                    placeholder='По артикулу или названию'
                    type='text'
                    className={`${
                        !isActive ? "hidden" : undefined
                    } pointer-events-auto inherit placeholder:text-foreground flex items-center pl-[10px] z-20 w-full border-none outline-none bg-transparent`}
                />
            </div>
            <div
                onClick={handleIsActive}
                className='absolute right-[4px] rounded-sm font-bold w-[40px] h-[20px] flex items-center justify-center'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    className='size-5 fill-accent'>
                    <path
                        fillRule='evenodd'
                        d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z'
                        clipRule='evenodd'
                    />
                </svg>
            </div>
        </div>
    );
};

export default SearchBar;
