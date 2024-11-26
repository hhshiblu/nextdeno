export function generateId(length) {
  const characters = "ABCDEFGHIJKLabcdefghijklmnop0123456789"; // Characters set
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // Random index to pick from the set
    result += characters[randomIndex]; // Add the character at the random index
  }

  return result;
}
