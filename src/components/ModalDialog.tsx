import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";

interface DialogState {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  children?: React.ReactNode;
}

export default function ModalDialog({ open, onOpenChange, title, children }: DialogState) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize text-primary">{title}</DialogTitle>
          <DialogDescription className="hidden">description of dialog</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
