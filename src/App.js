import React, { useState, useEffect, useMemo } from 'react'
import './App.css'

function App() {
  const [pomo, setPomo] = useState({})
  const [countdownValue, setCountdownValue] = useState('')
  const [countdownTimeout, setCountdownTimeout] = useState(0)
  const [button, setButton] = useState('start')

  useEffect(() => {
    function loadTaskData() {
      const task = {
        title: 'Tarefa 1',
        realizedPomos: 7,
        defaultMinutesPomo: 0,
      }

      setPomo(task)
      setCountdownValue(task.defaultMinutesPomo * 60)
    }

    loadTaskData()
  }, [])

  const pauseCountdown = () => {
    clearTimeout(countdownTimeout)
    setButton('start')
  }

  const startCountdown = (result) => {
    if (result === 0) return registerPomoAndStopCountdown()

    setCountdownTimeout(setTimeout(function() {
      const second = result - 1
      startCountdown(second)
      setCountdownValue(second)
    }, 1000))
    setButton('pause')
    console.log(result)
  }

  const registerPomoAndStopCountdown = () => {
    pauseCountdown()
    registerPomo()
    setButton('continue')
  }

  const registerPomo = () => {
    Object.assign(pomo, { realizedPomos: pomo.realizedPomos + 1 })
    setPomo(pomo)
  }

  const formatedCountdown = useMemo(() => {
    if (countdownValue > 0) {
      let minutes = Math.floor((countdownValue / 60) % 60)
      let seconds = ('00' + Math.floor((countdownValue) % 60)).slice(-2)
      return `${minutes}:${seconds}`
    } else {
      return '00:00'
    }
  }, [countdownValue])

  return (
    <div className='container'>
      <h2>{pomo.title}</h2>
      <span>{pomo.realizedPomos}</span>
      <p>{formatedCountdown}</p>
      {button === 'start' && <button
        onClick={() => startCountdown(countdownValue)}
      >
        Start
      </button>}
      {button === 'pause' && <button
        onClick={pauseCountdown}
      >
        Pause
      </button>}
      {button === 'continue' && <button
        onClick={pauseCountdown}
      >
        Continue
      </button>}
    </div>
  )
}

export default App