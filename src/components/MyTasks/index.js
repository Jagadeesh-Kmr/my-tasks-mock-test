import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import MyNotes from '../MyNotes'
import FilterTasks from '../FilterTasks'

import './index.css'

const MyTasks = props => {
  const {tasksList} = props
  const [task, setTask] = useState('')
  const [tag, setTag] = useState(tasksList[0].displayText)
  const [notesList, setNotesList] = useState([])
  const [selectedTag, setSelectedTag] = useState('')
  const [filterResult, setFilterResult] = useState([])
  console.log(filterResult)

  const handleFilterData = () => {
    const newFilterData = notesList.filter(each =>
      each.id.includes(selectedTag),
    )
    setFilterResult(newFilterData)
  }

  const setTaskId = tagId => {
    const findItem = notesList.find(item => item.tag === tagId)
    if (findItem.tag === tagId) {
      setSelectedTag(tagId)
      handleFilterData()
    }
  }

  const onChangeTag = event => {
    setTag(event.target.value)
  }

  const onChangeTask = event => {
    setTask(event.target.value)
  }

  const submitForm = e => {
    e.preventDefault()
    if (task === '') {
      // eslint.disable-next-line no-alert
      alert('Enter the Task')
    } else {
      const newNotes = {
        id: uuidv4(),
        task,
        tag,
      }

      setNotesList(prevState => [...prevState, newNotes])
      setFilterResult(prevState => [...prevState, newNotes])

      setTask('')
    }
  }

  const notesLength = notesList.length === 0

  return (
    <>
      <div className="bg-container">
        <div className="create-task-container">
          <h1 className="create-task-heading">Create a task!</h1>
          <form className="form" onSubmit={submitForm}>
            <label className="label" htmlFor="task">
              Task
            </label>
            <input
              className="input"
              id="task"
              placeholder="Enter the task here"
              type="text"
              value={task}
              onChange={onChangeTask}
            />

            <label className="label" htmlFor="tags">
              Tags
            </label>
            <select
              className="input"
              id="tags"
              onChange={onChangeTag}
              value={tag}
            >
              {tasksList.map(each => (
                <option
                  className="option"
                  key={each.optionId}
                  value={each.displayText}
                >
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="form-btn">
              Add Task
            </button>
          </form>
        </div>

        <div className="tasks-container">
          <h1 className="tags">Tags</h1>
          <div className="tag-list-container">
            {tasksList.map(each => (
              <FilterTasks
                key={each.optionId}
                filterTasks={each}
                onChangeFilterTask={setTaskId}
                isActive={each.optionId === selectedTag}
              />
            ))}
          </div>
          <h1 className="tasks-heading">Tasks</h1>
          {notesLength ? (
            <div className="empty-task-container">
              <p>No Tasks added Yet</p>
            </div>
          ) : (
            <ul className="tasks-ul">
              {filterResult.map(each => (
                <MyNotes key={each.optionId} myNotes={each} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default MyTasks

/*
 const findItem = notesList.find(item => item.optionId === id)
    if (findItem.isTrue === false) {
      const filteredList = notesList.map(each => {
        if (each.optionId === id) {
          return {...each, isTrue: true}
        }
        return {...each, isTrue: false}
      })
      setFilterResult(filteredList)
      setSelectedTag(id)
    }

    if (findItem.isTrue === true) {
      const filteredList = notesList.map(each => {
        if (each.optionId === id) {
          return {...each, isTrue: false}
        }
        return each
      })
      setFilterResult(filteredList)
      setSelectedTag(id)
    }
*/
