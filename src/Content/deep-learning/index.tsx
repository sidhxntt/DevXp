import fetchContentfulData from '../ContentfulDataFetching';

const get_supervisedAlgorithmsDeepLearning_data = () => fetchContentfulData('supervisedAlgorithmsDeepLearning');
const get_unsupervisedAlgorithmsDeepLearning_data = () => fetchContentfulData('unsupervisedAlgorithmsDeepLearning');

export  {
    get_supervisedAlgorithmsDeepLearning_data,
    get_unsupervisedAlgorithmsDeepLearning_data
};
