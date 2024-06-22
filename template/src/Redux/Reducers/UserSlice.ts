import {createSlice} from '@reduxjs/toolkit'

const initialState: {
  userData: any // as per requirement
} = {
  userData: null
}
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = {...(state.userData || {}), ...action.payload}
    },

    logOut: (state) => {
      state.userData = null
    }
  }
})
export const {logOut, setUserData} = UserSlice.actions
export default UserSlice.reducer
