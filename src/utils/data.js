const userSeed = [
  {
    userName: "Orwell",
    password: "123",
    name: "George Orwell",
  },
  {
    userName: "Admin",
    password: "123",
    name: "Miguel Eseverri",
  },
  {
    userName: "User1",
    password: "123",
    name: "User1 name",
  },
  {
    userName: "User2",
    password: "123",
    name: "User2 name",
  },
  {
    userName: "User3",
    password: "123",
    name: "User3 name",
  },
];
const orwellBook = {
  title: "1984",
  genres: ["Suspese", "SciFi"],
  description: `“1984” es una novela distópica de George Orwell. La historia se desarrolla en Oceanía, un país ficticio bajo un gobierno totalitario que vigila constantemente a sus ciudadanos. El protagonista, Winston Smith, trabaja para el Ministerio de la Verdad, reescribiendo artículos para que se ajusten a la ideología del gobierno. Winston comienza una relación clandestina con Julia, a pesar de que las relaciones están prohibidas. Eventualmente, son arrestados y sometidos a un lavado de cerebro, perdiendo su individualidad y aprendiendo a amar al Gran Hermano, la figura omnipresente del gobierno. La novela es una crítica a los regímenes totalitarios y una advertencia sobre los peligros de la vigilancia masiva y la manipulación de la verdad.`,
};

const orwellReviews = [
  { username: "User3", body: "amazing book", rating: 6 },
  { username: "User2", body: "nice read book", rating: 3.1416 },
  { username: "User1", body: "Could be better", rating: 2.71828 }
];

module.exports = { userSeed,orwellBook,orwellReviews };
