type LoadMoreButtonProps = {
  onClick: () => void
}

// The parent only shows it when the API says there's another page
function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <button type="button" className="load-more" onClick={onClick}>
      Load more
    </button>
  )
}

export default LoadMoreButton
