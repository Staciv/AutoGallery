import { cars } from "./cars-mock.js";

const searchBox = document.getElementById("search_box");
const searchCarsSelect = document.getElementById("sort_cars-select");
const modalButtonAddCar = document.querySelector(".add_a-car");
const closeModal = document.querySelector(".close-modal");
const sectionRight = document.querySelector(".section_right");
const sectionLeft = document.querySelector(".section_left");
const carsList = document.querySelector(".cars_list");
const carBrandInput = document.getElementById("car_brand-input");
const carLinkInput = document.getElementById("car_link-input");
const descriptionInput = document.getElementById("description_input");
const priseInput = document.getElementById("prise_input");
const yearInput = document.getElementById("year_input");
const addCarButton = document.getElementById("add_car");

let carsStore = cars
  .map((car) => {
    const newCar = { ...car };

    newCar[
      "generalSearch"
    ] = `${car.brand} ${car.year} ${car.price}$ ${car.description} `;

    return newCar;
  })
  .sort((a, b) => b.price - a.price);
let sortedCars = carsStore;

const inputsCar = [
  carBrandInput,
  carLinkInput,
  descriptionInput,
  priseInput,
  yearInput,
];

const renderCars = (cars) => {
  carsList.innerHTML = "";

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
    carItemRightDescription.className = "description";

    carItemLeftImage.src = car.imageUrl;
    deleteImage.src = "./images/delete.png";
    carItemRightBrandYear.textContent = `${car.brand + ", " + car.year}`;
    carItemRightDescription.textContent = car.description;
    carItemRightPrice.textContent = `${car.price} $`;

    carsList.appendChild(carItem);
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

    sectionRight.classList.remove("active");
    sectionLeft.classList.remove("blur-background");

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

  renderCars(carsStore);
};

const modalAddCar = () => {
  sectionRight.classList.add("active");
  sectionLeft.classList.add("blur-background");
  closeModal.classList.add("close-btn");
  closeModal.style.display = "block";
};

const closeModalWindow = () => {
  sectionRight.classList.remove("active");
  sectionLeft.classList.remove("blur-background");
};

const deleteButtonCar = (indexToDelete, cars) => {
  const isDeleteConfirmed = confirm("Are you sure you want to delete?");

  if (isDeleteConfirmed) {
    sortedCars = cars.filter((_, index) => indexToDelete != index);

    carsStore = sortedCars;

    return renderCars(carsStore);
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

  sortedCars = newSearchCars;

  renderCars(sortedCars);

  if (sortedCars.length === 0) {
    const resultNotFoundElement = document.createElement("span");

    resultNotFoundElement.textContent = "Result not found";

    carsList.appendChild(resultNotFoundElement);
  }
};

const sortByNameAsc = () =>
  carsStore.sort((a, b) => a.brand.localeCompare(b.brand));
const sortByNameDesc = () =>
  carsStore.sort((a, b) => b.brand.localeCompare(a.brand));
const sortByPriceAsc = () => carsStore.sort((a, b) => a.price - b.price);
const sortByPriceDesc = () => carsStore.sort((a, b) => b.price - a.price);
const sortByYearDesc = () => carsStore.sort((a, b) => b.year - a.year);
const sortByYearAsc = () => carsStore.sort((a, b) => a.year - b.year);

const sortCars = (event) => {
  let newSortedCars = [];

  if (event.target.value === "the_cheapest") {
    newSortedCars = sortByPriceAsc();
  } else if (event.target.value === "the_most-expensive") {
    newSortedCars = sortByPriceDesc();
  } else if (event.target.value === "the_newest") {
    newSortedCars = sortByYearDesc();
  } else if (event.target.value === "the_oldest") {
    newSortedCars = sortByYearAsc();
  } else if (event.target.value === "brand_A-Z") {
    newSortedCars = sortByNameAsc();
  } else if (event.target.value === "brand_Z-A") {
    newSortedCars = sortByNameDesc();
  }

  sortedCars = newSortedCars;
  renderCars(newSortedCars);
};

renderCars(carsStore);

searchBox.addEventListener("input", searchCars);
modalButtonAddCar.addEventListener("click", modalAddCar);
closeModal.addEventListener("click", closeModalWindow);
addCarButton.addEventListener("click", addCar);
searchCarsSelect.addEventListener("change", sortCars);
