import React, { ChangeEvent, useState } from "react";
import BaseModal from "./BaseModal";
import { useEntryModalState } from "@/store/modalStore";

const EntryModal = () => {
  const entryModal = useEntryModalState();

  const [codeInput, setCodeInput] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

  const onCodehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCodeInput({
      ...codeInput,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <BaseModal isOpen={entryModal} type={"entry"}>
      <form onSubmit={onSubmitHandler} className="entry-modal-container">
        <h1 className="entry-modal-title">입장코드</h1>
        <div>
          {Object.values(codeInput).map((value, index) => (
            <input
              className="entry-modal-code-input-item"
              key={index}
              name={`input${index + 1}`}
              onChange={onCodehandler}
              value={value}
              required
              maxLength={1}
              type="text"
            />
          ))}
        </div>
        <button className="entry-modal-button">입장하기</button>
      </form>
    </BaseModal>
  );
};

export default EntryModal;
