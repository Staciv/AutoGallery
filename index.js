import { cars } from "./driveList.js";

const searchBox = document.getElementById("search_box");
const searchCarsSelect = document.getElementById("filtered_cars");
const carsList = document.querySelector(".cars_list");
const carBrandInput = document.getElementById("car_brand-input");
const carLinkInput = document.getElementById("car_link-input");
const descriptionInput = document.getElementById("description_input");
const priseInput = document.getElementById("prise_input");
const yearInput = document.getElementById("year_input");
const addCarButton = document.getElementById("add_car");

const carsStore = cars
  .map((car) => {
    const newCar = { ...car };

    newCar[
      "generalSearch"
    ] = `${car.brand} ${car.year} ${car.price}$ ${car.description} `;

    return newCar;
  })
  .sort((a, b) => b.price - a.price);

let filteredCars = carsStore;

const inputsCar = [
  carBrandInput,
  carLinkInput,
  descriptionInput,
  priseInput,
  yearInput,
];

const renderCars = (cars, container) => {
  container.innerHTML = "";

  cars.forEach((car, index) => {
    const carItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    const deleteImage = document.createElement("img");
    const carItemLeft = document.createElement("div");
    const carItemLeftImage = document.createElement("img");
    const carItemRight = document.createElement("div");
    const carItemRightBrandYear = document.createElement("span");
    const carItemRightDescription = document.createElement("span");
    const carItemRightPrice = document.createElement("span");

    carItem.className = "car_item";
    deleteButton.className = "delete_button";
    deleteImage.className = "delete_image";
    carItemLeft.className = "car_item-left";
    carItemRight.className = "car_item-right";
    carItemLeftImage.className = "item_image";
    carItemRightBrandYear.className = "item_title";

    carItemLeftImage.src = car.imageUrl;
    deleteImage.src = "./images/delete.png";
    carItemRightBrandYear.textContent = `${car.brand + ", " + car.year}`;
    carItemRightDescription.textContent = car.description;
    carItemRightPrice.textContent = `${car.price} $`;

    container.appendChild(carItem);
    carItemRight.appendChild(deleteButton);
    deleteButton.appendChild(deleteImage);
    carItem.appendChild(carItemLeft);
    carItemLeft.appendChild(carItemLeftImage);
    carItem.appendChild(carItemRight);
    carItemRight.appendChild(carItemRightBrandYear);
    carItemRight.appendChild(carItemRightDescription);
    carItemRight.appendChild(carItemRightPrice);

    deleteButton.addEventListener("click", () => {
      return deleteButtonCar(index, cars);
    });
  });
};

const addCar = () => {
  const formIsNotEmpty = inputsCar.every((input) => input.value !== "");

  if (formIsNotEmpty) {
    carsStore.unshift({
      brand: carBrandInput.value,
      description: descriptionInput.value,
      imageUrl: carLinkInput.value,
      price: priseInput.value,
      year: yearInput.value,
    });

    carBrandInput.value = "";
    carLinkInput.value = "";
    descriptionInput.value = "";
    priseInput.value = "";
    searchBox.value = "";
    yearInput.value = "";

    inputsCar.forEach((car) => {
      car.classList.remove("border_red");
    });
  } else {
    alert("Fill in the blank fields!");

    inputsCar.some((inputCar) => {
      if (!inputCar.value) {
        inputCar.classList.add("border_red");
      } else {
        inputCar.classList.remove("border_red");
      }
    });
  }

  renderCars(carsStore, carsList);
};

const deleteButtonCar = (indexToDelete, cars) => {
  let isDelete = confirm("Are you sure you want to delete?");
  if (isDelete) {
    const filteredCarsDelete = cars.filter(
      (_, index) => indexToDelete != index
    );
    filteredCars = filteredCarsDelete;
    return renderCars(filteredCars, carsList);
  }
};

const searchCars = (event) => {
  const newSearchCars = carsStore.filter((car) => {
    if (
      car.generalSearch
        .toLocaleLowerCase()
        .indexOf(event.target.value.toLowerCase()) !== -1
    ) {
      return true;
    }
  });

  filteredCars = newSearchCars;

  renderCars(filteredCars, carsList);
  if (filteredCars.length === 0) {
    const ResultNotFound = document.createElement("span");
    ResultNotFound.textContent = "Result not found";
    carsList.appendChild(ResultNotFound);
  }
};

const filterCarsAZ = () => {
  filteredCars = carsStore.sort((a, b) => a.brand.localeCompare(b.brand));
  renderCars(filteredCars, carsList);
};
const filterCarsZA = () => {
  filteredCars = carsStore.sort((a, b) => b.brand.localeCompare(a.brand));
  renderCars(filteredCars, carsList);
};

const filterTheCheapest = () => {
  const filteredPriceCheapest = carsStore.sort((a, b) => a.price - b.price);
  renderCars(filteredPriceCheapest, carsList);
};
const filterTheMostExpensive = () => {
  const filteredPriceExpensive = carsStore.sort((a, b) => b.price - a.price);
  renderCars(filteredPriceExpensive, carsList);
};
const filterTheNewest = () => {
  const filteredYearNewest = carsStore.sort((a, b) => b.year - a.year);
  renderCars(filteredYearNewest, carsList);
};
const filterTheOldest = () => {
  const filteredYearOldest = carsStore.sort((a, b) => a.year - b.year);
  renderCars(filteredYearOldest, carsList);
};

const filterCars = (event) => {
  if (event.target.value === "the_cheapest") {
    filterTheCheapest();
  } else if (event.target.value === "the_most-expensive") {
    filterTheMostExpensive();
  } else if (event.target.value === "the_newest") {
    filterTheNewest();
  } else if (event.target.value === "the_oldest") {
    filterTheOldest();
  } else if (event.target.value === "brand_A-Z") {
    filterCarsAZ();
  } else if (event.target.value === "brand_Z-A") {
    filterCarsZA();
  }
};

renderCars(carsStore, carsList);

searchBox.addEventListener("input", searchCars);
addCarButton.addEventListener("click", addCar);
searchCarsSelect.addEventListener("change", filterCars);
