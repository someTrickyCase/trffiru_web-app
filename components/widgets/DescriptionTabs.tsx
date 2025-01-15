import { cn } from "@/lib/utils";
import { useState } from "react";

const DescriptionTabs = ({
    description,
    className,
}: {
    description?: string;
    className?: string;
}) => {
    const [viewMode, setViewMode] = useState<"description" | "registry">("description");

    return (
        <div className={cn("w-full flex flex-col items-center gap-5", className)}>
            <div className='flex w-full items-center justify-between bg-background-secondary px-2 py-2 rounded-xl md:w-[50%]'>
                <div
                    onClick={() => setViewMode("description")}
                    className={`button tab-button ${
                        viewMode === "description" ? "text-accent" : undefined
                    }`}>
                    Описание
                </div>
                <div
                    onClick={() => setViewMode("registry")}
                    className={`button tab-button ${
                        viewMode === "registry" ? "text-accent" : undefined
                    }`}>
                    Регистрация
                </div>
            </div>

            <div className='w-full md:w-[70%] overflow-x-hidden min-h-[17rem] relative'>
                <div
                    className={`leading-5 transition-all duration-200 ease-in-out ${
                        viewMode === "description" ? undefined : "-translate-x-[100vw]"
                    }`}>
                    {description}
                </div>

                <div
                    className={`absolute top-0 leading-5 transition-all duration-200 ease-in ${
                        viewMode === "registry" ? undefined : "translate-x-[100vw]"
                    }`}>
                    <div className='mb-[20px]'>
                        <h2 className='text-lg font-bold'>
                            Оставляйте заявку, чтобы провести бесплатную техническую экспертизу и
                            узнать:
                        </h2>
                        <ul className='list-disc mt-[10px] ml-[30px]'>
                            <li>Стоимость оформления документов</li>
                            <li>Точные сроки регистрации</li>
                            <li>Этапы и нюансы взаимодействия с ГИБДД</li>
                            <li>Особенности регистрации этого вида изменений</li>
                        </ul>
                    </div>
                    <p className='text-sm'>
                        <span className='text-accent text-xl'>* </span> Оставить заявку на
                        проведение экспертизы Вы можете воспользовавшись контекстным меню бота
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DescriptionTabs;
