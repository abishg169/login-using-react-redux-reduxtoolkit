import { User } from "../models";

export class UserDataMapper {
    static mapToUser (response: any): User {
        const user: User = {
            fullName: response.fullName,
            email: response.email
        }
        return user;
    }
}
