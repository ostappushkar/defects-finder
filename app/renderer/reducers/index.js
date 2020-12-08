import actionTypes from '../types';


const mainReducer = (state = {}, action) => {
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
    case actionTypes.RESTORE_ORIGINAL:
      return {
        ...state,
        pattern: state.patternOriginal.src,
        etalon: state.etalonOriginal.src,
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
      return {
        ...state,
        cumulative: action.payload.data,
      };
    case actionTypes.IMAGE_HISTOGRAM:
      return {
        ...state,
        histogram: action.payload.data,
      };
    case actionTypes.IMAGE_CUMULATIVE_CLUSTERIZED:
      return {
        ...state,
        cumulativeC: action.payload.data,
      };
    case actionTypes.IMAGE_HISTOGRAM_CLUSTERIZED:
      return {
        ...state,
        histogramC: action.payload.data,
      };
    default:
      return {
        ...state,
      };
  }
};
export default mainReducer;
