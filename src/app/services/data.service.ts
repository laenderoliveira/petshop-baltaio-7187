import { Product } from './../models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DataService {


    private url = "http://localhost:3000/v1";
    constructor(private http: HttpClient) {}


    composeHeader() {
        const token = localStorage.getItem('petshop.token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return headers;

    }

    getProducts() {
        return this.http.get<Product[]>(`${this.url}/products`);
    }

    authenticate(data) {
        return this.http.post(`${this.url}/accounts/authenticate`, data);
    }

    refreshToken() {
        return this.http.post(`${this.url}/accounts/refresh-token`, null, { headers: this.composeHeader()});
    }

    create(data) {
        return this.http.post(`${this.url}/accounts`, data);
    }

    resetPassword(data) {
        return this.http.post(`${this.url}/accounts/reset-password`, data);
    }

    getUser() {
        return this.http.get(`${this.url}/accounts`,{ headers: this.composeHeader()});
    }
    updateUser(data) {
        return this.http.put(`${this.url}/accounts`, data, { headers: this.composeHeader()});
    }
}