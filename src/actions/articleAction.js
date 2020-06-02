import { FETCHING_ARTICLES, FETCHING_ARTICLES_SUCCESS, FETCHING_ARTICLES_FAILED,
        FETCHING_MY_ARTICLES, FETCHING_MY_ARTICLES_SUCCESS, FETCHING_MY_ARTICLES_FAILED,
        CREATING_ARTICLE, CREATING_ARTICLE_SUCCESS, CREATING_ARTICLE_FAILED,
        CLEAR_CREATING_ARTICLE, FETCHING_ARTICLE_DETAILS, FETCHING_ARTICLE_DETAILS_SUCCESS, FETCHING_ARTICLE_DETAILS_FAILED,
        CLEARING_FETCHING_ARTICLE_DETAILS, ADDING_COMMENT_TO_ARTICLE, ADDING_COMMENT_TO_ARTICLE_SUCCESS,
        ADDING_COMMENT_TO_ARTICLE_FAILED, CLEAR_ADDING_COMMENT_TO_ARTICLE,
        FETCHING_COMMENT_OF_ARTICLE, FETCHING_COMMENT_OF_ARTICLE_SUCCESS, FETCHING_COMMENT_OF_ARTICLE_FAILED,
        CLEAR_FETCHING_COMMENT_OF_ARTICLE, DELETING_COMMENT, DELETING_COMMENT_SUCCESS, DELETING_COMMENT_FAILED,
        CLEAR_DELETING_COMMENT} from './types';

import axios from '../apis';
import getAuthHeader from './headerToken';

import {} from '../history';




export const fetchArticles = (offset) =>{
    return async (dispatch) => {
        try {
            dispatch({type: FETCHING_ARTICLES});
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
            console.log(response.data);
            dispatch({type: CREATING_ARTICLE_SUCCESS, payload: response.data});
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
            dispatch({type: ADDING_COMMENT_TO_ARTICLE_FAILED, payload:error});
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
            console.log('Error occured while adding comment', error);
            dispatch({type: FETCHING_COMMENT_OF_ARTICLE_FAILED, payload:error});
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
            dispatch(clearDeletingComment());
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
