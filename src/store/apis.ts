import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../lib/api";
import BasicAlerts from "../components/Popup/Popup";



const signin = createAsyncThunk(
    "signin",
    async (data: any, { rejectWithValue }) => {
      try {
        const response = await api.post(`/auth/login`, data);

        return response.data;
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        return rejectWithValue({ error: axiosError?.response });
      }
    }
);

const signup = createAsyncThunk(
    "signup",
    async (data: any, { rejectWithValue }) => {
      try {
        const response = await api.post(`/users/signup`, data);

        return response.data;
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        BasicAlerts({
          success: true,
          message: axiosError?.message
        })
        return rejectWithValue({ error: axiosError?.response });
      }
    }
);

const logout = createAsyncThunk(
  "signin",
  async (_, { rejectWithValue }) => {
    try {
      return [];
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue({ error: axiosError?.response });
    }
  }
);


const getPost = createAsyncThunk(
    "getPost",
    async (id: any, { rejectWithValue }) => {
      try {
        const response = await api.get(`/posts/${id}`);
        return response.data;
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        return rejectWithValue({ error: axiosError?.response });
      }
    }
);

const getPosts = createAsyncThunk(
    "getPosts",
    async (page: any, { rejectWithValue }) => {
      try {
        const response = await api.get(`/posts?page=${page}`);
        return response.data;
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        return rejectWithValue({ error: axiosError?.response });
      }
    }
);

const getPostBySearch = createAsyncThunk(
    "getPosts",
    async (searchQuery: any, { rejectWithValue }) => {
      try {
        const response = await api.get(`/posts/search?searchQuery=${searchQuery.search  ||  'none'}&tags=${searchQuery.tags}`);
        return response.data;
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        return rejectWithValue({ error: axiosError?.response });
      }
    }
);

const createPost = createAsyncThunk(
    "createPost",
    async (data: { postData: any, token: string }, { rejectWithValue }) => {
      try {
        const headers = {
          'Authorization': `Bearer ${data?.token}`,
        };

        const response = await api.post('/posts', data?.postData, { headers });
        return response.data;
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        return rejectWithValue({ error: axiosError?.response });
      }
    }
);

const updatePost = createAsyncThunk(
    "updatePost",
    async (data: { updatedPost: any, token: string, postId: string }, { rejectWithValue }) => {
      try {
        const headers = {
          'Authorization': `Bearer ${data?.token}`,
        };

        const response = await api.patch(`/posts/update/${data?.postId}`, data?.updatedPost, { headers });
        return response.data;
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        return rejectWithValue({ error: axiosError?.response });
      }
    }
);

const likePost = createAsyncThunk(
    "likePost",
    async (data: { postId: string, token: string }, { rejectWithValue }) => {
      const headers = {
        'Authorization': `Bearer ${data?.token}`,
      };

      try {
        const response = await api.put(`/posts/like/${data?.postId}`, {}, { headers });
        return response.data;
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        return rejectWithValue({ error: axiosError?.response });
      }
    }
);

const commentPost = createAsyncThunk(
    "commentPost",
    async (data: {comment: string, id: string, token: string}, { rejectWithValue }) => {
      try {
        const headers = {
          'Authorization': `Bearer ${data?.token}`,
        };

        const response = await api.post(`/comments/${data?.id}`, { message: data?.comment }, { headers });
        return response.data;
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        return rejectWithValue({ error: axiosError?.response });
      }
    }
);

const getComments = createAsyncThunk(
  "getComments",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/comments/all/${id}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue({ error: axiosError?.response });
    }
  }
);

const deletePost = createAsyncThunk(
    "deletePost",
    async (id: any, { rejectWithValue }) => {
      try {
        const response = await api.delete(`/posts/${id}`);
        return response.data;
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        return rejectWithValue({ error: axiosError?.response });
      }
    }
);


const reset = createAction('reset');

export const apis = { signin, signup, logout, getPost, getPosts, getPostBySearch, createPost, updatePost, likePost, commentPost, getComments, deletePost, reset };
