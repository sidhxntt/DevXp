import fetchContentfulData from '../ContentfulDataFetching';

const get_OLTP_data = () => fetchContentfulData('oltp');
const get_OLAP_data = () => fetchContentfulData('olap');
const get_DataMining_data = () => fetchContentfulData('olapDataMining');
const get_SQL_data = () => fetchContentfulData('sql');

export  {
    get_OLTP_data,
    get_OLAP_data,
    get_DataMining_data,
    get_SQL_data
};
