import { FETCHING_ARTICLES, FETCHING_ARTICLES_SUCCESS, FETCHING_ARTICLES_FAILED,
         FETCHING_MY_ARTICLES, FETCHING_MY_ARTICLES_SUCCESS, FETCHING_MY_ARTICLES_FAILED,
         CREATING_ARTICLE, CREATING_ARTICLE_SUCCESS, CREATING_ARTICLE_FAILED, CLEAR_CREATING_ARTICLE,
         FETCHING_ARTICLE_DETAILS, FETCHING_ARTICLE_DETAILS_SUCCESS, FETCHING_ARTICLE_DETAILS_FAILED,
         CLEARING_FETCHING_ARTICLE_DETAILS, ADDING_COMMENT_TO_ARTICLE, ADDING_COMMENT_TO_ARTICLE_SUCCESS,
         ADDING_COMMENT_TO_ARTICLE_FAILED, CLEAR_ADDING_COMMENT_TO_ARTICLE,
         FETCHING_COMMENT_OF_ARTICLE, FETCHING_COMMENT_OF_ARTICLE_SUCCESS, FETCHING_COMMENT_OF_ARTICLE_FAILED,
         CLEAR_FETCHING_COMMENT_OF_ARTICLE, DELETING_COMMENT, DELETING_COMMENT_SUCCESS, DELETING_COMMENT_FAILED,
         CLEAR_DELETING_COMMENT } from '../actions/types';

const initialState = {
    feedArticles: [],
    myArticles: [],
    
    fetchingArticles: false,
    fetchingMyArticles: false,
    errorMessage: null,
    
    creatingArticle: false,
    createdArticle: null,
    creatingArticleFailed: null,
    
    fetchingDetailedArticle: false,
    fetchedDetailedArticle: null,
    fetchedDetailedArticleFailed: null,

    addingCommentToArticle:false,
    addedCommentToArticle:false,
    failedAddingCommentToArticle:false,

    fetchingCommentOfArticle: false,
    fetchingCommentsOfArticleSuccess: false,
    fetchingCommentsOfArticleFailed: false,
    fetchedCommentofArticle: null,

    deletingComment: false,
    deletingCommentSuccessfully: false,
    deletingCommentFailed: false

};


export default (state = initialState, action) =>{
    switch(action.type) {
        case FETCHING_ARTICLES:
            return {...state, fetchingArticles:true, feedArticles: [], errorMessage: null};
        case FETCHING_ARTICLES_SUCCESS:
            return {...state, fetchingArticles:false, feedArticles: action.payload.articles, errorMessage: null};
        case FETCHING_ARTICLES_FAILED:
            return {...state, fetchingArticles:false, feedArticles: [], errorMessage: action.payload};
        case FETCHING_MY_ARTICLES:
            return{...state, fetchingMyArticles:true, myArticles:[], errorMessage: null};
        case FETCHING_MY_ARTICLES_SUCCESS:
            return {...state, fetchingMyArticles: false, myArticles: action.payload.articles, errorMessage: null};
        case FETCHING_MY_ARTICLES_FAILED:
            return {...state, fetchingMyArticles: false, myArticles: [], errorMessage: action.payload};
        case CREATING_ARTICLE:
            return {...state, creatingArticle:true, createdArticle: null, creatingArticleFailed: null };
        case CREATING_ARTICLE_SUCCESS:
            return {...state, creatingArticle: false, createdArticle: action.payload, creatingArticleFailed: null};
        case CREATING_ARTICLE_FAILED:
            return {...state, creatingArticle: false, createdArticle: null, creatingArticleFailed: action.payload};
        case CLEAR_CREATING_ARTICLE:
        return {...state, creatingArticle: false, createdArticle: null, creatingArticleFailed: null};
        case FETCHING_ARTICLE_DETAILS:
            return {...state, fetchingDetailedArticle: true, fetchedDetailedArticle: null, fetchedDetailedArticleFailed: null};
        case FETCHING_ARTICLE_DETAILS_SUCCESS:
            return {...state, fetchingDetailedArticle: false, fetchedDetailedArticle: action.payload};
        case FETCHING_ARTICLE_DETAILS_FAILED:
            return {...state, fetchingDetailedArticle: false, fetchedDetailedArticleFailed: action.payload};
        case CLEARING_FETCHING_ARTICLE_DETAILS:
            return {...state, fetchingDetailedArticle: false, fetchedDetailedArticle: null, fetchedDetailedArticleFailed: null};
        case ADDING_COMMENT_TO_ARTICLE:
            return {...state, addingCommentToArticle:true, addedCommentToArticle:false, failedAddingCommentToArticle:false};
        case ADDING_COMMENT_TO_ARTICLE_SUCCESS:
            return {...state, addingCommentToArticle:true, addedCommentToArticle:true, failedAddingCommentToArticle:false};
        case ADDING_COMMENT_TO_ARTICLE_FAILED:
            return {...state, addingCommentToArticle:false, addedCommentToArticle:false, failedAddingCommentToArticle:true};
        case CLEAR_ADDING_COMMENT_TO_ARTICLE:
            return {...state, addingCommentToArticle:false, addedCommentToArticle:false, failedAddingCommentToArticle:false};
        case FETCHING_COMMENT_OF_ARTICLE: 
            return {...state, fetchingCommentOfArticle: true, fetchingCommentsOfArticleSuccess:false, fetchingCommentsOfArticleFailed:false,
                fetchedCommentofArticle: null};
        case FETCHING_COMMENT_OF_ARTICLE_SUCCESS: 
            return {...state, fetchingCommentOfArticle: false, fetchingCommentsOfArticleSuccess:true, fetchingCommentsOfArticleFailed:false,
                fetchedCommentofArticle: action.payload};
        case FETCHING_COMMENT_OF_ARTICLE_FAILED: 
            return {...state, fetchingCommentOfArticle: false, fetchingCommentsOfArticleSuccess:false, fetchingCommentsOfArticleFailed:true,
                fetchedCommentofArticle: null};
        case CLEAR_FETCHING_COMMENT_OF_ARTICLE:
            return {...state, fetchingCommentOfArticle: false, fetchingCommentsOfArticleSuccess:false, fetchingCommentsOfArticleFailed:false,
                fetchedCommentofArticle: null};

        case DELETING_COMMENT:
            return  {...state, deletingComment: true, deletingCommentSuccessfully: false, deletingCommentFailed: false}
        case DELETING_COMMENT_SUCCESS:
            return  {...state, deletingComment: false, deletingCommentSuccessfully: true, deletingCommentFailed: false}
        case DELETING_COMMENT_FAILED: 
            return  {...state, deletingComment: false, deletingCommentSuccessfully: false, deletingCommentFailed: true}
        case CLEAR_DELETING_COMMENT:
            return  {...state, deletingComment: false, deletingCommentSuccessfully: false, deletingCommentFailed: false}
        default:
            return state;
    }

}