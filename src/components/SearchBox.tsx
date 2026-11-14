type SearchBoxProps = {
  value: string
  onChange: (value: string) => void
}

// Controlled input: the text lives in the parent's state, this only shows it and reports changes
function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className="search-box">
      Search by name{' '}
      <input type="search" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

export default SearchBox
