import { API_ROUTES } from "constants"
import { useEffect, useState } from "react"
import { useGlobalContext } from "./useGlobalContext";

export const useEventSource = ({ eventName, onMessage }) => {
    // const [eventSource, setEventSource] = useState(0)
    const { tokens } = useGlobalContext();

    useEffect(() => {
        if (tokens) {
            const eventSource = new EventSource(`${API_ROUTES.serverEvents.subscribe}?accessToken=${tokens.accessToken}&eventName=${eventName}`)
            eventSource.onmessage = (e) => {
                const data = JSON.parse(e.data)
                onMessage({
                    data,
                    timestamp: e.timeStamp
                })
            }
            return () => {
                eventSource.close()
            }
        }

    }, [tokens])
}