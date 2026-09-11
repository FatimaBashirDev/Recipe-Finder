const MEAL_DB_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function getJson(path) {
  const response = await fetch(`${MEAL_DB_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load recipe data.");
  }

  return response.json();
}

export async function fetchMealsByName(name) {
  const query = name.trim();

  if (!query) {
    return [];
  }

  const data = await getJson(`/search.php?s=${encodeURIComponent(query)}`);
  return data.meals ?? [];
}

export async function fetchMealsByCategory(category) {
  const data = await getJson(`/filter.php?c=${encodeURIComponent(category)}`);
  return data.meals ?? [];
}

export async function fetchCategories() {
  const data = await getJson("/categories.php");
  return data.categories ?? [];
}

export async function fetchMealById(id) {
  const data = await getJson(`/lookup.php?i=${encodeURIComponent(id)}`);
  return data.meals?.[0] ?? null;
}

export function getMealIngredients(meal) {
  const ingredients = [];

  for (let index = 1; index <= 20; index += 1) {
    const ingredient = (meal[`strIngredient${index}`] || "").trim();
    const measure = (meal[`strMeasure${index}`] || "").trim();

    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  return ingredients;
}
