export const sayHi = (name: string) => `Hi, ${name}!`;

const root = document.getElementById("root");

if (root) {
  root.innerText = sayHi("stage");
}
