function formatString(input:string): string {
    const words = input.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
    const formatted = words.map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');

    return formatted;
}
export default formatString;
