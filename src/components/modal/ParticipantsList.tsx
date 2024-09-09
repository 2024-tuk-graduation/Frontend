import React from "react";
import { usePersonnelInfoState, useHostState } from "@/store/editorRoomInfoStore";

const ParticipantsList = React.memo(({ onSelect }: { onSelect: (participant: string) => void }) => {
  const personnelInfo = usePersonnelInfoState();
  const currentHost = useHostState();

  const handleSelect = (participant: string) => {
    onSelect(participant);
  };

  return (
    <div className="editor-modal-now-list">
      <ul>
        {personnelInfo
          .filter((person) => person !== currentHost)
          .map((participant) => (
            <li key={participant}>
              <button className="editor-modal-now-list-button" type="button" onClick={() => handleSelect(participant)}>
                {participant}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
});

ParticipantsList.displayName = "ParticipantsList";

export default ParticipantsList;
