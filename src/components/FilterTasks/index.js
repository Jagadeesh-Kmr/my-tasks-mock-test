import './index.css'

const FilterTasks = props => {
  const {filterTasks, onChangeFilterTask, isActive} = props
  const {displayText} = filterTasks

  const btnClass = isActive ? 'in-active-btn' : 'active-btn'

  const onClickBtn = () => {
    onChangeFilterTask(displayText)
  }

  return (
    <>
      <button className={btnClass} type="button" onClick={onClickBtn}>
        {displayText}
      </button>
    </>
  )
}

export default FilterTasks
