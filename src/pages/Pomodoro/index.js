import React, { useState, useEffect, useMemo } from 'react'
import { IoIosAlarm, IoIosPlay, IoIosPause, IoIosRefresh } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

import Header from '../../components/Header'
import './styles.css'

function Pomodoro() {
  const [pomo, setPomo] = useState({})
  const [user, setUser] = useState({})
  const [countdownValue, setCountdownValue] = useState('')
  const [countdownTimeout, setCountdownTimeout] = useState(0)
  const [button, setButton] = useState('start')

  let { id } = useParams()

  useEffect(() => {
    async function loadTask() {
      const { data } = await api.get(`tasks/${id}`)

      setPomo(data)
    }
    loadTask()

    async function loadUser() {
      const { data } = await api.get(`users/e1a2c0-ff-461d-be21-5310a6b416f2`)

      setUser(data)
      setCountdownValue(data.defaultMinutesPomo * 60)
    }
    loadUser()
  }, [id])

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

  const registerPomo = async () => {
    const { data } = await api.patch(`tasks/${id}`, {
      realizedPomos: pomo.realizedPomos + 1,
    })

    setPomo(data)
  }

  const resetCountdown = () => {
    setCountdownValue(user.defaultMinutesPomo * 60)
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
      const defaultMaxSecondsPomo = user.defaultMinutesPomo * 60
      const proportion = (countdownValue * maxWidth) / defaultMaxSecondsPomo
      const percent = (proportion / maxWidth) * 100
      const percentNumber = Math.round(percent)

      return (
        <>
          <div className="progress-bar-border">
            <div
              className="progress-bar"
              style={{
                width: `${percent}%`,
              }}
            ></div>
          </div>
          {user.settingProgressBarPercent && (
            <div
              className="progress-bar-percent"
              style={{
                opacity: `${percentNumber === 0 ? '0' : '1'}`,
              }}
            >
              {percentNumber}%
            </div>
          )}
        </>
      )
    }
  }, [countdownValue, user])

  return (
    <>
      <Header goBackButton={true} />
      <div className="container-pomo">
        <div className="header-tasks-pomos">
          <h2>{pomo.name}</h2>
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

export default Pomodoro
