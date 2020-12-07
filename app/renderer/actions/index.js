import { Threshold } from "../services/Threshold";
import { Grayscale } from "../services/Grayscale";

import { get_pixel_dataset, k_means, quantize } from "../services/Cluster";
import  action  from "./action";
import actionTypes from "../types";
import {
  calculateCumulativeFrequency,
  initImage,
  parseHistogramData,
} from "../services/helpers";

export const loadEtalon = (files) => (dispatch) => {
  if (files.length > 0) {
    const file = files[0];
    const fr = new FileReader();
    fr.onloadend = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        dispatch(action(actionTypes.LOAD_ETALON, img));
      };
    };
    fr.readAsDataURL(file);
  }
};

export const loadPattern = (files) => (dispatch) => {
  if (files.length > 0) {
    const file = files[0];
    const fr = new FileReader();
    fr.onloadend = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        console.log("Pattern");
        dispatch(action(actionTypes.LOAD_PATTERN, img));
      };
    };
    fr.readAsDataURL(file);
  }
};

export const setThreshold = (threshold) => (dispatch) => {
  dispatch(action(actionTypes.SET_THRESHOLD, threshold));
};

export const setKCount = (kCount) => (dispatch) => {
  dispatch(action(actionTypes.SET_KCOUNT, kCount));
};

export const restoreOriginal = () => (dispatch) => {
  dispatch(action(actionTypes.RESTORE_ORIGINAL));
};

export const saveResult = () => (dispatch, getState) => {
  const { image, canvas } = getState();
  if (image) {
    let imageType = image.substring(image.indexOf(":") + 1, image.indexOf(";"));
    let link = document.createElement("a");
    link.href = canvas.toDataURL(imageType);
    link.download = "result.png";
    link.click();
    dispatch(action(actionTypes.SAVE_RESULT));
  }
};

export const imageThreshold = () => (dispatch, getState) => {
  dispatch(action(actionTypes.IMAGE_THRESHOLD));
  const { threshold, etalonOriginal, patternOriginal } = getState();
  dispatch(
    action(actionTypes.PROCEED_IMAGE, {
      pattern: Threshold(patternOriginal, threshold),
      etalon: Threshold(etalonOriginal, threshold),
    })
  );
};

export const imageClusterize = () => (dispatch, getState) => {
  dispatch(action(actionTypes.IMAGE_CLUSTERIZE));
  const { kCount, etalonOriginal, patternOriginal } = getState();
  const datasetEtalon = get_pixel_dataset(etalonOriginal, 10);
  const centroidsEtalon = k_means(datasetEtalon, kCount);
  const datasetPattern = get_pixel_dataset(patternOriginal, 10);
  const centroidsPattern = k_means(datasetPattern, kCount);
  dispatch(
    action(actionTypes.PROCEED_IMAGE, {
      pattern: quantize(patternOriginal, centroidsPattern),
      etalon: quantize(etalonOriginal, centroidsEtalon),
    })
  );
};

export const imageGrayscale = () => (dispatch, getState) => {
  dispatch(action(actionTypes.IMAGE_GRAYSCALE));
  const { etalonOriginal, patternOriginal } = getState();
  dispatch(
    action(actionTypes.PROCEED_IMAGE, {
      pattern: Grayscale(patternOriginal),
      etalon: Grayscale(etalonOriginal),
    })
  );
};

export const getData = () => (dispatch, getState) => {
  const { canvas } = getState();
  const context = canvas.getContext("2d");
  const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const pixelMatrix = [];
  console.log(data.length);
  for (let i = 0; i < data.length; i += 4) {
    pixelMatrix[i / 4] = (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
  const frequency = pixelMatrix.reduce(function (pixels, pixel) {
    if (pixel in pixels) {
      pixels[pixel]++;
    } else {
      pixels[pixel] = 1;
    }
    return pixels;
  }, {});
  console.log(frequency);
};

export const imageHistogram = () => (dispatch, getState) => {
  const { etalonOriginal, patternOriginal } = getState();
  const etalonCanvas = initImage(etalonOriginal);
  const patternCanvas = initImage(patternOriginal);
  const patternWidth = patternCanvas.width;
  const patternHeight = patternCanvas.height;
  const etalonWidth = etalonCanvas.width;
  const etalonHeight = etalonCanvas.height;
  const patternData = patternCanvas
    .getContext("2d")
    .getImageData(0, 0, patternWidth, patternHeight).data;
  const etalonData = etalonCanvas
    .getContext("2d")
    .getImageData(0, 0, etalonWidth, etalonHeight).data;
  localStorage.clear();
  const cumulative = parseHistogramData(
    calculateCumulativeFrequency(etalonData),
    calculateCumulativeFrequency(patternData)
  );
  dispatch(action(actionTypes.IMAGE_CUMULATIVE, cumulative));
};
