import axios from "axios";
import { AuthDataMapper } from "../mapper/AuthDataMapper";
import { AuthRequest } from "../models";

export class AuthApi {
    async loginApi (authRequest: AuthRequest) {
        const requestJson = AuthDataMapper.mapToAuthRequestJson(authRequest);
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_API}/api/auth/login`,
            data: requestJson
        })
        .then(response => {
            console.log('login response => ', response);
            console.log(`status = ${response.status} , data = ${response.data} `);
            // if (response.status >= 200 && response.status < 400) {
            return AuthDataMapper.mapToAuth(response.data);
            // }
        })
        .catch(e => {
            console.log('catch login err => ', e);
            console.log('catch response.data err => ', e.response.data);
            throw e.response.data
        })
        console.log('response response = ', response);
        return response
    }
}
