import express from 'express';
import UserController from '../controllers/userController';
import AuthValidator from '../middlewares/authValidator';
import PropertyController from '../controllers/propertyController';
import PropertyValidator from '../middlewares/propertyValidator'

const router = express.Router();

const { createAccount, loginUser } = UserController;
const { validateSignUp, userExists, validateLogin, isTokenValid, isAgent } = AuthValidator;
const { createPropertyAd, updatePropertyAdStatus, updatePropertyAdPrice, getAProperty, getAllPropertys, deletePropertyAd, getPropertysByType } = PropertyController;
const { validateProperty, isPropertyExist, validateStatus, validatePrice } = PropertyValidator;

// Auth routes
const authBaseUrl = '/api/v1/auth';
router.post(`${authBaseUrl}/signup`, validateSignUp, userExists, createAccount);
// router.post(`${authBaseUrl}/login`, validateLogin, loginUser);

// // Property routes
// const propertyBaseUrl = '/api/v1/property';
// router.post(`${propertyBaseUrl}`, isTokenValid, isAgent, validateProperty, createPropertyAd);
// router.patch(`${propertyBaseUrl}/:propertyId/status`, isTokenValid, isAgent, isPropertyExist, validateStatus, updatePropertyAdStatus);
// router.patch(`${propertyBaseUrl}/:propertyId/price`, isTokenValid, isAgent, isPropertyExist, validatePrice, updatePropertyAdPrice);
// router.get(`${propertyBaseUrl}`, isTokenValid, getAllPropertys);
// router.get(`${propertyBaseUrl}/:propertyId`, isTokenValid, getAProperty);
// router.get(`${propertyBaseUrl}/getByType/:propertyType`, isTokenValid, getPropertysByType);
// router.delete(`${propertyBaseUrl}/:propertyId`, isTokenValid, isAgent, deletePropertyAd);

export default router;

