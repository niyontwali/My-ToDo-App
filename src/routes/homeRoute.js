// imported express to use on the Router function
import express from 'express';
// imported controller for the home route
import homeController from '../controllers/homeController';

// Defined router function
const router = express.Router();

// route for the home page
router.get('/', homeController);

export default router;

