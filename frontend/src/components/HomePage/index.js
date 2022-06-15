import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as ticketActions from '../../store/tickets'
import Navigation from "../Navigation"

const HomePage = (isLoaded) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(ticketActions.getTicketsThunk(user.id))
    }, [dispatch])

    return (
        <div className="Home">
            <Navigation isLoaded={isLoaded}/>
        </div>
    )
}

export default HomePage
