import { createSlice } from "@reduxjs/toolkit"


const initialState={
    inboxData:[],
    unread:0,
    getReq:true
}
const InboxReducer=createSlice({
    name:"inBox",
    initialState:initialState,
    reducers:{
        updateGet(state){
            state.getReq=!state.getReq
        },
        changeInbox(state,actions){
            state.inboxData=actions.payload
        },
        updateUnread(state, actions){
            state.unread=actions.payload
        },
    }
});

export const InboxActions=InboxReducer.actions;
export default InboxReducer.reducer;