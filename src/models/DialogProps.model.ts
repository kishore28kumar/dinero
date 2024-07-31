export interface DialogProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
    onSave: (data: any) => void;
}