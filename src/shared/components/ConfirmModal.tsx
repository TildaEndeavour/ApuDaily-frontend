import React, {useEffect} from "react";

interface ConfirmModalPros{
  question: string,
  onConfirm: () => void,
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalPros> = ({question, onConfirm, onCancel}) => {

    return (
        <div className="flex flex-col justify-center items-center gap-4 p-10 bg-white w-fit h-fit border-1 rounded-3xl">
            {question}
            <section className="flex flex-row gap-4">
                <button className="p-2 border-1 rounded-3xl hover:bg-gray-200" onClick={onConfirm}>Confirm</button>
                <button className="p-2 border-1 rounded-3xl hover:bg-gray-200" onClick={onCancel}>Cancel</button>
            </section>
        </div>
    );
}

export default ConfirmModal;