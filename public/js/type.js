"use strict";

new TypeIt(".home__title--strong", { loop: true, speed: 100 })
    .move(-12)
    .type("Amazing ")
    .pause(3000)
    .move(null, { to: "END" })
    .delete()
    .type("We Make Bull!")
    .pause(4000)
    .go();
