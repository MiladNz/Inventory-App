import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("add-new-product");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    this.products = [];
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }

  addNewProduct(e) {
    e.preventDefault();
    const title = document.getElementById("product-title").value;
    const quantity = document.getElementById("product-quantity").value;
    const category = document.getElementById("product-category").value;
    if (!title || !quantity || !category) return;
    Storage.saveProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductsList();
  }

  createProductsList() {
    let result = "";
    this.products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      result += `<div class="flex items-center justify-between mb-2">
        <span class="text-slate-400">${item.title}</span>
        <div class="flex items-center gap-x-3">
          <span class="text-slate-400">${new Date().toLocaleDateString(
            "fa-IR"
          )}</span>
          <span
            class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-xl">
            ${selectedCategory.title}</span>
          <span
            class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-300 border-2 border-slate-300">
            ${item.quantity}
          </span>
          <button
            class="border px-2 py-0.5 rounded-2xl border-red-500 text-red-400" data-id=${
              item.id
            }>
            delete
          </button>
        </div>
      </div>`;
    });

    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;
  }
}

export default new ProductView();
