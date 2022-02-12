export const textBreaker = (text, minLength = 10, maxLength = 150) => {
    let strings = [];
    const sentences = text.split(". ");
  
    sentences.map((sentence) => {
      if (sentence.length > maxLength) {
        const fragments = sentence.split(", ");
        strings = [...strings, ...fragments];
      } else {
        strings.push(`${sentence}.`);
      }
    });
  
    return sentences;
  };