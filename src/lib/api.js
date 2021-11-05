import axios from 'axios';

const developmentUrl = 'http://localhost:8003/welcome';
const productionUrl = 'https://dtswv3x7ga.execute-api.ap-northeast-2.amazonaws.com/prod/welcome';

export const fetchApi = async (url, data, options = {}) => {
  try {
    let apiUrl = '';
    if (process.env.NODE_ENV !== 'production') {
      apiUrl = developmentUrl;
    } else {
      apiUrl = productionUrl;
    }

    const response = await axios({
      method: 'post',
      url: apiUrl + url,
      headers: {
        'content-type': 'application/json',
        ...options.headers,
      },
      data: data,
    }).catch(err => {
      throw err;
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw Object.assign(new Error('api error'), {
        status: response.status,
      });
    }
  } catch (err) {
    throw err;
  }
};

export const fetchMultipartApi = async (url, data, options = {}) => {
  try {
    let apiUrl = '';
    if (process.env.NODE_ENV !== 'production') {
      apiUrl = developmentUrl;
    } else {
      apiUrl = productionUrl;
    }

    const response = await axios({
      method: 'post',
      url: apiUrl + url,
      headers: {
        'content-type': 'multipart/form-data',
        ...options.headers,
      },
      data: data,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw Object.assign(new Error('api error'), {
        status: response.status,
      });
    }
  } catch (err) {
    throw err;
  }
};
