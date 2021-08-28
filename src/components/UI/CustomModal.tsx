import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IPosts} from "../../types/types";


interface CustomModalProps<T> {
    open: boolean,
    label: string,
    setOpen: (d: boolean) => void

    // eslint-disable-next-line
    actionBtn: () => void,
    children: React.ReactNode
}

export default function CustomModal<T>({label, actionBtn, open, setOpen, children}: CustomModalProps<T>) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{label}</DialogTitle>
                <DialogContent style={{width: 600}}>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button type='submit' onClick={actionBtn} color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}