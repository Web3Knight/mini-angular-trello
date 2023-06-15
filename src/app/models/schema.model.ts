export interface Card {
    title: string;
    description: string
}

export interface Column {
    columnName: string;
    hasNewButton: boolean;
    id: string;
    cards: Card[];
}

export let defaultData = [
  {
    "columnName": "Todo",
    "id": "Todo",
    "hasNewButton": true,
    "cards": [
      {
        "title": "Card1",
        "description": "You can add card in todo area!"
      }
    ]
  },
  {
    "columnName": "Inprogress",
    "id": "Inprogress",
    "hasNewButton": false,
    "cards": []
  },
  {
    "columnName": "Ready for review",
    "id": "Ready for review",
    "hasNewButton": false,
    "cards": []
  },
  {
    "columnName": "Done",
    "id": "Done",
    "hasNewButton": false,
    "cards": []
  }
];
