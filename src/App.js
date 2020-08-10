import React, { useState, useEffect, useMemo } from 'react'
import { IoIosAlarm, IoIosPlay, IoIosPause, IoIosRefresh } from 'react-icons/io'

import './App.css'

function App() {
  const [pomo, setPomo] = useState({})
  const [countdownValue, setCountdownValue] = useState('')
  const [countdownTimeout, setCountdownTimeout] = useState(0)
  const [button, setButton] = useState('start')

  useEffect(() => {
    function loadTaskData() {
      const task = {
        title: 'Jr Bytes - Stack: Node, React and React Native.',
        realizedPomos: 7,
        defaultMinutesPomo: 1,
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

  const startCountdown = result => {
    if (result === 0) return registerPomoAndStopCountdown()

    setCountdownTimeout(
      setTimeout(function () {
        const second = result - 1
        startCountdown(second)
        setCountdownValue(second)
      }, 1000),
    )
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

  const resetCountdown = () => {
    setCountdownValue(pomo.defaultMinutesPomo * 60)
    setButton('start')
  }

  const formatedCountdown = useMemo(() => {
    if (countdownValue > 0) {
      let minutes = ('00' + Math.floor((countdownValue / 60) % 60)).slice(-2)
      let seconds = ('00' + Math.floor(countdownValue % 60)).slice(-2)
      return `${minutes}:${seconds}`
    } else {
      return '00:00'
    }
  }, [countdownValue])

  const progressBar = useMemo(() => {
    if (countdownValue >= 0) {
      const maxWidth = 290
      const defaultMaxSecondsPomo = pomo.defaultMinutesPomo * 60
      const proportion = (countdownValue * maxWidth) / defaultMaxSecondsPomo
      const percent = (proportion / maxWidth) * 100

      return (
        <div className="progress-bar-border">
          <div
            className="progress-bar"
            style={{
              width: `${percent}%`,
            }}
          ></div>
        </div>
      )
    }
  }, [countdownValue, pomo])

  return (
    <>
      <div className="container">
        <div className="header-tasks-pomos">
          <h2>{pomo.title}</h2>
          <span>
            <IoIosAlarm className="icon-clock" />
            {pomo.realizedPomos}
          </span>
        </div>

        <div className="countdownBorder">
          <p>{formatedCountdown}</p>
        </div>

        {button === 'start' && (
          <button
            className="button"
            onClick={() => startCountdown(countdownValue)}
          >
            <IoIosPlay className="icon-button" />
            Iniciar
          </button>
        )}
        {button === 'pause' && (
          <button className="button" onClick={pauseCountdown}>
            <IoIosPause className="icon-button" />
            Pausar
          </button>
        )}
        {button === 'continue' && (
          <button className="button" onClick={resetCountdown}>
            <IoIosRefresh className="icon-button" />
            Continuar
          </button>
        )}

        {progressBar}
      </div>
    </>
  )
}

export default App
