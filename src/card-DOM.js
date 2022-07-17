const addCard = ((num) => {
  const card = document.createElement("div");
  card.id = `card${num}`;
  card.classList.add("weather-card");
  document.getElementById("card-holder").appendChild(card);

  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card-wrapper");
  cardWrapper.id = `card-wrapper-${num}`;
  card.appendChild(cardWrapper);

  const createLocation = (() => {
    const location = document.createElement("div");
    location.classList.add("location");
    location.id = `location${num}`;
    cardWrapper.appendChild(location);
  })();

  const createDate = (() => {
    const date = document.createElement("div");
    date.id = `date${num}`;
    date.classList.add("date");
    cardWrapper.appendChild(date);
  })();

  const createTimeData = (() => {
    const timeData = document.createElement("div");
    timeData.classList.add("time");
    timeData.classList.add("data");
    timeData.id = `time${num}`;
    cardWrapper.appendChild(timeData);
  })();

  const createTemp = (() => {
    const temp = document.createElement("div");
    temp.classList.add("temp");
    temp.id = `temp${num}`;
    cardWrapper.appendChild(temp);
  })();

  const createDividerDiv = (() => {
    const dividerDiv = document.createElement("div");
    dividerDiv.classList.add("divider-div");
    dividerDiv.id = `divider-div${num}`;
    cardWrapper.appendChild(dividerDiv);

    const leftDivide = document.createElement("div");
    leftDivide.classList.add("left-divide");
    leftDivide.id = `left-divide${num}`;
    dividerDiv.appendChild(leftDivide);

    const rightDivide = document.createElement("div");
    rightDivide.classList.add("right-divide");
    dividerDiv.appendChild(rightDivide);
    rightDivide.id = "right-divide";
  })();

  const createHighRowLow = (() => {
    const highLow = document.createElement("div");
    highLow.classList.add("high-low-row");
    cardWrapper.appendChild(highLow);

    const createLow = (() => {
      const low = document.createElement("div");
      low.classList.add("low");
      low.classList.add("data");
      low.id = `low${num}`;
      highLow.appendChild(low);
    })();

    const createHigh = (() => {
      const high = document.createElement("div");
      high.classList.add("high");
      high.classList.add("data");
      high.id = `high${num}`;
      highLow.appendChild(high);
    })();
  })();

  const createForecast = (() => {
    const forecast = document.createElement("div");
    forecast.classList.add("forecast");
    forecast.classList.add("data");
    forecast.id = `forecast${num}`;
    cardWrapper.appendChild(forecast);
  })();

  const createSearchRow = (() => {
    const searchRow = document.createElement("div");
    searchRow.classList.add("card-row");
    searchRow.classList.add("search-row");
    searchRow.id = `search-row-${num}`;
    card.appendChild(searchRow);

    const switchWrap = document.createElement("div");
    switchWrap.classList.add("switch-wrap");
    switchWrap.id = `switch-wrap-${num}`;
    searchRow.appendChild(switchWrap);

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.classList.add("location-search");
    searchInput.id = `location-search-${num}`;
    switchWrap.appendChild(searchInput);

    const searchButton = document.createElement("div");
    searchButton.classList.add("search-button");

    searchButton.id = `${num}`;

    searchButton.innerText = "Search";
    switchWrap.appendChild(searchButton);
  })();
});

export { addCard };
