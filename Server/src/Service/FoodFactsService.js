export default async function OpenFoodFacts(barcode) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.net/api/v2/product/${barcode}`,
    );

    const data = await response.json()

    const product = data.product

    const impact = calcImpact(product.nutriscore_grade, product.nova_group)

    return {name: product.product_name, impact}

    return data;
  } catch (error) {
    console.error("Erron on OpenFoodFacts: ", error.message);
    throw error;
  }
}

function calcImpact(nutriScore, nova) {
  const scorePoints = { a: +20, b: +10, c: 0, d: -10, e: -20 };
  const novaPenalty = { 1: 0, 2: -5, 3: -10, 4: -15 };
  return (scorePoints[nutriScore] ?? 0) + (novaPenalty[nova] ?? 0);
}
