import fetchContentfulData from '../ContentfulDataFetching';

const get_dataPreprocessing_data = () => fetchContentfulData('dataPreprocessing');
const get_Supervised_algorithms_data = () => fetchContentfulData('supervisedAlgorithms');
const get_Unsupervised_algorithms_data = () => fetchContentfulData('algorithms');

export  {
  get_dataPreprocessing_data,
  get_Supervised_algorithms_data,
  get_Unsupervised_algorithms_data
};
