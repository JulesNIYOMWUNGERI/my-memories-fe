import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type Props = {
    error?:  boolean;
    success?:  boolean;
    warning?:  boolean;
    info?:  boolean;
    message: string
}

export default function BasicAlerts({
    error,
    success,
    warning,
    info,
    message
}: Props) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {success && (<Alert severity="success">{message}</Alert>)}
      {info && (<Alert severity="info">{message}</Alert>)}
      {warning && (<Alert severity="warning">{message}</Alert>)}
      {error && (<Alert severity="error">{message}</Alert>)}
    </Stack>
  );
}