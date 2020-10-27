import React, { useContext } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

const FeaturedRooms = () => {

    // this is how you import context in functional components using useContext
  const { loading, state } = useContext(RoomContext);

  let myrooms = state.featuredRooms.map((room) => {
    return <Room key={room.id} room={room} />;
  });
  return (
    <section className="featured-rooms">
      <Title title="featured rooms" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : myrooms}
      </div>
    </section>
  );
};

export default FeaturedRooms;
