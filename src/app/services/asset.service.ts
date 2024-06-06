import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://97ca-203-92-37-218.ngrok-free.app'; // Replace with your actual API endpoint


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

  fetchCategories(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + "/asset-categories-dropdown", data, { headers: this.header }).subscribe((resp: any) => {
        resolve(resp);
      }, error => {
        reject(error);
      });
    });
  }

  submitMaterial(material: any, formData: any) {
    const payload = {
      ...formData,
      material: material
    };
    return this.http.post(this.baseUrl+"/asset-inventory-grn", payload);
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?categoryId=${categoryId}`);
  }

  // deliverProduct(deliveryDetails: any): Observable<any> {
  //   return this.http.post<any>(this.baseUrl, deliveryDetails);
  // }
  
  deliverProduct(deliveryDetails: any, formData: any) {
    const payload = {
      ...formData,
      deliveryDetails: deliveryDetails
    };
    return this.http.post(this.baseUrl+"/update-delivery-data", payload);
  }

  getSubstations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  generateChallan(deliveryDetails: any): Observable<Blob> {
    // Assuming your backend generates a PDF and returns it as a Blob
    return this.http.post(this.baseUrl + '/generateChallan', deliveryDetails, { responseType: 'blob' });
  }
  getAssetsBySubstation(substation: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?substation=${substation}`);
  }
 
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${product.id}`, product);
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

  fetchProducts(data: any){
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+"/delivery-product-list", data, {headers : this.header }).subscribe((resp: any) => {
        resolve(resp);
      }, error => {
        reject(error);
      });
    });
  }

  fetchSubstations(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + "/asset-sites-dropdown", data, { headers: this.header }).subscribe((resp: any) => {
        resolve(resp);
      }, error => {
        reject(error);
      });
    });
  }
}