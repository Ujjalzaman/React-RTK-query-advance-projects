const { request,success, failed } = require("../action");
const fetch = require('node-fetch');
const fetchPosts = () =>{
    return async(dispatch) =>{
        try{
            dispatch(request());
            const resopons = await fetch('https://jsonplaceholder.typicodes.com/posts?_limit=5');
            const posts = await resopons.json();
            dispatch(success(posts));
        }catch(err){
            dispatch(failed(err));
        }
    }
}

module.exports = fetchPosts;