import type { Metadata } from "next";
import { Climate_Crisis, Jost, Oi } from "next/font/google";
import "../globals.css";

const JostSans = Jost({
    subsets: ["latin", "cyrillic"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-jost-sans",
});

const OiSans = Oi({
    subsets: ["latin", "cyrillic"],
    weight: ["400"],
    variable: "--font-oi-sans",
});

const climateCrisis = Climate_Crisis({
    weight: ["400"],
    variable: "--font-climate-crisis",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TroffiRu",
    description: "TroffiRu clients support",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${climateCrisis.variable} ${JostSans.variable} ${OiSans.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
