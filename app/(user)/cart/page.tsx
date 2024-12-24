import { TelegramProvider } from "@/hooks/useTelegram";
import CartPage from "@/pages/CartPage";

const page = () => {
    return (
        <TelegramProvider>
            <CartPage />
        </TelegramProvider>
    );
};

export default page;
