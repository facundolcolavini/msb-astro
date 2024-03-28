import { useState } from "preact/hooks";

const LoginPage = () => {
    const [modalState, setModalState] = useState({ isOpen: false });

    const toggleModal = () => {
        setModalState((prevState) => ({ isOpen: !prevState.isOpen }));
    };
    
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage