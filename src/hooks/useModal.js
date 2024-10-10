import { useCallback, useState } from 'react';

function useModal() {
    const [modal, setModal] = useState(false);

    const handleOpenModal = () => {
        console.log('click');

        setModal(!modal);
    };

    return { modal, handleOpenModal };
}

export default useModal;
