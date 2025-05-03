import React from "react";
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

function MultipleCard() {
  const users = faker.helpers.multiple(createRandomUser, {
    count: 500,
  });

  return (
    <div className="MC_Container">
      {users.map((user) => (
        <div className="MC_card" >
          <div>
            <img className="MC_card_img" src={user.avatar} alt={user.username} />
          </div>
          <div className="MC_card_text">
            <div>{user.username}</div>
            <div>{user.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MultipleCard;
