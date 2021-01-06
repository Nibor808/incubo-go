const ModalStyle = {
  overlay: {
    position: 'fixed',
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

export default ModalStyle;