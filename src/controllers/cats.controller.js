const CatService = require("../services/cat.service");
const ResponseService = require("../services/reponse.service");
const { HTTP_STATUS } = require("../shared/constants");

const CatsController = {
  async createCat(req, res) {
    const cat = CatService.createCat(req.body);

    ResponseService.json(res, HTTP_STATUS.CREATED, "cat created", cat);
  },

  getAllCats(_req, res) {
    const cats = CatService.getAllCats();

    ResponseService.json(res, HTTP_STATUS.OK, "cats retrieved", cats);
  },

  getSingleCat(req, res) {
    const cat = CatService.findCatById(req.params.id);

    ResponseService.json(res, HTTP_STATUS.OK, "cat retrieved", cat);
  },

  updateCat(req, res) {
    const cat = CatService.updateCatById(req.params.id, req.body);

    ResponseService.json(res, HTTP_STATUS.OK, "cat updated", cat);
  },

  deleteCat(req, res) {
    const cat = CatService.deleteCatById(req.params.id);

    ResponseService.json(res, HTTP_STATUS.OK, "cat deleted", cat);
  },
};

module.exports = CatsController;
