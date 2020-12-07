const arrays_equal = (a1, a2) => {
  if (a1.length !== a2.length) return false;
  for (let i = 0; i < a1.length; ++i) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
};

const rescale_dimensions = (w, h, pixels) => {
  const aspect_ratio = w / h;
  const scaling_factor = Math.sqrt(pixels / aspect_ratio);
  const rescaled_w = Math.floor(aspect_ratio * scaling_factor);
  const rescaled_h = Math.floor(scaling_factor);
  return [rescaled_w, rescaled_h];
};

export const get_pixel_dataset = (img, resized_pixels) => {
  if (resized_pixels === undefined) resized_pixels = -1;
  const canvas = document.createElement("canvas");
  const img_n_pixels = img.width * img.height;
  let canvas_width = img.width;
  let canvas_height = img.height;
  if (resized_pixels > 0 && img_n_pixels > resized_pixels) {
    const rescaled = rescale_dimensions(img.width, img.height, resized_pixels);
    canvas_width = rescaled[0];
    canvas_height = rescaled[1];
  }
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  const canvas_n_pixels = canvas_width * canvas_height;
  const context = canvas.getContext("2d");

  context.drawImage(img, 0, 0, canvas_width, canvas_height);
  const flattened_dataset = context.getImageData(
    0,
    0,
    canvas_width,
    canvas_height
  ).data;
  const n_channels = flattened_dataset.length / canvas_n_pixels;
  const dataset = [];
  for (let i = 0; i < flattened_dataset.length; i += n_channels) {
    dataset.push(flattened_dataset.slice(i, i + n_channels));
  }
  return dataset;
};
const nearest_neighbor = (point, neighbors) => {
  let best_dist = Infinity;
  let best_index = -1;
  for (let i = 0; i < neighbors.length; ++i) {
    const neighbor = neighbors[i];
    let dist = 0;
    for (let j = 0; j < point.length; ++j) {
      dist += Math.pow(point[j] - neighbor[j], 2);
    }
    if (dist < best_dist) {
      best_dist = dist;
      best_index = i;
    }
  }
  return best_index;
};
const centroid = (dataset) => {
  if (dataset.length === 0) return [];
  const running_centroid = [];
  for (let i = 0; i < dataset[0].length; ++i) {
    running_centroid.push(0);
  }
  for (let i = 0; i < dataset.length; ++i) {
    const point = dataset[i];
    for (let j = 0; j < point.length; ++j) {
      running_centroid[j] += (point[j] - running_centroid[j]) / (i + 1);
    }
  }
  return running_centroid;
};
export const k_means = (dataset, k) => {
  if (k === undefined) k = Math.min(3, dataset.length);
  let rng_seed = 0;
  const random = () => {
    rng_seed = (rng_seed * 9301 + 49297) % 233280;
    return rng_seed / 233280;
  };
  const centroids = [];
  for (let i = 0; i < k; ++i) {
    const idx = Math.floor(random() * dataset.length);
    centroids.push(dataset[idx]);
  }
  while (true) {
    const clusters = [];
    for (let i = 0; i < k; ++i) {
      clusters.push([]);
    }
    for (let i = 0; i < dataset.length; ++i) {
      const point = dataset[i];
      const nearest_centroid = nearest_neighbor(point, centroids);
      clusters[nearest_centroid].push(point);
    }
    let converged = true;
    for (let i = 0; i < k; ++i) {
      const cluster = clusters[i];
      let centroid_i = [];
      if (cluster.length > 0) {
        centroid_i = centroid(cluster);
      } else {
        const idx = Math.floor(random() * dataset.length);
        centroid_i = dataset[idx];
      }
      converged = converged && arrays_equal(centroid_i, centroids[i]);
      centroids[i] = centroid_i;
    }
    if (converged) break;
  }
  return centroids;
};
export const quantize = (image, colors) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const source_context = canvas.getContext("2d");
  source_context.drawImage(image, 0, 0);
  const flattened_source = source_context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  const flattened_source_data = flattened_source.data;
  const n_pixels = canvas.width * canvas.height;
  const n_channels = flattened_source_data.length / n_pixels;

  const flattened_quantized_data = new Uint8ClampedArray(
    flattened_source_data.length
  );
  const current_pixel = new Uint8ClampedArray(n_channels);
  for (let i = 0; i < flattened_source_data.length; i += n_channels) {
    for (let j = 0; j < n_channels; ++j) {
      current_pixel[j] = flattened_source_data[i + j];
    }
    const nearest_color_index = nearest_neighbor(current_pixel, colors);
    const nearest_color = colors[nearest_color_index];
    for (let j = 0; j < nearest_color.length; ++j) {
      flattened_quantized_data[i + j] = nearest_color[j];
    }
  }

  flattened_source.data.set(flattened_quantized_data);
  source_context.putImageData(flattened_source, 0, 0);
  return canvas.toDataURL();
};
