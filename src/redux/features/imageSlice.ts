import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchImages = createAsyncThunk('fetchImages', async (imageQuery:string) => {
    console.log("Image fetching...");

    const unsplashResponse = await fetch(`https://api.unsplash.com/search/photos?query=${imageQuery}&per_page=25&page=2`, {
        headers: {
            Authorization: 'Client-ID tgL7xlD8YxlJJgeZ_-FC8cQgFMfBIntvsJEujJmxB_c'
        }
    })
    return unsplashResponse.json();
})
const images: any = null;

const imageSlice = createSlice({
    name: "image",
    initialState: {
        loading: false,
        error: false,
        images,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchImages.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchImages.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = false;
            state.images = action.payload
        });
        builder.addCase(fetchImages.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }

})

export default imageSlice.reducer;