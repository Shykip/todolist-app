import './style/app.scss'
import dateIcon from './assets/images/date.png'
import checkIcon from './assets/images/check.png'

function App() {

  return (
    <> 
      <div className="heading"><h1>Todo List</h1></div>
      
      <div className="list_container">

        <div className="task">
          <h2><div className="status"><img src={checkIcon} /></div> Workout</h2>
          <p className="description">30 min intense cardio & 20 min strength training...</p>
          <div className="date"><img src={dateIcon} />2020 Jan 13</div>
        </div>

      </div>
    </>
  )
}

export default App
