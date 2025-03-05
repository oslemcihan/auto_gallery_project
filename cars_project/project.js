//projenin ana js dosyası olacak

const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");

//UI Objesini Başlatma

const ui = new UI();

const storage = new Storage();

//Tüm Evenetleri Yükleme

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addCar);

  document.addEventListener("DOMContentLoaded", function () {
    let cars = storage.getCarsFromStorage();
    ui.loadAllCars(cars);
  });

  cardbody.addEventListener("click", deleteCar);
  clear.addEventListener("click", clearAllCars);
}

function addCar(e) {
  const title = titleElement.value;
  const price = priceElement.value;
  const url = urlElement.value;

  if (title === "" || price === "" || url === "") {
    ui.displayMessages("Lütfen tüm alanları doldurun!", "danger");
    e.preventDefault();
  } else {
    //Yeni Araç
    const newCar = new Car(title, price, url);

    ui.addCarToUI(newCar); //Arayüze araç ekleme işlemi

    storage.addCarToStorage(newCar);
    ui.displayMessages("Araç başarıyla eklendi", "success");
    e.preventDefault(); // Formun sayfayı yenilemesini engelle
  }
  ui.clearInputs(titleElement, urlElement, priceElement);
  e.preventDefault();
}

function deleteCar(e) {
  if (e.target.id === "delete-car") {
    ui.deleteCarFromUI(e.target);

    storage.deleteCarFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
    ui.displayMessages("Silme işlemi başarıyla gerçekleşti.", "success");
  }
}

function clearAllCars() {
  if (confirm("Tüm araçlar silinecek. Emin misiniz?")) {
    ui.clearAllCarsFromUI();
    storage.clearAllCarsFromStorage();
  }
}
