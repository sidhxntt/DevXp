function formatString(input:string): string {
    // Split the string by uppercase letters
    const words = input.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
    
    // Capitalize the first letter of each word and join them back
    const formatted = words.map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');

    return formatted;
}
export default formatString;