import RootPageCategoryCard from "@/components/rootPage/RootPageCategoryCard";
import Footer from "@/components/shared/Footer";
import Sonner from "@/components/shared/Sonner";
import { RootPageCard } from "@/types/dataType";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useParallax } from "react-scroll-parallax";
import useSWR from "swr";

const HomePage = () => {
    const parallaxTarget = useRef<HTMLElement | null>(null);
    const parallaxElement = useParallax<HTMLDivElement>({
        speed: 20,
        targetElement: parallaxTarget.current as HTMLDivElement,
    });

    const { data, isLoading } = useSWR("/root", () => fetch("api/").then((data) => data.json()));

    return (
        <main className='w-screen no-scrollbar'>
            <section className='h-screen' ref={parallaxTarget}>
                <div className='min-h-screen flex items-center justify-center relative'>
                    <Image
                        priority
                        width={1800}
                        height={900}
                        src={"/HeroPhotoCompressed.jpg"}
                        alt='Offroad photo'
                        className='object-cover h-full absolute'
                    />

                    <div
                        ref={parallaxElement.ref}
                        className='absolute flex flex-col w-full px-5 bottom-20 max-w-[400px] left-0 md:left-10 xl:left-20'>
                        <p className='text-hint font-medium text-md tracking-wider ml-2'>
                            Интернет-магазин тюнинга
                        </p>
                        <h2 className='text-5xl font-medium mt-2'>
                            Детали для
                            <br /> Внедорожников
                            <br /> и Пикапов
                        </h2>
                        <Link href='/products/land-cruiser-prado-120' className='h-fit mt-10'>
                            <div className='w-full bg-accent text-xl font-bold flex items-center justify-center py-2 rounded-full'>
                                Каталог
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <section className='min-h-screen w-screen grid'>
                {isLoading && <Sonner className='absolute self-center justify-self-center' />}
                {data && (
                    <div className='grid grid-cols-2 justify-items-center gap-6 px-5 py-12'>
                        <h2 className='col-span-full justify-self-start text-3xl font-black text-accent'>
                            Внедорожники
                        </h2>
                        {data.vcms.map((item: RootPageCard) => (
                            <RootPageCategoryCard cardData={item} key={JSON.stringify(item)} />
                        ))}
                        <h2 className='col-span-full justify-self-start text-3xl font-black text-accent'>
                            Пикапы
                        </h2>
                        {data.pickups.map((item: RootPageCard) => (
                            <RootPageCategoryCard cardData={item} key={JSON.stringify(item)} />
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
};

export default HomePage;
