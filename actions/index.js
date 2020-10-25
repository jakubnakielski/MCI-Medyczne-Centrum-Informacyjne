import axios from 'axios';
import io from 'socket.io-client';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

const ADDRESS = 'api.rdnt.pl';

export const authenticateAction = (username, password) => {
    return function (dispatch) {
        dispatch({ type: `${AUTH_REQUEST}` });

        return axios.post(`http://${ADDRESS}:9000/api/user/login`, {
            username,
            password
        })
            .then(result => {
                dispatch({ type: `${AUTH_SUCCESS}`, payload: result });
                console.log('AUTH_SUCCESS');
            })
            .catch(err => {
                dispatch({ type: `${AUTH_FAILURE}`, payload: err });
                console.log('AUTH_FAILURE', err);
            });
    }
}

export const registerAction = (username, password) => {
    return function (dispatch) {
        dispatch({ type: `${REGISTER_REQUEST}` });

        return axios.post(`http://${ADDRESS}:9000/api/user/register`, {
            username,
            password
        })
            .then(result => {
                dispatch({ type: `${REGISTER_SUCCESS}`, payload: result });
                console.log('REGISTER_SUCCESS');
            })
            .catch(err => {
                dispatch({ type: `${REGISTER_FAILURE}`, payload: err });
                console.log('REGISTER_FAILURE', err);
            });
    }
}

export const logoutAction = () => {
    return function (dispatch) {
        dispatch({ type: `${LOGOUT_REQUEST}` });

        return axios.post(`http://${ADDRESS}:9000/api/user/logout`)
            .then(result => {
                dispatch({ type: `${LOGOUT_SUCCESS}`, payload: result });
                console.log('LOGOUT_SUCCESS');
            })
            .catch(err => {
                dispatch({ type: `${REGISTER_FAILURE}`, payload: err });
                console.log('LOGOUT_FAILURE', err);
            });
    }
}

export const sendMessageAction = () => {
    // const socketConfig = io({
    //     reconnection: true,
    // });
    // const socket = io.connect('http://io.rdnt.pl:5050');
    // socket.on('message', message => {
    //     console.log(message);
    //   });
    // socket.emit('message', 'laduje')
}

