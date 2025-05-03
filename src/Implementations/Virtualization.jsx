import React, { useRef } from "react";
import MultipleCard from "../Components/MultipleCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

function Virtualization() {
  const scrollRef = useRef(null);

  const users = React.useMemo(
    () =>
      faker.helpers.multiple(createRandomUser, {
        count: 50000,
      }),
    []
  );

  console.log("users",users.length);
  

  const virtualizer = useVirtualizer({
    count: users.length,
    estimateSize: () => 80,
    getScrollElement: () => scrollRef.current,
  });

  const virtualItems = virtualizer.getVirtualItems();
  return (
    <div style={{textAlign:"center"}}>
    <h2>Virtualization using Tanstack virtual</h2>
    <div ref={scrollRef} className="MC_Container">
      <div
        style={{
          position: "relative",
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualItems.map(({ index, start, key, size }) => {
          const user = users[index];
          return (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${start}px)`,
                height: `${size}px`,
              }}
              key={key}
              data-index={index}
            >
              <div className="MC_card">
                <div>
                  <img
                    className="MC_card_img"
                    src={user.avatar}
                    alt={user.username}
                  />
                </div>
                <div className="MC_card_text">
                  <div>{user.username}</div>
                  <div>{user.email}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}

export default Virtualization;
