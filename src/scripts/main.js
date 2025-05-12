document.addEventListener('DOMContentLoaded', async () => {
  const model = new ProductModel();
  const view = new ProductView();
  const controller = new ProductController(model, view);

  if (window.location.pathname.includes('add-product.html')) {
    await controller.init();
  } else {
    await controller.showProducts();
  }
});