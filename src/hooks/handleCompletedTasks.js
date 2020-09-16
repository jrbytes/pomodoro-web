import React, { useState, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { IoIosEyeOff } from 'react-icons/io'

export function useHandleCompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState(false)
  const [
    verifyIfContainTasksCompleted,
    setVerifyIfContainTasksCompleted,
  ] = useState(true)

  const completedTasksData = useSelector(state => state.completedTasks.items)
  const searchCompletedTask = useCallback(() => {
    const verifyIfTrue = completedTasksData.length > 0 ? false : true
    setVerifyIfContainTasksCompleted(verifyIfTrue)
  }, [completedTasksData])

  const buttonCompletedTasks = useMemo(() => {
    searchCompletedTask()
    return (
      <>
        {!verifyIfContainTasksCompleted && (
          <div className="completed-tasks">
            <button
              onClick={() => setCompletedTasks(completedTasks ? false : true)}
            >
              <span>{!completedTasks ? `Tarefas concluídas` : `Ocultar`}</span>
              <IoIosEyeOff />
            </button>
          </div>
        )}
      </>
    )
  }, [verifyIfContainTasksCompleted, completedTasks, searchCompletedTask])

  return [
    buttonCompletedTasks,
    searchCompletedTask,
    setCompletedTasks,
    completedTasks,
    setVerifyIfContainTasksCompleted,
  ]
}
