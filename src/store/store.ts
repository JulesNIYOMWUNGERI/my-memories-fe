import { configureStore, combineReducers } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
 } from 'redux-persist'
import signin from './slices/signin'
import signup from './slices/signup'
import createPost from './slices/createPost'
import getPosts from './slices/getPosts'
import getPost from './slices/getPost'
import updatePost from './slices/updatePost'
import likePost from './slices/likeOnPost'
import commentPost from './slices/commentOnPost'
import getComments from './slices/getComments'
import deletePost from './slices/deletePost'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const reducer = combineReducers({
    signin,
    signup,
    createPost,
    getPosts,
    getPost,
    updatePost,
    likePost,
    commentPost,
    getComments,
    deletePost
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;