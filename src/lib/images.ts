/** Centralised remote image helpers so every photo has the same treatment. */
const U = (id: string, w = 900, h = 700) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const IMG = {
  hero: U("1546069901-ba9599a7e63c", 1000, 1000),
  heroPlate: U("1504674900247-0877df9cc836", 1000, 1000),
  steak: U("1544025162-d76694265947", 1000, 800),
  steakDark: U("1432139555190-58524dae6a55", 1000, 900),

  dishes: [
    U("1467003909585-2f8a72700288"), // grilled salmon
    U("1563379926898-05f4575a45d8"), // spaghetti
    U("1568901346375-23c9450c58cd"), // burger
    U("1565299624946-b28f40a0ae38"), // margherita pizza
    U("1546069901-ba9599a7e63c"), // buddha bowl
    U("1540189549336-e6e99c3679fe"), // salad
    U("1551024506-0bccd828d307"), // dessert
    U("1488900128323-21503983a07e"), // drinks
    U("1473093295043-cdd812d0e601"), // pasta
    U("1555939594-58d7cb561ad1"), // plated dish
    U("1544145945-f90425340c7e"), // cocktail
    U("1578985545062-69928b1d9587"), // cake
    U("1571877227200-a0d98ea607e9"), // dessert 2
    U("1512621776951-a57141f2eefd"), // veg bowl
    U("1490645935967-10de6ba17061"), // healthy bowl
    U("1521305916504-4a1121188589"), // soup
  ],

  categories: [
    U("1568901346375-23c9450c58cd", 300, 300), // burger
    U("1565299624946-b28f40a0ae38", 300, 300), // pizza
    U("1563379926898-05f4575a45d8", 300, 300), // pasta
    U("1512621776951-a57141f2eefd", 300, 300), // salad
    U("1578985545062-69928b1d9587", 300, 300), // dessert
    U("1544145945-f90425340c7e", 300, 300), // drinks
  ],

  interiors: [
    U("1517248135467-4c7edcad34c4"), // restaurant people
    U("1552566626-52f8b828add9"), // interior
    U("1414235077428-338989a2e8c0"), // dining
    U("1466978913421-dad2ebd01d17"), // bar
    U("1424847651672-bf20a4b0982b"), // dinner table
    U("1559339352-11d035aa65de"), // cafe
  ],

  chefs: [
    U("1577219491135-ce391730fb2c", 500, 600),
    U("1595257841889-eca2678454e2", 500, 600),
    U("1583394838336-acd977736f90", 500, 600),
    U("1607631568010-a87245c0daf8", 500, 600),
    U("1581299894007-aaa50297cf16", 500, 600),
  ],

  blog: [
    U("1556910103-1c02745aae4d", 800, 600),
    U("1600565193348-f74bd3c7ccdf", 800, 600),
    U("1466978913421-dad2ebd01d17", 800, 600),
    U("1577219491135-ce391730fb2c", 800, 600),
  ],

  offers: [
    U("1414235077428-338989a2e8c0", 400, 400),
    U("1555396273-367ea4eb4db5", 400, 400),
    U("1565958011703-44f9829ba187", 400, 400),
  ],

  events: [
    U("1519671482749-fd09be7ccebf", 800, 600),
    U("1530103862676-de8c9debad1d", 800, 600),
    U("1533174072545-7a4b6ad7a6c3", 800, 600),
  ],
};

export const avatar = (n: number) => `https://i.pravatar.cc/150?img=${n}`;
