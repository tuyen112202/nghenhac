import axios from '~/axios';

export const apiSearch = (keyword) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/search',
                method: 'get',
                params: { keyword }
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });