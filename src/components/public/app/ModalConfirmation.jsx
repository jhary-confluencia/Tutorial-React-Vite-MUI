import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

function ModalConfirmation(props) {
  const { open, onClose, message, action, customer_id } = props;

  const doActionAndClose = (event) => {
    action(event);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth>
      <DialogTitle
        sx={{ backgroundColor: '#2e7c33', color: 'white', m: 0, p: 2 }}
      >
        {'Confirmar acción'}
      </DialogTitle>
      <DialogContent dividers>{message}</DialogContent>
      <DialogActions sx={{ align: 'space-between' }}>
        <Button onClick={onClose} variant='outlined'>
          Cancelar
        </Button>
        <Button
          data-id={customer_id}
          onClick={doActionAndClose}
          variant='contained'
          color='success'
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalConfirmation;
