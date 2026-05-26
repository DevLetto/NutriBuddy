export default async function OpenFoodFacts(barcode){
    try{
        const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`)

        const data = await response.json()

        return data

    }catch(error){
        console.error("Erron on OpenFoodFacts: ", error.message)
        throw error;
    }
}