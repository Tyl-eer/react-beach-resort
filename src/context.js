import React, { useState, createContext, useEffect } from "react";
import items from "./data";
const RoomContext = createContext();

const RoomContextProvider = (props) => {
  //  state using hooks we use use state
  const [state, setState] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  });

  //  compnent did mount changes to useEffect

  useEffect(() => {
    let rooms = formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    setState({
      ...state,
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }, []);

  // componentDidMount(){
  //     // this.getData
  //     let rooms = this.formatData(items)
  //     let featuredRooms = rooms.filter( room => room.featured === true);
  //     let maxPrice = Math.max(...rooms.map (item => item.price));
  //     let maxSize = Math.max(...rooms.map (item => item.size));
  //     this.setState({
  //         rooms,
  //         featuredRooms,
  //         sortedRooms: rooms,
  //         loading: false,
  //         price: maxPrice,
  //         maxPrice,
  //         maxSize
  //     });
  // }

  // methods are turned to arrow functions using const and =>
  const formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  const getRoom = (slug) => {
    let tempRooms = [...state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    setState({ ...state, [name]: value }, filterRooms);
  };
  const filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = state;

    // all the rooms
    let tempRooms = [...rooms];
    // transform value
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    //  filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }
    //  filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);
    // filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );
    //    filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    //    filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }
    // change state
    setState({ ...state, sortedRooms: tempRooms });
  };

  return (
    <RoomContext.Provider value={{ state, getRoom, handleChange }}>
      {props.children}
    </RoomContext.Provider>
  );
};

const RoomConsumer = RoomContext.Consumer;

// export function withRoomConsumer(Component) {
//     return function ConsumerWrapper(props) {
//         return (
//         <RoomConsumer>
//             {value => <Component {...props} context={value} />}
//         </RoomConsumer>
//         );
//     }
// }

export { RoomContextProvider, RoomConsumer, RoomContext };
