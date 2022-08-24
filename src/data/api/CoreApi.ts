import { getToken } from "@/utils/preserved-storage";
import axios from "axios";
import { CoreDataMapper } from "../mapper/CoreDataMapper";
import { apiBaseUrl } from "./axios-constant";

export class CoreApi {
    async getCategories () {
        const response = await axios({
            method: 'get',
            url: `${apiBaseUrl}/api/category/list`,
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        .then(response => {
            console.log('category response => ', response);
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
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
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
    async getSubCategoriesByCategory (category: string) {
        const response = await axios({
            method: 'get',
            url: `${apiBaseUrl}/api/subcategory/list?category=${category}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
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
