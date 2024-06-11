import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from '../../axios/axios'


export const fetchLogin = createAsyncThunk('fetchLogin', async (params) => {
    try {
        const {data} = await instance.post('login', params)
        localStorage.setItem("token", data.token)
        return data
    } catch (e) {
        return e.response.data.message
    }
})

export const fetchRegister = createAsyncThunk('fetchRegister', async (params) => {
    try {
        const {data} = await instance.post('secret', params)
        localStorage.setItem("token", data.token)
        return data
    } catch (e) {
        return e.response.data.message
    }
})

export const fetchMe = createAsyncThunk('fetchMe', async () => {
    try {
        const {data} = await instance.get('/me')
        return data
    } catch (e) {
        console.log(e)
    }
})
const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        status: 'loading',
        error: null,
    },
    reducers: {
        signOut: (state, action) => {
            state.data = null
            state.status = "Ready"
            localStorage.removeItem('token')
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            if (!action.payload?.token) {
                state.data = null
                state.error = action.payload
                state.status = "Error"
            } else {
                state.data = action.payload
                state.status = "Ready"
                state.error = null
            }
        })
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            if (!action.payload?.token) {
                state.data = null
                state.error = action.payload
                state.status = "Error"
            } else {
                state.data = action.payload
                state.status = "Ready"
                state.error = null
            }
        })
        builder.addCase(fetchMe.fulfilled, (state, action) => {
                state.data = action.payload
                state.error = null
                state.status = "Ready"
        })

    }
})

export const {signOut} = userSlice.actions
export default userSlice.reducer