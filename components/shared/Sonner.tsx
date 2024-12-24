import { cn } from "@/lib/utils";

const Sonner = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "w-[50px] h-[50px] rounded-full border-[4px] border-[#fff]/[0.03] border-r-accent animate-spin",
                className
            )}
        />
    );
};

export default Sonner;
