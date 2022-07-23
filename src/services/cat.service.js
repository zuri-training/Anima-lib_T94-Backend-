const NotFoundException = require("../shared/http-exceptions/not-found.exception");

const cats = [];

const CatService = {
  createCat(params) {
    const cat = Object.assign({}, params);

    cat.id = cats.length;
    cat.isDeleted = false;
    cats.push(cat);

    return cat;
  },

  getAllCats() {
    return cats.filter((cat) => !cat.isDeleted).reverse();
  },

  findCatById(id) {
    const cat = cats.find((cat) => cat.id === Number(id) && !cat.isDeleted);
    if (!cat) {
      throw new NotFoundException("cat not found");
    }

    return cat;
  },

  deleteCatById(id) {
    const cat = this.findCatById(id);

    cat.isDeleted = true;
    cats[cat.id] = cat;

    return cat;
  },

  updateCatById(id, update) {
    const cat = this.findCatById(id);

    Object.assign(cat, update);
    cats[cat.id] = cat;

    return cat;
  },
};

module.exports = CatService;
