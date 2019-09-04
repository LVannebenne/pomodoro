import React from "react";
import ReactDOM from "react-dom";
import Button from "./button";

const Modal = params => {
    if (params.show) {
        return ReactDOM.createPortal(
            <div className={"modal"}>
                <section className={"modal-main"}>
                    {params.children}
                    <Button value={"New timer"} handleFunc={params.onNew} />
                    <Button value={"Close"} handleFunc={params.onClose} />
                </section>
            </div>,
            document.body,
        );
    }

    return null;
};

export default Modal;
