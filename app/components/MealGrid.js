import MealCard from "./MealCard";

export default function MealGrid({ meals, emptyMessage }) {
  if (!meals.length) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-border-strong p-10 text-center dark:border-neutral-border-muted">
        <p className="text-neutral-foreground-muted dark:text-neutral-foreground-dark">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
