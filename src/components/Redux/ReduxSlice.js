import { createSlice } from "@reduxjs/toolkit";

export const ReduxSlice=createSlice({
    name:'reduxslice',
    initialState:{
        userinfo:[
            'we'
        ],
        groupinfo:[],
        admininfo:false

        

    },
       
    reducers:{
    groupInfoact:(state,action)=>{
        state.groupinfo=action.payload
    },

    adminInfo:(state,action)=>{
        state.admininfo=action.payload
    },
    userInfo:(state,action)=>{
        state.userinfo=action.payload
    }

}
})

export const {groupInfoact,adminInfo,userInfo}=ReduxSlice.actions

export const Selectgroupinfo=(state)=>state.reduxstore.groupinfo
export const Selectadmininfo=(state)=>state.reduxstore.admininfo
export const Selectuserinfo=(state)=>state.reduxstore.userinfo


export default ReduxSlice.reducer