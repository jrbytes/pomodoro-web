import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pomo, setPomo] = useState({})
  const [countdownValue, setCountdownValue] = useState(0)
  const [countdownTimeout, setCountdownTimeout] = useState(0)
  const [button, setButton] = useState(true)

  useEffect(() => {
    function loadTaskData() {
      const task = {
        title: 'Tarefa 1',
        realizedPomos: 7,
        defaultMinutesPomo: 25
      }

      setPomo(task)
      setCountdownValue(task.defaultMinutesPomo * 60)
    }

    loadTaskData()
  }, [])

  const startCountdown = (result) => {
    setCountdownTimeout(setTimeout(function() {
      const second = result - 1
      startCountdown(second)
      setCountdownValue(second)
    }, 1000))
    setButton(false)
    console.log(result)
  }

  const pauseCountdown = () => {
    clearTimeout(countdownTimeout)
    setButton(true)
  }

  return (
    <div className='container'>
      <h2>{pomo.title}</h2>
      <span>{pomo.realizedPomos}</span>
      <p>{pomo.defaultMinutesPomo}</p>
      <p>{countdownValue}</p>
      {button && <button
        onClick={() => startCountdown(countdownValue)}
      >
        Start
      </button>}
      {!button && <button
        onClick={pauseCountdown}
      >
        Pause
      </button>}
    </div>
  )
}

export default App
