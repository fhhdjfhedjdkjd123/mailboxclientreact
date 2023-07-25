import {createSlice} from '@reduxjs/toolkit';

const initialState={
    isAuthenticate:!!localStorage.getItem('email')
};

const AuthReducer=createSlice({
    name:'Authentication',
    initialState:initialState,
    reducers:{
        login(state){
            state.isAuthenticate=true;
        }
    }
})
export const AuthAction=AuthReducer.actions;
export default AuthReducer.reducer;