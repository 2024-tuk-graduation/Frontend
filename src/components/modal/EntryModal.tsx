import React, { ChangeEvent, useState } from "react";
import BaseModal from "./BaseModal";
import { useEntryModalState } from "@/store/modalStore";
import { entryApi } from "@/hooks/services/mutations/useEntryMutation";
import { useGenericMutation } from "@/hooks/services/mutations/customMutation";

const EntryModal = () => {
  const entryModal = useEntryModalState();

  const onEntrySuccess = () => {
    console.log("Entry API success");
  };
  const onEntryError = () => {
    console.log("Entry API Error");
  };

  const { mutation: entryMutation } = useGenericMutation({
    mutationFn: entryApi,
    onSuccessCb: onEntrySuccess,
    onErrorCb: onEntryError,
  });
  const [codeInput, setCodeInput] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

  const [nickname, setNickname] = useState("");
  const onCodehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCodeInput({
      ...codeInput,
      [e.target.name]: e.target.value,
    });
  };

  const onNicknamehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(codeInput);
    console.log(nickname);
    const uuid: string = Object.values(codeInput).join("");
    console.log(uuid);
    const code = {
      entranceCode: uuid,
      nickname: nickname,
    };
    entryMutation.mutate(code);
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
        <input className="entry-modal-nickname-input-item" value={nickname} onChange={onNicknamehandler} />
        <button className="entry-modal-button">입장하기</button>
      </form>
    </BaseModal>
  );
};

export default EntryModal;
