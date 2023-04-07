const store = require("./rtk/app/store");
const { fetchData, fetchTaggedVidoes } = require("./rtk/features/fetchDataslice/fetchDataSlice");

async function dispatches(){
    await store.dispatch(fetchData());
    store.dispatch(fetchTaggedVidoes());
}
dispatches();