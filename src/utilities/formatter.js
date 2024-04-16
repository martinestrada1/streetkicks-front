export const formatter = (price)=>{
    const formattedPrice = price.toLocaleString('es-MX');
    return {formattedPrice};
}