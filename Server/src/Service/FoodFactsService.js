export default async function OpenFoodFacts(barcode) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}`
    );

    const data = await response.json();

    // Valida se o produto realmente existe na base
    if (data.status !== 1 || !data.product) {
        throw new Error("Produto não encontrado.");
    }

    const product = data.product;
    
    // Fallbacks de segurança caso o produto não tenha essas notas
    const nutriscore = product.nutriscore_grade ? product.nutriscore_grade.toLowerCase() : 'c';
    const nova = product.nova_group || 1;

    const impact = calcImpact(nutriscore, nova);

    return {
      name: product.product_name || "Produto sem nome",
      impact,
    };

  } catch (error) {
    console.error("Erro no OpenFoodFacts:", error.message);
    throw error;
  }
}

function calcImpact(nutriScore, nova) {
  const scorePoints = {
    a: +20,
    b: +10,
    c: 0,
    d: -10,
    e: -20,
  };

  const novaPenalty = {
    1: 0,
    2: -5,
    3: -10,
    4: -15,
  };

  return (
    (scorePoints[nutriScore] ?? 0) +
    (novaPenalty[nova] ?? 0)
  );
}