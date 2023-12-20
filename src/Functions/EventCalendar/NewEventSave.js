import { useAppContext } from "../../Context/ContextProvider";
import { useState } from "react";

export default function NewEventSave(){
    const [event, setEvent] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');

    const {events, setEvents, setIsMarkedDate, isMarkedDate,selectedDate} = useAppContext();
    function onHandleSave() {
        setIsMarkedDate(() => {
          if (isMarkedDate?.includes(selectedDate)) {
            return [...isMarkedDate];
          } else {
            return [...isMarkedDate,selectedDate];
          }
        });
        setEvents([
          ...events,
          {
            date: selectedDate,
            event: event,
            description: description,
            time: time,
          },
        ]);
        setEvent('');
        setDescription('');
        setTime('');
      }

      return{
        onHandleSave,
        event,
        setEvent,
        time,
        setTime,
        setDescription,
        description,

      }
}