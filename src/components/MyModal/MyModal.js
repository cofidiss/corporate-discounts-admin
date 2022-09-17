
import React, {useState} from 'react';
import Modal from 'react-modal';


function MyModal(props) {

  const [isOpenState,setOpenState] = useState(props.isOpen === false ? false:true);

  Modal.setAppElement('#root');


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

    
    
  
  
  
    return (
      <div>
             
        <Modal
          isOpen={isOpenState}
         
          style={customStyles}
          
        >
          
          <button onClick={e=> setOpenState(false)}>Kapat</button>
         { props.children}
        </Modal>
      </div>
    );
  }

  export default MyModal;