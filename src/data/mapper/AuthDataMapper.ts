import { Auth, AuthRequest } from "../models";
import { UserDataMapper } from "./UserDataMapper";

export class AuthDataMapper {
    static mapToAuth (response: any): Auth {
        console.log('start mapping', response);
        const auth: Auth = {
            isAuthenticated: response.token ? true : false,
            token: response.token,
            user: UserDataMapper.mapToUser(response.user)
        }
        console.log('mapped data is', auth)
        return auth;
    }
    static mapToAuthRequestJson (authRequest: AuthRequest): any {
        const json: any = {
            'email': authRequest.email,
            'password': authRequest.password
        }
        return json;
    }
}
