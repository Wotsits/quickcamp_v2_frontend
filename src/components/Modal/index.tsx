import React, { JSXElementConstructor, ReactElement } from "react";
import MuiModal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import "./style.css";

type ModalProps = {
  /** mandatory, children */
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  /** mandatory, boolean dictating whether the modal is open or not */
  open: boolean;
  /** optional, boolean dictating whether the modal should hide backdrop */
  hideBackdrop?: boolean;
  /** optional, boolean dictating whether the modal should keep mounted */
  keepMounted?: boolean;
  /** optional, function to run when the modal is closed */
  onClose?: () => void;
  /** optional, sx */
  sx?: object;
};

const Modal = ({
  children,
  open,
  hideBackdrop,
  keepMounted,
  onClose,
  sx,
}: ModalProps) => {
  return (
    <MuiModal
      className="modal"
      open={open}
      hideBackdrop={hideBackdrop}
      keepMounted={keepMounted}
      onClose={onClose}
      sx={sx}
    >
        <div className="modal-content-container">
            {children}
        </div>
    </MuiModal>
  );
};

type ModalHeaderProps = {
  /** mandatory, title */
  title: string;
  /** mandatory, function to run when the modal is closed */
  onClose: () => void;
};

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
    return (
        <div className="modal-header">
        <h2 className="modal-header-title">{title}</h2>
        <CloseIcon className="modal-header-close-button" onClick={onClose} />
        </div>
    );
}

export default Modal;