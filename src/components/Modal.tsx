import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export interface RequiredModalProps {
  open: boolean;
  onOpenChange: (open?: boolean) => void;
}

interface ModalProps extends RequiredModalProps {
  title?: string | React.ReactNode;
  description?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Modal({
  title,
  description,
  footer,
  children,
  open,
  onOpenChange,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
