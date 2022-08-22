import axios from "axios";
import { setToken } from "../../utils/preserved-storage";
import { AuthDataMapper } from "../mapper/AuthDataMapper";
import { CoreDataMapper } from "../mapper/CoreDataMapper";
import { Category } from "../models";
import { apiBaseUrl } from "./axios-constant";

export class CoreApi {
    async getCategories () {
        const response = await axios({
            method: 'get',
            url: `${apiBaseUrl}/api/category/list`,
        })
        .then(response => {
            console.log('login response => ', response);
            console.log(`status = ${response.status} , data = ${response.data} `);
            if (response.status >= 200 && response.status < 400) {
                return CoreDataMapper.mapToCategories(response.data);
            } else {
                throw "Contact at office"
            }
        })
        .catch(e => {
            console.log('catch login err => ', e);
            console.log('catch response.data err => ', e.response.data);
            throw e.response.data
        })
        console.log('response response = ', response);
        return response
    }
    async getSubCategories () {
        const response = await axios({
            method: 'get',
            url: `${apiBaseUrl}/api/subcategory/list`,
        })
        .then(response => {
            console.log('login response => ', response);
            console.log(`status = ${response.status} , data = ${response.data} `);
            if (response.status >= 200 && response.status < 400) {
                return CoreDataMapper.mapToSubCategories(response.data);
            } else {
                throw "Contact at office"
            }
        })
        .catch(e => {
            console.log('catch login err => ', e);
            console.log('catch response.data err => ', e.response.data);
            throw e.response.data
        })
        console.log('response response = ', response);
        return response
    }
    async getSubCategoriesByCategory () {
        const response = await axios({
            method: 'get',
            url: `${apiBaseUrl}/api/subcategory/list`,
        })
        .then(response => {
            console.log('login response => ', response);
            console.log(`status = ${response.status} , data = ${response.data} `);
            if (response.status >= 200 && response.status < 400) {
                return CoreDataMapper.mapToSubCategories(response.data);
            } else {
                throw "Contact at office"
            }
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
