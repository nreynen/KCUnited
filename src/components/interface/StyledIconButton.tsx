import React, { FunctionComponent, useState } from 'react';
// import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material';

import { loginAtom } from '../../lib/auth';

type StyledIconButtonProps = {
  sx?: object;
  color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined;
  title?: string;
  path?: string;
  newTab?: boolean;
  destroyBtn?: boolean;
  onClick?: (e:React.MouseEvent, f?:boolean) => void;
  children: React.ReactNode;
};

export const StyledIconButton: FunctionComponent<StyledIconButtonProps> = ({newTab, sx, color, onClick, path, children, title, destroyBtn}) => {
  // const theme = useTheme();
  const navigate = useNavigate();

  const [login, setLogin] = useAtom(loginAtom);

  const [open, setOpen] = useState(false);
  const [ctrlActive, setCtrlActive] = useState(false);

  let setting_ask_destroy_confirm_raw = '0';
  // if (!!login && !!login.extra_data?.settings?.destroy_confirm_ignore) setting_ask_destroy_confirm_raw = login.extra_data.settings.destroy_confirm_ignore;
  let setting_ignore_destroy_confirm = setting_ask_destroy_confirm_raw === "1";

  return (<>
    <IconButton
      sx={sx}
      color={color}
      title={title}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!!path) {
          if (ctrlActive || e.ctrlKey || e.button === 1 || !!newTab) {
            let handle = window.open(path, "_BLANK");
            if (!!handle) handle.blur();
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
        
        if (!!path) {
          let handle = window.open(path, "_BLANK");
          if (!!handle) handle.blur();
        }
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.button == 1) {
          if (!!path) {
            let handle = window.open(path, "_BLANK");
            if (!!handle) handle.blur();
          }
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
    >
      {children}
    </IconButton>

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