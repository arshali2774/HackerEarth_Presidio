import express from 'express';
import PropertyController from '../controllers/property.controller.js';
import authenticateUser from '../middleware/auth.middleware.js';
import { authorizeSeller } from '../middleware/property.middleware.js';
const propertyRouter = express.Router();

// Route to create a new property
propertyRouter.post('/', PropertyController.createProperty);
propertyRouter.get(
  '/',

  PropertyController.getPropertiesForSeller
);
propertyRouter.get('/all', PropertyController.getAllProperties);
propertyRouter.get('/filter', PropertyController.filterProperties);

// Route to fetch property details along with seller information

propertyRouter.get('/:propertyId', PropertyController.getPropertyDetails);

// Route to update a property
propertyRouter.put(
  '/update/:propertyId',
  authorizeSeller,
  PropertyController.updateProperty
);

// Route to delete a property
propertyRouter.delete(
  '/delete/:propertyId',
  authorizeSeller,
  PropertyController.deleteProperty
);

export default propertyRouter;
