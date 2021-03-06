import React, { useState, useEffect, useMemo } from 'react'
import { IoIosAlarm, IoIosPlay, IoIosPause, IoIosRefresh } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ActionTypes } from '../../store/modules/pomodoro/types'

import api from '../../services/api'

import Header from '../../components/Header'

import {
  ContainerPomo,
  HeaderTaskPomos,
  CountdownBorder,
  ProgressBarBorder,
  ProgressBar,
  ProgressBarPercent,
  Button,
} from './styles'

function Pomodoro() {
  const dispatch = useDispatch()
  const pomo = useSelector(state => state.pomodoro.items)

  const [user, setUser] = useState({})
  const [countdownValue, setCountdownValue] = useState('')
  const [countdownTimeout, setCountdownTimeout] = useState(0)
  const [button, setButton] = useState('start')

  const [spinner, setSpinner] = useState(false)

  let { id } = useParams()

  useEffect(() => {
    async function loadTask() {
      const { data } = await api.get(`pomos/${id}`)

      dispatch({
        type: ActionTypes.INITIAL_POMO_STATE,
        payload: { pomodoro: data },
      })
    }
    loadTask()

    async function loadUser() {
      const data = localStorage.getItem('@AppPomo:user')
      const parsed = JSON.parse(data)

      setUser(parsed)
      setCountdownValue(parsed.default_minute * 60)
      setSpinner(true)
    }
    loadUser()
  }, [id, dispatch])

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
    dispatch({
      type: ActionTypes.UPDATE_POMO_REQUEST,
      payload: { id, realized_pomos: pomo.realized_pomos },
    })
  }

  const resetCountdown = () => {
    setCountdownValue(user.default_minute * 60)
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
      const defaultMaxSecondsPomo = user.default_minute * 60
      const proportion = (countdownValue * maxWidth) / defaultMaxSecondsPomo
      const percent = (proportion / maxWidth) * 100
      const percentNumber = Math.round(percent)

      return (
        <>
          <ProgressBarBorder>
            <ProgressBar
              style={{
                width: `${percent}%`,
              }}
            ></ProgressBar>
          </ProgressBarBorder>
          {user.setting_progress_bar && (
            <ProgressBarPercent
              style={{
                opacity: `${percentNumber === 0 ? '0' : '1'}`,
              }}
            >
              {percentNumber}%
            </ProgressBarPercent>
          )}
        </>
      )
    }
  }, [countdownValue, user])

  return (
    <>
      <Header goBackButton={true} />

      {spinner ? (
        <ContainerPomo>
          <HeaderTaskPomos>
            <h2>{pomo.name}</h2>
            <span>
              <IoIosAlarm className="icon-clock" />
              {pomo.realized_pomos}
            </span>
          </HeaderTaskPomos>

          <CountdownBorder>
            <p>{formatedCountdown}</p>
          </CountdownBorder>

          {button === 'start' && (
            <Button onClick={() => startCountdown(countdownValue)}>
              <IoIosPlay className="icon-button" />
              Iniciar
            </Button>
          )}
          {button === 'pause' && (
            <Button onClick={pauseCountdown}>
              <IoIosPause className="icon-button" />
              Pausar
            </Button>
          )}
          {button === 'continue' && (
            <Button onClick={resetCountdown}>
              <IoIosRefresh className="icon-button" />
              Continuar
            </Button>
          )}

          {progressBar}
        </ContainerPomo>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </>
  )
}

export default Pomodoro
