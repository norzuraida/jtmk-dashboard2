export default function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__avatar" />
      <div className="skeleton-card__body">
        <div className="skeleton-card__line skeleton-card__line--title" />
        <div className="skeleton-card__line skeleton-card__line--subtitle" />
        <div className="skeleton-card__line skeleton-card__line--badge" />
        <div className="skeleton-card__line skeleton-card__line--location" />
      </div>
    </div>
  )
}
