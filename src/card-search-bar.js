import { cardButtonHandler } from "./index";

const hideCardSearch = ((cardId) => {
  const searchRow = document.getElementById(`search-row-${cardId}`);
  const switchWrap = document.getElementById(`switch-wrap-${cardId}`);

  const switchBackWrap = document.createElement("div");
  switchBackWrap.classList.add("switch-back-wrap");
  switchBackWrap.id = `switch-back-wrap-${cardId}`;

  const changeLocation = document.createElement("div");
  changeLocation.classList.add("change-location");
  switchBackWrap.appendChild(changeLocation);

  console.log(searchRow.childNodes[0]);

  const changeLocationBut = document.createElement("button");
  changeLocationBut.id = `${cardId}`;
  changeLocationBut.innerText = "+";
  changeLocationBut.classList.add("show-search");
  changeLocation.addEventListener("click", showCardSearch);
  changeLocation.append(changeLocationBut);

  searchRow.replaceChild(switchBackWrap, switchWrap);
});

const showCardSearch = ((e) => {
  const cardId = e.target.id;

  const searchRow = document.getElementById(`search-row-${cardId}`);
  const switchBackWrap = document.getElementById(`switch-back-wrap-${cardId}`);

  const switchWrap = document.createElement("div");
  switchWrap.classList.add("switch-wrap");
  switchWrap.id = `switch-wrap-${cardId}`;
  searchRow.appendChild(switchWrap);

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.classList.add("location-search");
  searchInput.id = `location-search-${cardId}`;
  switchWrap.appendChild(searchInput);

  const searchButton = document.createElement("div");
  searchButton.classList.add("search-button");
  //   searchButton.id = `search-button-${num}`;
  searchButton.id = `${cardId}`;
  searchButton.innerText = "Search";
  searchButton.addEventListener("click", cardButtonHandler);
  switchWrap.appendChild(searchButton);

  searchRow.replaceChild(switchWrap, switchBackWrap);
});

export { hideCardSearch };
export { showCardSearch };
