import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private oemUrl = 'https://api.example.com/oems'; // Replace with your actual API endpoint
  private categoryUrl = 'https://api.example.com/categories'; // Replace with your actual API endpoint
  private submitMaterialUrl = 'https://api.example.com/material'; // Replace with your actual API endpoint
  private productsUrl = 'https://api.example.com/products'; // Replace with your actual API endpoint
  private deliverUrl = 'https://api.example.com/deliver'; // Replace with your actual API endpoint
  private substationsUrl = 'https://api.example.com/substations'; // Replace with your actual API endpoint
  private assetsBySubstationUrl = 'https://api.example.com/assets'; // Replace with your actual API endpoint
  private updateProductUrl = 'https://api.example.com/products/update'; // Replace with your actual API endpoint
  private baseUrl = 'https://52eb-122-161-53-240.ngrok-free.app'; // Replace with your actual API endpoint


header : any ={
  
}

  constructor(private http: HttpClient) { }

  fetchOEM(data: any){
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+"/asset-oems-dropdown", data, {headers : this.header }).subscribe((resp: any) => {
        resolve(resp);
      }, error => {
        reject(error);
      });
    });
  }

  fetchCategories(data: any){
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+"/asset-categories-dropdown", data, {headers : this.header }).subscribe((resp: any) => {
        resolve(resp);
      }, error => {
        reject(error);
      });
    });
  }

  submitMaterial(material: any): Observable<any> {
    return this.http.post<any>(this.submitMaterialUrl, material);
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.productsUrl}?categoryId=${categoryId}`);
  }

  deliverProduct(deliveryDetails: any): Observable<any> {
    return this.http.post<any>(this.deliverUrl, deliveryDetails);
  }
  getSubstations(): Observable<any[]> {
    return this.http.get<any[]>(this.substationsUrl);
  }
  generateChallan(deliveryDetails: any): Observable<Blob> {
    // Assuming your backend generates a PDF and returns it as a Blob
    return this.http.post(this.submitMaterialUrl + '/generateChallan', deliveryDetails, { responseType: 'blob' });
  }
  getAssetsBySubstation(substation: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.assetsBySubstationUrl}?substation=${substation}`);
  }
 
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productsUrl);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.updateProductUrl}/${product.id}`, product);
  }
  // fetchData(): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/asset-inventory-dashboard`);
  // }

  fetchData(data: any){
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+"/asset-inventory-dashboard", data, {headers : this.header }).subscribe((resp: any) => {
        resolve(resp);
      }, error => {
        reject(error);
      });
    });
  }
}


