const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")
const { default: fetch } = require("node-fetch")

const initialState = {
    loading: false,
    data: {},
    error: '',
    taggedVideos: [],
    tags: [],
}
const fetchData = createAsyncThunk('vidoes/fetchdata', async () => {
    const reponse = await fetch('http://localhost:9000/videos');
    const res = await reponse.json();
    return res;
})
const fetchTaggedVidoes = createAsyncThunk(
    'videos/fetchTaggedVideos',
    async (_, thunkAPI) => {
        const taggedVideoLink = thunkAPI.getState().videos.tags.join('&tags_like=')
        const taggedResponse = await fetch(
            'http://localhost:9000/videos?tags_like=' + taggedVideoLink
        )
        const taggedVideos = await taggedResponse.json();

        taggedVideos.sort(function (a, b) {
            return (parseFloat(b.views.slice(0, -1))) - (parseFloat(a.views.slice(0, -1)));

        })
        return taggedVideos;
    },
    {
        condition: (userId, { getState, extra }) => {
            const tags = getState().videos.tags;
            return tags[0] ? true : false;
        },
    }
)

const fetchDataSlice = createSlice({
    name: 'fetchData',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = '';
        });
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.data = {};
            state.error = action.error.message;
        });
        //fetch videos with tagged
        builder.addCase(fetchTaggedVidoes.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(fetchTaggedVidoes.fulfilled, (state, action) => {
            state.loading = false;
            state.taggedVideos = action.payload;
            state.error = '';
        });
        builder.addCase(fetchTaggedVidoes.rejected, (state, action) => {
            state.loading = false;
            state.taggedVideos = [];
            state.error = action.error.message;
        });

    }
})

module.exports = fetchDataSlice.reducer;
module.exports.fetchData = fetchData;
module.exports.fetchTaggedVidoes = fetchTaggedVidoes;