import React from "react";
import { Portal } from "react-portal";
import FocusTrap from "focus-trap-react";
import "./Dialog.css";

interface DialogProps {
  title: string | JSX.Element;
  children: React.ReactNode;
  onClose: (e: React.MouseEvent) => void;
  isFocusTrapActive?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  onClose,
  isFocusTrapActive = true,
}) => {
  return (
    <Portal>
      <FocusTrap active={isFocusTrapActive}>
        <div data-testid="backdrop" className="dialog-backdrop" onClick={onClose}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h2>{title}</h2>
              <button className="close-button" onClick={onClose}>
                &times;
              </button>
            </div>
            <div className="dialog-body">{children}</div>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  );
};

export default Dialog;
