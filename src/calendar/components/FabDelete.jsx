import React from 'react'
import { useCalendarStore } from '../../hooks/useCalendarStore'

export const FabDelete = () => {

    const {startDeletingEvent, hasEventSelected} = useCalendarStore()
    const handleClick = async() => {
        await startDeletingEvent();
    }

  return (
    <button
        className='btn btn-danger fab-danger'
        onClick={handleClick}
        disabled={!hasEventSelected}
            >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
