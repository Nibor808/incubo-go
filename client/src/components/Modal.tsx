import React from 'react';
import ReactModal from 'react-modal';

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  headerText: string | undefined;
  srcText: string | undefined;
};

const ModalStyle = {
  overlay: {
    position: 'fixed' as 'fixed',
    zIndex: 9998,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(129,130,145,0.8)',
  },
  content: {
    maxWidth: '75%',
    maxHeight: '90%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '15px',
    borderRadius: '2px',
    backgroundColor: 'rgb(255,255,255)',
  },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  headerText,
  srcText,
}: ModalProps) => {
  return (
    <ReactModal
      appElement={document.getElementById('root') as HTMLElement}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={ModalStyle}
      contentLabel='Nothing'
    >
      <h4>{headerText}</h4>

      <img
        src={srcText}
        alt={headerText}
        width='100%'
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        }}
      />
    </ReactModal>
  );
};

export default Modal;
