
import { create } from "zustand";
interface videoStoreType  {
  cam : boolean;
  voice: boolean;
}


interface videoChatStoreType {
  myVideo : videoStoreType 
  remoteVideo : videoStoreType


  actions : {
    setMyCam:()  => void;
    setMyVoice: () => void;


    setRemoteVoice: (newState:boolean) => void;
    setRemoteCam:(newState:boolean)  => void;
  }
}


 const useVideoChatStore = create< videoChatStoreType>((set) => ({
  myVideo : {
    cam : true,
    voice : true,
  },
  remoteVideo : {
    cam : true,
    why : true ,
    voice :true,

  },
 
  actions : { 

    setMyCam: () => {
      set((prevState) => ({
       myVideo: {...prevState.myVideo , cam : !prevState.myVideo.cam },
      }));
    },

    setMyVoice: () => {
      set((prevState) => ({
       myVideo: {...prevState.myVideo , voice : !prevState.myVideo.voice },
      }));
    },


    
    setRemoteCam:  (newCam) => set(state => ({
      remoteVideo: {
        ...state.remoteVideo,
        cam: newCam,
      }
    })),
    


    setRemoteVoice: (newVoice) => set(state => ({
      remoteVideo: {
        ...state.remoteVideo,
        voice: newVoice,
      }
    }))

   

  },

}));





export const useMyCamState= () => useVideoChatStore ((state) => state.myVideo.cam)
export const useMyVoiceState= () =>  useVideoChatStore((state) => state.myVideo.voice)
export const useRemoteCamState= () => useVideoChatStore ((state) => state.remoteVideo.cam)
export const useRemoteVoiceState= () =>  useVideoChatStore((state) => state.remoteVideo.voice)
// 🎉  모든 action을 위한 하나의 selector
export const useVideoChatActions= () => useVideoChatStore ((state) => state.actions) 