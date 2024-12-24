import { cn } from "@/lib/utils";

const PaginationBar = ({
    curPage,
    setPage,
    className,
}: {
    curPage: number;
    setPage: (pageSetTo: number) => void;
    className?: string;
}) => {
    function increase() {
        setPage(curPage + 1);
    }

    function decrease() {
        if (curPage === 1) return;
        setPage(curPage - 1);
    }

    return (
        <div
            className={cn(
                "h-[50px] w-[300px] flex items-center justify-between pagination-bar",
                className
            )}>
            <div onClick={decrease} className='arrow'>
                <p className='-translate-y-[3px]'>&larr;</p>
            </div>
            <p className='text-lg font-bold text-accent'>{curPage}</p>
            <p className='text-lg font-bold'>{curPage + 1}</p>
            <p className='text-lg font-bold'>{curPage + 2}</p>
            <p>...</p>
            <div onClick={increase} className='arrow'>
                <p className='-translate-y-[3px]'>&rarr;</p>
            </div>
        </div>
    );
};

export default PaginationBar;
