import { Router } from "express";
import { verifyAndAddUser, login as loginUser, create as createUser, get as getUser} from "../controller/user.controller" ;

const route = Router();

route.post('/create', createUser );
route.post('/login', loginUser );

//@ts-ignore
route.use(verifyAndAddUser);
//@ts-ignore
route.get('/get', getUser );

export default route ;