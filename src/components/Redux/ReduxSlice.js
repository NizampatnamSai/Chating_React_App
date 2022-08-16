import { createSlice } from "@reduxjs/toolkit";

export const ReduxSlice=createSlice({
    name:'reduxslice',
    initialState:{
        userinfo:[],
        groupinfo:[],
        admininfo:false

        

    },
       
    reducers:{
    groupInfoact:(state,action)=>{
        state.groupinfo=action.payload
    },

    adminInfo:(state,action)=>{
        state.admininfo=action.payload
    }

}
})

export const {groupInfoact,adminInfo}=ReduxSlice.actions

export const Selectgroupinfo=(state)=>state.reduxstore.groupinfo
export const Selectadmininfo=(state)=>state.reduxstore.admininfo


export default ReduxSlice.reducer