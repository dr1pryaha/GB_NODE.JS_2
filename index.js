import colors from "colors";
import EventEmitter from "events";

//Задание № 1

console.log(colors.red("Hello World!"));

console.log("Record 1");
setTimeout(() => {
  console.log("Record 2");
  Promise.resolve().then(() => {
    setTimeout(() => {
      console.log("Record 3");
      Promise.resolve().then(() => {
        console.log("Record 4");
      });
    });
  });
});
console.log("Record 5");
Promise.resolve().then(() =>
  Promise.resolve().then(() => console.log("Record 6"))
);

//Задание № 2

class TimerEmitter extends EventEmitter {}
const emitter = new TimerEmitter();

emitter.on("timerTick", ([dateInFuture, timer]) => {
  const dateNow = new Date();
  if (dateNow >= dateInFuture) {
    emitter.emit("timerEnd", timer);
  } else {
    console.log(getPrettyTime((dateInFuture - dateNow) / 1000), " left");
  }
});

emitter.on("timerEnd", timer => {
  console.log("Time is Up!");
  clearInterval(timer);
});

const getPrettyTime = seconds => {
  const arr = [
    Math.floor(seconds % 60),
    Math.floor((seconds / 60) % 60),
    Math.floor(seconds / (60 * 60)) % 24,
    Math.floor(seconds % 60),
  ];
};

// //регистрация события
// emitterObject.on("send", Handler.send);

// //генерация события
// generateNewCustomer().then(customer =>
//   emitterObject.emit(customer.type, customer.payload)
// );

// //обработка ошибки ОБЯЗАТЕЛЬНА!!!
// emitterObject.emit("error", new Error("Что-то пошло не так!"));
