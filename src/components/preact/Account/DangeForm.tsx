import { useState } from "preact/hooks";
import Button from "../ui/Buttons/Button";
import { Modal } from "../ui/Modals/Modal";


const DangeForm = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const toggleModal = () => {
        setIsOpenModal((prev) =>
            !prev
        );
    };

    return (
        <>
            {
                isOpenModal && (
                    <Modal
                        header={<div className={'flex justify-center  text-center items-center place-content-center p-3 relative'}><img src={`/images/logo.png`} className={'w-100 text-center self-center place-items-middle'} width={140} height={40} /></div>}
                        footer=""
                        addStyles="bg-secondary-bg-msb shadow-lg  rounded w-11/12 md:max-w-md mx-auto transform transition-transform duration-300"
                        onHeaderCloseClick={toggleModal}
                        onBackdropClick={toggleModal}
                    >
                        <form className={'px-5'}>
                            <p className={'text-primary-text-msb font-bold text-xl my-3 text-center'}>Eliminar Cuenta</p>


                            <div className={'w-full'}>
                                <p class="text-lg text-primary-text-msb text-center pb-5">
                                    Tu cuenta será eliminada
                                    de forma permanente.
                                </p>
                                <p class="text-lg text-primary-text-msb text-center font-bold mb-2">
                                ¿Querés eliminarla?
                                </p>
                            </div>
                            <div className={'flex justify-center items-center gap-2 p-2 font-gotham'}>
                                <Button variant="outline" type="button" onClick={toggleModal} addStyles="text-center font-medium  text-base w-full py-2 md:px-10 hover:bg-bg-2-msb hover:text-white">Cancelar</Button>
                                <Button variant="primary" type="button" onClick={toggleModal} addStyles="w-full py-1 py-2 md:px-10 text-base bg-secondary-bg-hover-msb hover:bg-bg-2-msb hover:text-white font-medium">Sí, eliminar</Button>
                            </div>



                        </form>


                    </Modal>)
            }
            <div className={'px-5 font-gotham mx-auto '}>

                <p className={'text-primary-text-msb font-bold text-xl mb-7'}>Zona de peligro</p>

                <div className="grid grid-cols md:grid-cols lg:grid-cols-2 gap-2  border border-red-500 rounded p-5 py-3" >
                    <div className={'w-full'}>
                        <h2 className=" text-base font-medium text-gray-800">Eliminar cuenta</h2>
                        <span className=" text-sm font-medium text-gray-600 ">Una vez que eliminas la cuenta, no hay vuelta atrás. Por favor, asegúrese.</span>
                    </div>
                    <div className={'flex justify-end items-center'}>
                        <Button variant="primary" type="button" onClick={toggleModal} addStyles="  text-base bg-red-500 text-white hover:bg-red-700 text-ellipsis   py-2 px-10">Eliminar cuenta</Button>
                    </div>

                </div>


            </div>
        </>
    )
}

export default DangeForm