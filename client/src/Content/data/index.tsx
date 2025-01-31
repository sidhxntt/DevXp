import {fetchContentfulData} from '../ContentfulDataFetching';

const get_DataMining_data = () => fetchContentfulData('olapDataMining');
const get_DataEngneering_data = () => fetchContentfulData('data');

export  {
    get_DataMining_data,
    get_DataEngneering_data
};
