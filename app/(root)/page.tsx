"use client";

import Header from "@/components/shared/Header";
import HomePage from "@/pages/HomePage";
import { ParallaxProvider } from "react-scroll-parallax";

export default function Home() {
    return (
        <>
            <ParallaxProvider scrollAxis='vertical'>
                <Header />
                <HomePage />
            </ParallaxProvider>
        </>
    );
}
