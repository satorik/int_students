import { applyMiddleware, createStore, combineReducers, compose, Action } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import studentReducer from './studentReducer'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const rootReducer = combineReducers({
  students: studentReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
