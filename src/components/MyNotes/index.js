import './index.css'

const MyNotes = props => {
  const {myNotes} = props
  const {task, tag} = myNotes

  return (
    <>
      <li className="tasks-list">
        <p className="my-task">{task}</p>
        <p className="my-tag">{tag}</p>
      </li>
    </>
  )
}

export default MyNotes
