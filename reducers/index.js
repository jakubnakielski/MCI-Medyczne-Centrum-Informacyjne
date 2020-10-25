import {
    AUTH_SUCCESS, AUTH_REQUEST, AUTH_FAILURE,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '../actions';

const initialState = {
    isLoading: false,
    error: '',
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userID: action.payload.data._id,
                username: action.payload.data.username,
            }
        case AUTH_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }


        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userID: null,
                username: null,
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }


        case REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }


        default:
            return state;
    }
}

export default rootReducer;