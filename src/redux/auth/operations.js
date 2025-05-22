import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const api = axios.create({
  baseURL: "https://moneyguard-app.onrender.com",
});

const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = ``;
};

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (body, thunkAPI) => {
        try {
            const { data } = await api.post("/auth/register", body);
            setAuthHeader(data.token);
            return data;
        } catch (error) {
            const res = error.response;
            if (res) {
                const status = res.status;
                if (status === 400) {
                    return thunkAPI.rejectWithValue("Incorrect data. Check the form.");
                } else if (status === 401) {
                    return thunkAPI.rejectWithValue("Please log in.");
                } else if (status === 403) {
                    return thunkAPI.rejectWithValue("Access denied.");
                } else if (status === 404) {
                    return thunkAPI.rejectWithValue("Resource not found.");
                } else if (status === 409) {
                    return thunkAPI.rejectWithValue("Email already in use.");
                } else if (status >= 500) {
                    return thunkAPI.rejectWithValue("Server error. Try again later.");
                }
            }
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (body, thunkAPI) => {
        try {
            const { data } = await api.post("auth/login", body);
            const token = data.data.accessToken;
            setAuthHeader(token);

            const userRes = await api.get("/users/me");

            return {
                token,
                user: userRes.data.data,
            };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await api.post("auth/logout");
            clearAuthHeader();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const refreshUser = createAsyncThunk(
    "auth/refresh-session",
    async (__, thunkAPI) => {
        try {
            const savedToken = thunkAPI.getState().auth.token;
            if (savedToken == "") {
                return thunkAPI.rejectWithValue("No token found");
            }
            setAuthHeader(savedToken);

            const { data } = await api.get("/users/me");
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);