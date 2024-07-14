import IpoData from 'data/IPO/dummy.json';

export const fetchIpoList = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([...IpoData, ...IpoData]);
        }, 50);
    });
};


