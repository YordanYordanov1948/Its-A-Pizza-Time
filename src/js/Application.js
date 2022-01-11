import EventEmitter from "eventemitter3";
import Card from "./Card";
import Notification from "./Notification";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    const pizzas = [
      {
        type: Card.types.HAWAIIAN,
        price: 8.99,
      },
      {
        type: Card.types.PEPPERONI,
        price: 9.99,
      },
      {
        type: Card.types.MARGHERITA,
        price: 7.99,
      },
    ];

    pizzas.forEach((pizza) => {
      const card = new Card({ ...pizza });

      card.render();

      document.querySelector(".main").appendChild(card.container);
    });

    var elements = document.getElementsByClassName("card");

    for (var i = 0; i < elements.length; i++) {
      const notification = new Notification(elements[i]);
      const type = pizzas[i].type;
      const price = pizzas[i].price;
      console.log(pizzas[i]);
      notification.render({type, price});
      elements[i].addEventListener("click", function () {
        document.querySelector(".notifications").appendChild(notification.container);
      });
     notification.container.querySelector('.delete').addEventListener("click", function () {
      document.querySelector(".notifications").removeChild(notification.container);
    });
    }

    this.emit(Application.events.READY);
  }
}
