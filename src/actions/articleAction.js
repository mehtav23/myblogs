import { FETCHING_ARTICLES, FETCHING_ARTICLES_SUCCESS, FETCHING_ARTICLES_FAILED, CLEAR_FETCHING_ARTICLES,
        FETCHING_MY_ARTICLES, FETCHING_MY_ARTICLES_SUCCESS, FETCHING_MY_ARTICLES_FAILED, CLEAR_FETCHING_MY_ARTICLES,
        CREATING_ARTICLE, CREATING_ARTICLE_SUCCESS, CREATING_ARTICLE_FAILED,
        CLEAR_CREATING_ARTICLE, FETCHING_ARTICLE_DETAILS, FETCHING_ARTICLE_DETAILS_SUCCESS, FETCHING_ARTICLE_DETAILS_FAILED,
        CLEARING_FETCHING_ARTICLE_DETAILS, ADDING_COMMENT_TO_ARTICLE, ADDING_COMMENT_TO_ARTICLE_SUCCESS,
        ADDING_COMMENT_TO_ARTICLE_FAILED, CLEAR_ADDING_COMMENT_TO_ARTICLE,
        FETCHING_COMMENT_OF_ARTICLE, FETCHING_COMMENT_OF_ARTICLE_SUCCESS, FETCHING_COMMENT_OF_ARTICLE_FAILED,
        CLEAR_FETCHING_COMMENT_OF_ARTICLE, DELETING_COMMENT, DELETING_COMMENT_SUCCESS, DELETING_COMMENT_FAILED,
        CLEAR_DELETING_COMMENT, DELETING_ARTICLE, DELETING_ARTICLE_SUCCESS, DELETING_ARTICLE_FAILED,
        CLEAR_DELETING_ARTICLE, FETCHING_ARTICLE_DETAILS_FOR_EDIT, FETCHING_ARTICLE_DETAILS_FOR_EDIT_SUCCESS,
        FETCHING_ARTICLE_DETAILS_FOR_EDIT_FAILED, CLEAR_FETCHING_FOR_EDIT, UPDATING_ARTICLE, UPDATING_ARTICLE_SUCCESS,
        UPDATING_ARTICLE_FAILED, CLEAR_UPDATING_ARTICLE} from './types';

import axios from '../apis';
import getAuthHeader from './headerToken';
import createBrowserHistory from '../history';




export const fetchArticles = (offset) =>{
    return async (dispatch) => {
        try {
            dispatch({type: FETCHING_ARTICLES});
            if(offset===0){
                dispatch({type: CLEAR_FETCHING_ARTICLES});
            }
            const response = await axios.get(`/articles?limit=10&offset=${offset?offset:0}`);
            console.log('Articles data',response.data);
            dispatch({type: FETCHING_ARTICLES_SUCCESS, payload: response.data});

        } catch(error) {
            dispatch({type: FETCHING_ARTICLES_FAILED, payload: error});
        }
    }
}

export const fetchMyArticles = (offset) => {
    return async (dispatch, getState) => {
        try{
            dispatch({type:FETCHING_MY_ARTICLES});
            if(offset===0){
                dispatch({type: CLEAR_FETCHING_MY_ARTICLES});
            }
            const {user} = getState().auth.user;
            const userName = user.username;
            const response = await axios.get(`/articles?limit=10&offset=${offset?offset:0}&author=${userName}`);
            console.log(response.data);
            dispatch({type:FETCHING_MY_ARTICLES_SUCCESS, payload: response.data});
        }catch(error) {
            console.log(error);
            dispatch({type:FETCHING_MY_ARTICLES_FAILED, payload:error});
        }
    }
}


export const createArticle = (formValues) => {
    return async (dispatch) =>{
        try{
            dispatch({type:CREATING_ARTICLE});
            const headers = getAuthHeader();
            const article = formValues;
            const response = await axios.post('/articles', {article: article}, {headers: headers});
            console.log('createdArticle',response.data);
            dispatch({type: CREATING_ARTICLE_SUCCESS, payload: response.data});
            setTimeout(()=>{
                dispatch(clearCreateArticleForm());
            },3000)
        } catch(error) {
            console.log(error);
            dispatch({type: CREATING_ARTICLE_FAILED, payload: error});
        }
    }
}

export const clearCreateArticleForm = () =>{
    return {
        type: CLEAR_CREATING_ARTICLE
    }
}

export const fetchArticleBySlug = (slug) => {
    return async (dispatch) => {
        try {
            dispatch({type: FETCHING_ARTICLE_DETAILS});
            const response = await axios.get(`/articles/${slug}`);
            console.log('Article Fetched', response.data);
            dispatch({type: FETCHING_ARTICLE_DETAILS_SUCCESS, payload: response.data});
            dispatch(fetchCommentsOfArticle(slug));
        } catch(error) {
            console.log('error occured', error);
            dispatch({type: FETCHING_ARTICLE_DETAILS_FAILED, payload: error});
        }
    }
}

export const clearFetchedArticleDetails= () => {
    return {
        type: CLEARING_FETCHING_ARTICLE_DETAILS
    }
}

export const addCommentToArticle = (slug, formValues) =>{
    return async(dispatch) => {
        dispatch({type:ADDING_COMMENT_TO_ARTICLE});
        try{
            const headers = getAuthHeader();
            const data = {
                comment: formValues
            }
            const response = await axios.post(`/articles/${slug}/comments`, data ,{headers: headers});
            console.log('response from adding comment', response.data);
            dispatch({type: ADDING_COMMENT_TO_ARTICLE_SUCCESS, payload:response.data});
            dispatch(fetchCommentsOfArticle(slug));
        } catch(error) {
            console.log('Error occured while adding comment', error);
            const [key, errorStatement] = Object.entries(error.response.data.errors)[0];
            dispatch({type: ADDING_COMMENT_TO_ARTICLE_FAILED, payload:key +' '+errorStatement});
        }
        
    }
}
export const clearAddingComment = () => {
    return {
        type: CLEAR_ADDING_COMMENT_TO_ARTICLE
    }
}

export const fetchCommentsOfArticle = (slug) =>{
    return async(dispatch) => {
        dispatch({type:FETCHING_COMMENT_OF_ARTICLE});
        try{
            const response = await axios.get(`/articles/${slug}/comments`);
            console.log('response of getting comment', response.data);
            dispatch({type: FETCHING_COMMENT_OF_ARTICLE_SUCCESS, payload:response.data});
        } catch(error) {
            console.log('Error occured while fetching comment', error);
            const [key, errorStatement] = Object.entries(error.response.data.errors)[0];
            dispatch({type: FETCHING_COMMENT_OF_ARTICLE_FAILED, payload:key + ' '+errorStatement});
            setTimeout(()=>{
                dispatch(clearFetchingComments());
            },3000);
        }
        
    }
}

export const clearFetchingComments = () => {
    return {
        type: CLEAR_FETCHING_COMMENT_OF_ARTICLE
    }
}


export const deleteComment = (slug, key) => {
    return async (dispatch) => {
        dispatch({type: DELETING_COMMENT});
        try{
            const headers = getAuthHeader();
            const response = await axios.delete(`/articles/${slug}/comments/${key}`, {headers: headers});
            console.log(response.data);
            dispatch({type: DELETING_COMMENT_SUCCESS});
            dispatch(fetchCommentsOfArticle(slug));
            setTimeout(()=>{
                dispatch(clearDeletingComment());
            },3000);
        }catch(error) {
            console.log('Error while deleting comment', error);
            dispatch({type: DELETING_COMMENT_FAILED, payload: error});
        }   
    }
}


export const clearDeletingComment = () => {
    return {
        type: CLEAR_DELETING_COMMENT
    }
}

export const deleteArticle = (slug)=> {
    return async(dispatch) => {
        dispatch({type:DELETING_ARTICLE});
        try{
            const headers = getAuthHeader();
            const response = await axios.delete(`/articles/${slug}`, {headers: headers});
            console.log('Deleted article', response.data);
            dispatch({type: DELETING_ARTICLE_SUCCESS, payload:  response.data});
            createBrowserHistory.push('/');
            dispatch({type: CLEAR_DELETING_ARTICLE});
        }catch(error){
            console.log('error occured', error);
            dispatch({type: DELETING_ARTICLE_FAILED, payload: error});
        }
    }
}

export const clearDeletingArticle = () => {
    return {
        type: CLEAR_DELETING_ARTICLE
    }
}


export const fetchArticleForEdit = (slug) => {
    return async (dispatch) => {
        try {
            dispatch({type: FETCHING_ARTICLE_DETAILS_FOR_EDIT});
            const response = await axios.get(`/articles/${slug}`);
            console.log('Article Fetched', response.data);
            dispatch({type: FETCHING_ARTICLE_DETAILS_FOR_EDIT_SUCCESS, payload: response.data});
        } catch(error) {
            console.log('error occured', error);
            const [key, errorStatement] = Object.entries(error.response.data.errors)[0];
            dispatch({type: FETCHING_ARTICLE_DETAILS_FOR_EDIT_FAILED, payload: key+ ' '+ errorStatement});
        }
    }
}

export const clearFetchingForEdit = ()=>{
    return {
        type: CLEAR_FETCHING_FOR_EDIT
    }
}


export const updateArticle = (formValues) => {
    return async (dispatch) => {
        dispatch({type: UPDATING_ARTICLE});
        const {slug, title, description, body,tagList} = formValues;
        const payload = {title,description, body, tagList};
        const headers = getAuthHeader();
        try{
            const response = await axios.put(`/articles/${slug}`, {article: payload}, {headers: headers});
            console.log('response', response.data);
            dispatch({type:UPDATING_ARTICLE_SUCCESS, payload: response.data});
            setTimeout(() => {
                dispatch({type:CLEAR_UPDATING_ARTICLE});
            }, 3000);
        }catch(error){
            console.log('error occured', error);
            const [key, errorStatement] = Object.entries(error.response.data.errors)[0];
            dispatch({type:UPDATING_ARTICLE_FAILED, payload: key+ ' '+ errorStatement});
            setTimeout(() => {
                dispatch({type:CLEAR_UPDATING_ARTICLE});
            }, 3000);
        }
    }
}