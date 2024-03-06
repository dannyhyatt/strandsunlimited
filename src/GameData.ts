export interface GameData {

  theme: string,
  words: string[], // first word is always the theme, total length must be 48 characters

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
    'Pie'
  ]

}