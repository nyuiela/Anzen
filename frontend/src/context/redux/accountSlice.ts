import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Profile {
   exists: boolean,
   owner: string,
   privacy: number,
   tokenId: number,
   username: string,
   vaults: []
}
const initialState: Profile = {
   exists: false,
   owner: "",
   privacy: 0,
   tokenId: 0,
   username: "",
   vaults: []
}

export const accountSlice = createSlice({
   name: "account",
   initialState: {
      account: initialState
   },
   reducers: {
      setAccount: (state, action: PayloadAction<Profile>) => {
         state.account = action.payload
      }
   }
})

// const getAccountAsync = createAsyncThunk(
//    "account/getAccountAsync",
//    async () => {
//       const response = await 
//    }
// )

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer