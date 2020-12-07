import actionTypes from "../types";

const initialState = {
  etalon: null,
  pattern: null,
  etalonOriginal: null,
  patternOriginal: null,
  image: null,
  kCount: 3,
  threshold: 30,
  loading: false,
  clusterized: false,
  grayscaled: false,
  patternCumulative: [],
  etalonCumulative: [],
  cumulative: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ETALON:
      return {
        ...state,
        etalonOriginal: action.payload.data,
        etalon: action.payload.data.src,
      };
    case actionTypes.LOAD_PATTERN:
      return {
        ...state,
        patternOriginal: action.payload.data,
        pattern: action.payload.data.src,
      };
    case actionTypes.INIT_CANVAS:
      return {
        ...state,
        canvas: action.payload.data,
      };
    case actionTypes.RESTORE_ORIGINAL:
      return {
        ...state,
        pattern: state.patternOriginal.src,
        etalon: state.etalonOriginal.src,
      };
    case actionTypes.CLEAR_CANVAS:
      return {
        ...state,
        clusterized: false,
        grayscaled: false,
      };
    case actionTypes.PROCEED_IMAGE:
      return {
        ...state,
        etalon: action.payload.data.etalon,
        pattern: action.payload.data.pattern,
      };
    case actionTypes.SET_THRESHOLD:
      return {
        ...state,
        threshold: action.payload.data,
      };
    case actionTypes.IMAGE_CLUSTERIZE:
      return {
        ...state,
        clusterized: true,
      };
    case actionTypes.IMAGE_GRAYSCALE:
      return {
        ...state,
        grayscaled: true,
      };
    case actionTypes.SET_KCOUNT:
      return {
        ...state,
        kCount: action.payload.data,
      };
    case actionTypes.IMAGE_CUMULATIVE:
      localStorage.clear();
      localStorage.setItem("cumulative", JSON.stringify(action.payload.data));
      return {
        ...state,
        cumulative: action.payload.data,
      };
    case actionTypes.IMAGE_CUMULATIVE_CLUSTERIZED:
      return {
        ...state,
        cumulativeClusterizedData: action.payload.data,
      };
    default:
      return {
        ...state,
      };
  }
};
export default mainReducer;
