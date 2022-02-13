export const textBreaker = (text, minLength = 10, maxLength = 80) => {
  let allStrings = [];
  const sentences = text.split(". ");

  sentences.map((sentence) => {
    if (sentence.length > maxLength) {
      const fragments = sentence.split(", ");

      fragments.forEach((fragment) => {
        if (fragment.length > maxLength) {
          let firstString = "";
          let secondString = "";
          const words = fragment.split(" ");
          words.forEach((word) => {
            if (firstString.length < maxLength) {
              firstString += `${word} `;
            } else {
              secondString += `${word} `;
            }
          });
          allStrings = [...allStrings, firstString, secondString];
        } else {
          allStrings = [...allStrings, fragment];
        }
      });
    } else {
      allStrings.push(sentence);
    }
  });

  const cleanStrings = allStrings.filter((string) => string.length > 0);

  return cleanStrings;
  };