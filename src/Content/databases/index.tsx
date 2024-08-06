import fetchContentfulData from '../ContentfulDataFetching';

const get_OLTP_data = () => fetchContentfulData('oltp');

export  {
    get_OLTP_data,

};
