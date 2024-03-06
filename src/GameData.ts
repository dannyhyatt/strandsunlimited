export interface GameData {

  theme: string,
  words: string[], // first word is always the theme, total length must be 48 characters
  positions: string[][],

}

export const defaultGameData: GameData = {

  theme: "Give me a slice!",
  words: [
    'Pizza',
    'Pumpkin',
    'Apple',
    'Cherry',
    'Blueberry',
    'Key Lime',
    'Pecan',
    'Pies'
  ].map((word) => word.toUpperCase().replace(/ /g, '')),

  positions: [
    ['1-1', '2-1', '1-2', '2-2', '3-1'],
    ['5-6', '4-6', '3-6', '2-5', '3-5', '3-4', '2-4'],
    ['4-1', '4-2', '3-2', '3-3', '2-3'],
    ['8-1', '7-1', '7-2', '6-2', '6-1', '5-1'],
    ['8-2', '8-3', '7-3', '6-3', '7-4', '6-4', '5-5', '4-5', '4-4'],
    ['8-5', '8-4', '7-5', '8-6', '7-6', '6-6', '6-5'],
    ['2-6', '1-6', '1-5', '1-4', '1-3'],
    ['5-4', '5-3', '5-2', '4-3']
  ]

}