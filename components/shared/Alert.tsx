import { useEffect, useState } from "react";

const Alert = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 1700);
    }, []);

    return (
        <div
            className={` ${
                isVisible ? undefined : "translate-x-[100vw]"
            } transition-all duration-300 fixed self-center top-[86vh] text-center border border-accent p-3 rounded-lg backdrop-blur-lg`}>
            <p className='text-xl font-bold'>Пожалуйста!</p>
            <p className='text-lg'>Корректно заполните обязательные поля</p>
        </div>
    );
};

export default Alert;
