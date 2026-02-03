import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null,
    role: null,
    loading: true,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state , action ) =>{
            state.status = true;
            state.userData = action.payload;
            state.role = action.payload?.prefs?.role || "user";
             state.loading = false;
        },

        logout:(state) =>{
            state.status = false;
            state.userData = null;
            state.role = null;
            state.loading = false;
        },

        setLoading: (state, action) => {
        state.loading = action.payload;
        },
        
    }
})

const authSliceReducer = authSlice.reducer;

export const {login ,logout , setLoading } = authSlice.actions;

export default authSliceReducer;