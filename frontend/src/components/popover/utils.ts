import { useCallback, useState } from "react";

export function usePopover(){
    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
    const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement> , id ?: any) => {
        setOpenPopover(event.currentTarget);
    }, []);
    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);
    
    return {
        openPopover,
        handleOpenPopover,
        handleClosePopover,
      };
};