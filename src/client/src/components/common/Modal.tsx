import classnames from 'classnames';
import React, { useCallback, useEffect, useRef } from 'react';
import { Button } from '.';
import { useOnClickOutside, useKeyPress } from '../../hooks';

interface ModalProps {
  title: string;
  isOpen: boolean;
  toggle: (shouldOpen: boolean) => void;
}
export const Modal: React.FC<ModalProps> = ({ title, isOpen, toggle, children }) => {
  // Create a ref for modal.
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Close modal handler.
   */
  const closeModal = useCallback(() => toggle(false), [toggle]);

  // Closes modal on click outside.
  useOnClickOutside(modalRef, closeModal);

  // Check if escape key has been pressed.
  const escapePressed = useKeyPress('Escape');

  /**
   * Close modal when 'Escape' has been pressed.
   */
  useEffect(() => {
    if (escapePressed) {
      closeModal();
    }
  }, [escapePressed, closeModal]);

  const modalClasses = classnames({
    modal: true,
    'fade-in': isOpen,
    'fade-out': !isOpen,
  });

  const modalDialogClasses = classnames({
    'modal-dialog': true,
    'slide-in': isOpen,
    'slide-out': !isOpen,
  });

  // Render component only when the modal is open.
  return (
    <div className={modalClasses}>
      <div ref={modalRef} className={modalDialogClasses}>
        <Button className="modal-dialog-close-button" onClick={closeModal}>
          X
        </Button>
        <h2 className="heading-secondary">{title}</h2>
        <hr />
        {children}
      </div>
    </div>
  );
};
