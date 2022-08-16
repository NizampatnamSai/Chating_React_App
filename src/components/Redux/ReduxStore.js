

import { configureStore } from '@reduxjs/toolkit'
import redux_reducer from './ReduxSlice'

export const store=configureStore({
    reducer:({
        reduxstore:redux_reducer
    })
})


