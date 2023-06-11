import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";
import { onClickingBackground } from "../store/calendar/calendarSlice";

export const useUiStore = () => {
    const dispatch = useDispatch();
    const { isDateModalOpen } = useSelector(state => state.ui)

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }
    const closeDateModal = () => {
        dispatch(onCloseDateModal())
        dispatch(onClickingBackground())
    }

    return {
        //Propiedades
        isDateModalOpen,

        //Métodos
        openDateModal,
        closeDateModal,
    }
}