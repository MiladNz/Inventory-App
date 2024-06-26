import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");
class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProduct(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
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
    this.createProductsList(this.products);
  }

  createProductsList(products) {
    let result = "";
    products.forEach((item) => {
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
            class="delete-product border px-2 py-0.5 rounded-2xl border-red-500 text-red-400" 
            data-product-id=${item.id}>
            delete
          </button>
        </div>
      </div>`;
    });

    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;

    const deleteProductBtns = [...document.querySelectorAll(".delete-product")];
    deleteProductBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.deleteProduct(e));
    });
  }

  searchProduct(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filteredProducts);
  }
  sortProducts(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }
  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
}

export default new ProductView();
