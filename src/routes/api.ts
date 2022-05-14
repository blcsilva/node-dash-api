import { Router } from 'express';
import { privateRoute } from '../config/passport';
import * as ApiController from '../controllers/apiController';
import * as HomeController from '../controllers/HomeController';
import * as AuthController from '../controllers/AuthController';

const router = Router();

router.get('/' ,HomeController.home);
router.get('/login',AuthController.login);
router.get('/register',AuthController.register);
router.get('profile')
router.get('userProfile')
router.get('profileEdit.mst')
router.get('/adminDashboard',privateRoute ,ApiController.list) 



router.post('/register', ApiController.register);
router.post('/login', ApiController.login);

router.get('/list', ApiController.list);

export default router;