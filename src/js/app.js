import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  ProductView.setApp();
  // create categories option
  CategoryView.createCategoriesList();
  //
  ProductView.createProductsList(ProductView.products);
});
