import React, {useContext} from 'react'
import RoomsFilter from "./RoomFilter";
import RoomsList from "./RoomList";
import { RoomContext } from "../context";
import Loading from "./Loading"

function RoomContainer() {
const { loading,state } = useContext(RoomContext);
    if (loading) {
            return <Loading />;
          }
                 return (
             <>
            <RoomsFilter rooms={state.rooms} />
            <RoomsList rooms={state.sortedRooms} />
            </>
         );
    }

export default (RoomContainer)

// import React from 'react'
// import RoomsFilter from "./RoomFilter";
// import RoomsList from "./RoomList";
// import {RoomConsumer} from "../context";
// import Loading from "./Loading"
// export default function RoomContainer() {
//     return (
//         <RoomConsumer>
//          {value => {
//             const { loading, sortedRooms, rooms } = value
//       if (loading) {
//         return <Loading />
//       }
//              return (
//          <div>
//          Hello from Room Container
//         <RoomsFilter rooms={rooms} />
//         <RoomsList rooms={sortedRooms} />
//         </div>
//         );
//      }}      
//         </RoomConsumer>
       
//     );
// }
