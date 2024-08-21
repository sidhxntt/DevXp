import fetchContentfulData from '../ContentfulDataFetching';

const get_cloudcomputing_data = () => fetchContentfulData('cloudComputing');
const get_AWS_data = () => fetchContentfulData('aws');

export  {
get_cloudcomputing_data,
get_AWS_data
};
