import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isTrue: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isTrue: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isTrue: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'sports',
    isTrue: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isTrue: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'others',
    isTrue: false,
  },
]

const EachTask = props => {
  const {details} = props
  const {task, tag} = details
  const findItem = tagsList.find(item => item.optionId === tag)
  return (
    <li className="tasks-list">
      <p className="my-task">{task}</p>
      <p className="my-tag">{findItem.displayText}</p>
    </li>
  )
}

const TagITem = props => {
  const {details, onClickToggleBtn} = props
  const {displayText, optionId, isTrue} = details

  const btnClass = isTrue ? 'in-active-btn' : 'active-btn'

  const onClickBtn = () => {
    onClickToggleBtn(optionId)
  }

  return (
    <li>
      <button className={btnClass} type="button" onClick={onClickBtn}>
        {displayText}
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    task: '',
    tag: tagsList[0].optionId,
    list: [],
    selectedTag: '',
    newList: tagsList,
  }

  onChangeSelect = event => {
    this.setState({tag: event.target.value})
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onClickToggleBtn = button => {
    const {newList} = this.state
    const findItem = newList.find(item => item.optionId === button)
    if (findItem.isTrue === false) {
      const filteredList = newList.map(each => {
        if (each.optionId === button) {
          return {...each, isTrue: true}
        }
        return {...each, isTrue: false}
      })
      this.setState({newList: filteredList, selectedTag: button})
    }

    if (findItem.isTrue === true) {
      const filteredList = newList.map(each => {
        if (each.optionId === button) {
          return {...each, isTrue: false}
        }
        return each
      })
      this.setState({newList: filteredList, selectedTag: ''})
    }
  }

  submitForm = e => {
    e.preventDefault()
    const {task, tag} = this.state
    if (task === '') {
      // eslint.disable-next-line no-alert
      alert('Enter the Task')
    } else {
      const newNotes = {
        id: v4(),
        task,
        tag,
      }
      this.setState(prevState => ({
        list: [...prevState.list, newNotes],
        task: '',
        tag: tagsList[0].optionId,
      }))
    }
  }

  render() {
    const {tag, task, list, selectedTag, newList} = this.state
    const filteredList = list.filter(item => item.tag.includes(selectedTag))
    console.log(filteredList)
    return (
      <>
        <div className="bg-container">
          <div className="create-task-container">
            <h1 className="create-task-heading">Create a task!</h1>
            <form className="form" onSubmit={this.submitForm}>
              <label className="label" htmlFor="task">
                Task
              </label>
              <input
                className="input"
                id="task"
                placeholder="Enter the task here"
                type="text"
                value={task}
                onChange={this.onChangeTask}
              />

              <label className="label" htmlFor="tags">
                Tags
              </label>
              <select
                className="input"
                id="tags"
                onChange={this.onChangeSelect}
                value={tag}
              >
                {tagsList.map(each => (
                  <option value={each.optionId} key={each.optionId}>
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
            <ul className="tag-list-container">
              {newList.map(each => (
                <TagITem
                  key={each.optionId}
                  details={each}
                  onClickToggleBtn={this.onClickToggleBtn}
                  isActive={each.optionId === selectedTag}
                />
              ))}
            </ul>
            <h1 className="tasks-heading">Tasks</h1>
            {filteredList.length === 0 ? (
              <div className="empty-task-container">
                <p>No Tasks Added Yet</p>
              </div>
            ) : (
              filteredList.map(each => (
                <EachTask key={each.id} details={each} />
              ))
            )}
          </div>
        </div>
      </>
    )
  }
}

export default App

/*
import MyTasks from './components/MyTasks'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isTrue: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isTrue: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isTrue: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'sports',
    isTrue: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isTrue: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'others',
    isTrue: false,
  },
]

const App = () => <MyTasks tasksList={tagsList} />

export default App

 */
