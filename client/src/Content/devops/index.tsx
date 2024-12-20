import fetchContentfulData from '../ContentfulDataFetching';

const get_OS_data = () => fetchContentfulData('os');
const get_DevopsEssentials_data = () => fetchContentfulData('devopsEssentials');
const get_DeploymentTechniques_data = () => fetchContentfulData('deploymentTechniques');

export  {
    get_OS_data,
    get_DevopsEssentials_data,
    get_DeploymentTechniques_data
};
