import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface IProps {
  isOpen: boolean;
  text: string;
}

const CustomAlert = ({ isOpen, text }: IProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setOpen(isOpen);
    }
  }, [isOpen]);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={6000}
      open={open}
      onClose={() => setOpen(false)}
      message={text}
      key={'top' + 'right'}
    >
      <Alert onClose={() => setOpen(false)} severity="success">
        {text}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
