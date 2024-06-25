import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

function CheckoutModal({ open, onClose, onCheckout }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCheckout = () => {
    onCheckout();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Finalizar Compra</DialogTitle>
      <DialogContent>
        <InputMask
          mask="9999 9999 9999 9999"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        >
          {() => <TextField
            margin="dense"
            label="Número do Cartão"
            type="text"
            fullWidth
            variant="outlined"
          />}
        </InputMask>
        <InputMask
          mask="99/99"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        >
          {() => <TextField
            margin="dense"
            label="Data de Validade"
            type="text"
            fullWidth
            variant="outlined"
          />}
        </InputMask>
        <InputMask
          mask="999"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        >
          {() => <TextField
            margin="dense"
            label="CVV"
            type="text"
            fullWidth
            variant="outlined"
          />}
        </InputMask>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleCheckout} color="primary" variant="contained">
          Finalizar Compra
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CheckoutModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default CheckoutModal;
