import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/data/models";

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserState: (state, action) => {
            console.log('set user dispatch');
            console.log('state ', state);
            console.log('action', action);
            console.log('set user dispatch');
            state.user = action.payload;
        }
    }
})

export const { setUserState } = userSlice.actions;

export default userSlice.reducer;
