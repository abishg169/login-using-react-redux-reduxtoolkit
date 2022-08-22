import { AuthRequest } from "@/data/models";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../../data/api/AuthApi";

interface AuhtState {
    isAuthenticated: boolean;
    token: string;
    loading: 'idle' | 'pending' | 'succeed'
}

const initialState: AuhtState = {
    isAuthenticated: false,
    token: "",
    loading: "idle"
}

export const login = createAsyncThunk(
    'auth/login',
    async (payload: AuthRequest, thunkApi) => {
        console.log('data at thunk', payload);
        // const authRequest: AuthRequest = {
        //     email: data.email,
        //     password: data.password
        // }
        try {
            const authApi = new AuthApi();
            const response = await authApi.loginApi(payload);
            console.log('respons at thunk', response);
            return (response);
        } catch (e) {
            console.log('err', e);
            return thunkApi.rejectWithValue(e)
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // loginAction: (state, action) => {
        //     console.log('login dispatch');
        //     console.log('state ', state);
        //     console.log('action', action);
        //     console.log('login dispatch');
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            console.log('is login start', state)
            startLoading(state);
        })
        builder.addCase(login.fulfilled, (state, action) => {
            console.log('is fulfilled')
            console.log('payload', action);
            console.log('is fulfilled', state.isAuthenticated)
            state.isAuthenticated = action.payload.isAuthenticated;
            state.loading = 'succeed';
            state.token = action.payload.token;
        })
    //     [login.pending]
    //     [login.pending]: startLoading,
    // [login.fulfilled]: (state, { payload }) => {
    //   const { token, user } = payload;

    //   Object.assign(state, {
    //     loading: false,
    //     loggedIn: true,
    //     loggedInUser: user,
    //     token,
    //   });
    // },
    // [login.rejected]: receiveError,
    }
})

function startLoading(state: AuhtState) {
    // Object.assign(state, {
    //     loading: true,
    //     error: null,
    // });
}

// function receiveError(state, action) {
//     Object.assign(state, {
//         loading: false,
//         error: action.error,
//     });
// }

// export const { loginAction } = authSlice.actions;

export default authSlice.reducer;
