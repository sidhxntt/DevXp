import fetchContentfulData from "../ContentfulDataFetching";

const get_ComputerNetworks_data = () => fetchContentfulData("computerNetworks");
const get_BackendEssentials_data = () => fetchContentfulData("backendEssentials");
const get_SystemDesign_data = () => fetchContentfulData("systemDesign");

export { 
    get_ComputerNetworks_data,
    get_BackendEssentials_data,
    get_SystemDesign_data
 };
