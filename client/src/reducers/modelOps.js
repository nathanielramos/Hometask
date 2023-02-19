import { FILE_UPLOADED, FILE_UPLOADFAIL, MODEL_LIST } from "../actions/types";

const initialState = {
    models: [],
    loaderr: false
};

const modelOpsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
    case MODEL_LIST:
        return {
            ...state,
            models: payload
        };
    case FILE_UPLOADFAIL:
        return {
            ...state,
            loaderr: true
        }
    case FILE_UPLOADED:
        return {
            ...state,
            loaderr: false
        };
    default:
        return state;
    }
};

export default modelOpsReducer;
