export const normalizeUrl = (urlString) => {
  try {
    return new URL(urlString).href;
  } catch(e) {
    if (urlString.startsWith('www')) {
      return normalizeUrl(`http://${urlString}`);
    }
  }
};