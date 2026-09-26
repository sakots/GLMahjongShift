const mahjongToGL = (input) => {
  const numberMap = {
    m: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o'],
    s: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    p: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'],
  };

  const honorMap = {
    東: '1',
    南: '2',
    西: '3',
    北: '4',
    白: '5',
    發: '6',
    発: '6',
    中: '7',
  };

  let result = '';

  result = input.replace(/([1-9]+)([msp])/gi, (_, numbers, suit) => {
    const map = numberMap[suit.toLowerCase()];

    return [...numbers]
      .map((number) => map[Number(number) - 1])
      .join('');
  });

  result = [...result]
    .map((char) => honorMap[char] ?? char)
    .join('');

  return result;
};
