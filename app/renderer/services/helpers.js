export const parseHistogramData = (dataE, dataP) => {
  const parsedData = [];
  for (const value in dataE) {
    parsedData.push({
      name: value,
      etalon: dataE[value],
      pattern: dataP[value],
    });
  }
  return parsedData;
};

export const initImage = (image) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  return canvas;
};
export const calculateFrequency = (data) => {
  const pixelMatrix = [];
  for (let i = 0; i < data.length; i += 4) {
    pixelMatrix[i / 4] = data[i];
  }
  const frequency = pixelMatrix.reduce((pixels, pixel) => {
    if (pixel in pixels) {
      pixels[pixel]++;
    } else {
      pixels[pixel] = 1;
    }
    return pixels;
  }, {});
  return frequency;
};
export const calculateCumulativeFrequency = (data) => {
  const frequency = calculateFrequency(data);
  const sumHisto = {};
  let sum = 0;
  for (const freq in frequency) {
    sum += frequency[freq];
    sumHisto[freq] = sum;
  }
  return sumHisto;
};
