import React, { FunctionComponent, useState } from 'react';
// import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';

import { loginAtom } from '../../lib/auth';

var he = require('he');

type StyledButtonProps = {
  sx?: object;
  label: string;
  id: string;
  secondary?: boolean;
  contained?: boolean;
  loading?: boolean;
  text?: boolean;
  grayed_out?: boolean;
  disabled?: boolean;
  path?: string;
  destroyBtn?: boolean;
  saveStartIcon?: boolean;
  onClick?: (e:React.MouseEvent, f?:boolean) => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export const StyledButton: FunctionComponent<StyledButtonProps> = ({disabled, endIcon, saveStartIcon, loading, label, onClick, path, sx, id, contained, text, secondary, destroyBtn, startIcon, grayed_out}) => {
  // const theme = useTheme();
  const navigate = useNavigate();

  const [login, setLogin] = useAtom(loginAtom);

  const [open, setOpen] = useState(false);
  const [ctrlActive, setCtrlActive] = useState(false);

  let setting_ask_destroy_confirm_raw = '0';
  // if (!!login && !!login.extra_data?.settings?.destroy_confirm_ignore) setting_ask_destroy_confirm_raw = login.extra_data.settings.destroy_confirm_ignore;
  let setting_ignore_destroy_confirm = setting_ask_destroy_confirm_raw === "1";

  return (<>
    <Button
      id={id}
      disabled={!!loading || disabled || grayed_out}
      startIcon={!!loading ? <CircularProgress sx={{width: '20px !important', height: '20px !important'}} /> : !!saveStartIcon ? <SaveIcon /> : startIcon}
      endIcon={endIcon}
      color={!!secondary ? "secondary" : "primary"}
      variant={!!contained ? "contained" : !!text ? "text" : "outlined"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!!path) {
          if (ctrlActive || e.ctrlKey || e.button === 1) {
            if (!!path) window.open(path, "_BLANK");
          } else {
            if (!!path) navigate(path);
          }
          setCtrlActive(false);
        }
        if (!!onClick) {
          if (!!destroyBtn && !setting_ignore_destroy_confirm) {
            setOpen(true);
          } else {
            onClick(e);
          }
        }
      }} 
      onAuxClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!!path) window.open(path, "_BLANK");
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.button == 1) {
          if (!!path) window.open(path, "_BLANK");
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Meta") {
          setCtrlActive(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Meta") {
          setCtrlActive(true);
        }
      }}
      sx={{
        width: 'auto',
        fontWeight: 400,
        ...(grayed_out ? {opacity: 0.6} : {}),
        ...sx
      }}
    >{he.decode(label)}</Button>

    {!!destroyBtn && <Dialog
      open={open}
      onClose={() => {setOpen(false);}}
    >
      <DialogTitle>Destroy this object?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to destroy this object? You will not be able to recover it with out the help of IT!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {setOpen(false);}}>Take me back</Button>
        <Button color="secondary" onClick={(e) => {if (!!onClick) onClick(e); setOpen(false);}}>Destroy</Button>
      </DialogActions>
    </Dialog>}
  </>);
}