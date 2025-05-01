const purchasedStocks = [
    {
      symbol: "AAPL",
      company: "Apple Inc.",
      quantity: 10,
      today: 182.34,
      totalToday: 1823.40,
      purchased: 165.20,
      totalPurchased: 1652.00,
      totalReturn: { value: "+$171.40", percent: "10.4%" },
    },
    {
      symbol: "TSLA",
      company: "Tesla Inc.",
      quantity: 5,
      today: 650.50,
      totalToday: 3252.50,
      purchased: 620.00,
      totalPurchased: 3100.00,
      totalReturn: { value: "+$152.50", percent: "4.9%" },
    },
    {
      symbol: "GOOGL",
      company: "Apple Inc.",
      quantity: 10,
      today: 182.34,
      totalToday: 1823.40,
      purchased: 165.20,
      totalPurchased: 1652.00,
      totalReturn: { value: "+$171.40", percent: "10.4%" },
    },
  ];
  
  const savedStocks = [
    {
      symbol: "GOOGL",
      company: "Alphabet Inc.",
      quantity: null,
      today: 650.50,
      totalToday: null,
      purchased: null,
      totalPurchased: null,
      totalReturn: null,
    },
  ];

  export { purchasedStocks, savedStocks };