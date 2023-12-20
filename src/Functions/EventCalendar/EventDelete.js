import { Alert } from "react-native";
import { useAppContext } from "../../Context/ContextProvider";


export default function EventDelete({navigation}){
 const {setIsMarkedDate , setEvents , events,isMarkedDate} = useAppContext()
    function onHandleDelete(event) {
        Alert.alert(
          'Delete an event',
          `You sure want to delete this event on ${event.date}`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                const eventsAfterDeletion = events.filter(each => {
                  if (each.event != event.event) {
                    return each;
                  }
                });
    
                const markedDatesAfterDeletion = isMarkedDate.filter(each => {
                  if (each != event.date) {
                    return each;
                  }
                });
                setIsMarkedDate(markedDatesAfterDeletion);
                setEvents(eventsAfterDeletion);
    
                console.log(markedDatesAfterDeletion, eventsAfterDeletion);
              },
            },
          ],
        );
      }
      return{
        onHandleDelete,

      }
}