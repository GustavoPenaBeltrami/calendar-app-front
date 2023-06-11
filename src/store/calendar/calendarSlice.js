import { createSlice } from '@reduxjs/toolkit'


export const calendarSlice = createSlice({
    name: 'calendar',

    initialState: {
        eventsLoaded: false,
        events: [
            //events
        ],
        activeEvent: null
    },

    reducers: {
        onClickingBackground: (state) => {
            state.activeEvent = null;
        },
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map( event => {
                if (event.id === payload.id){
                    return payload;
                }
            })
        },
        onDeleteEvent: (state) => {
            if( state.activeEvent) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, {payload = []}) => {
            state.eventsLoaded = true;
            state.events = payload;

            // -- Por algun motivo esto no me funciona : --
            // payload.forEach( event => {
            //     const exists = state.events.some(dbEvent => dbEvent.id === event.id)
            //     if (!exists) {
            //         state.events.push(event);
            //     }
            // })
        },
        onClearState: (state) => {
            state.eventsLoaded = false;
            state.events = [];
            state.activeEvent = null;
        }
    }
})

export const { onClearState, onClickingBackground, onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent,onLoadEvents } = calendarSlice.actions

