// import { create } from "zustand";

// interface PersonMenuType {
//   chat: boolean;
//   qna: boolean;
// }

// interface UseEditorMenuStoreType {
//   personMenu: PersonMenuType;
//   actions: {
//     setPersonMenu: (menu: keyof PersonMenuType) => void;
//   };
// }

// const useEditorMenuStore = create<UseEditorMenuStoreType>((set) => ({
//   personMenu: {
//     chat: true,
//     qna: false,
//   },

//   actions: {
//     setPersonMenu: (menu) =>
//       set((state) => ({
//         personMenu: {
//           chat: menu === "chat",
//           qna: menu === "qna",
//         },
//       })),
//   },
// }));

// export const usePersonMenuState = () => useEditorMenuStore((state) => state.personMenu);

// export const useEditorMenuActions = () => useEditorMenuStore((state) => state.actions);

import { create } from "zustand";

interface PersonMenuType {
  compile: boolean;
  qna: boolean;
}

interface UseEditorMenuStoreType {
  personMenu: PersonMenuType;
  actions: {
    setPersonMenu: (menu: keyof PersonMenuType) => void;
  };
}

const useEditorMenuStore = create<UseEditorMenuStoreType>((set) => ({
  personMenu: {
    compile: true,
    qna: false,
  },

  actions: {
    setPersonMenu: (menu) =>
      set((state) => ({
        personMenu: {
          compile: menu === "compile",
          qna: menu === "qna",
        },
      })),
  },
}));

export const usePersonMenuState = () => useEditorMenuStore((state) => state.personMenu);

export const useEditorMenuActions = () => useEditorMenuStore((state) => state.actions);
