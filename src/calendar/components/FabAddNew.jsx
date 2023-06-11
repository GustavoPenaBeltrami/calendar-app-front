import React from 'react'
import { useUiStore } from '../../hooks'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { addHours } from 'date-fns'

export const FabAddNew = () => {

    const {openDateModal} = useUiStore()
    const {setActiveEvent} = useCalendarStore()

    const handleClick = () => {
        setActiveEvent({
            title:'',
            notes:'',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user:{
                _id: '1',
                name: 'Gustavo'
            }
        })
        openDateModal();
    }

  return (
    <button
        className='btn btn-primary fab'
        onClick={handleClick}
            >
        <i className="fas fa-plus"></i>
    </button>
  )
}
