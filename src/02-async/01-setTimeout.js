let count = 0;

setInterval(() => console.log(`${++count}`), 1000);

setTimeout(() => {
  console.log("hello from the past!");
  process.exit();
}, 5500);
