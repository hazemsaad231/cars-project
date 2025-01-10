import { MdOutlineLogin } from "react-icons/md";
import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Link } from "react-router-dom";


export default function Close() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
      >
        <MdOutlineLogin />
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to log out?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
                <Link to="/login"  onClick={()=>
                    localStorage.removeItem('token')
                  }  >log out</Link>
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

