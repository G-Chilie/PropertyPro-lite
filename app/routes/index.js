import express from 'express';
import UserController from '../controllers/userController';
import AuthValidator from '../middlewares/authValidator';
import PropertyController from '../controllers/propertyController';
import PropertyValidator from '../middlewares/propertyValidator'
import FlagController from '../controllers/flagController';
import FlagValidator from '../middlewares/flagValidator';

const router = express.Router();

const { createAccount, loginUser } = UserController;
const { validateSignUp, userExists, validateLogin,  isTokenValid, isAdmin } = AuthValidator;
const { createPropertyAd, updatePropertyAdStatus, updatePropertyAdPrice, getAProperty, getAllPropertys, deletePropertyAd, getPropertysByType } = PropertyController;
const { validateProperty, isPropertyExist, validateStatus, validatePrice } = PropertyValidator;
const { createFlag } = FlagController;
const { validateFlag } = FlagValidator;

// Auth routes
const authBaseUrl = '/api/v1/auth';
router.post(`${authBaseUrl}/signup`, validateSignUp, userExists, createAccount);
router.post(`${authBaseUrl}/login`, validateLogin, loginUser);

// Property routes
const propertyBaseUrl = '/api/v1/property';
router.post(`${propertyBaseUrl}`, isTokenValid, validateProperty, createPropertyAd);
router.patch(`${propertyBaseUrl}/:propertyId/status`, isTokenValid, isPropertyExist, validateStatus, updatePropertyAdStatus);
router.patch(`${propertyBaseUrl}/:propertyId/price`, isTokenValid, isPropertyExist, validatePrice, updatePropertyAdPrice);
router.get(`${propertyBaseUrl}/getByType`, isTokenValid, getPropertysByType);
router.get(`${propertyBaseUrl}`, isTokenValid, getAllPropertys);
router.get(`${propertyBaseUrl}/:propertyId`, isTokenValid, getAProperty);
router.delete(`${propertyBaseUrl}/:propertyId`, isTokenValid, isAdmin, deletePropertyAd);

//Flag route
const flagBaseUrl = '/api/v1/flag';
router.post(`${flagBaseUrl}`, isTokenValid, validateFlag, isPropertyExist, createFlag)

export default router;

