import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/asset.service'; // Adjust the path as necessary

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  filteredProduct: any[];
  substations: string[] = [];
  selectedSubstation: string;
  selectedCategory: any;
  searchQuery: string = '';
  data: any;
  substationData: any[];
  productData: any[];
  deliveryAddress: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadCategories();
    this.loadSubstations();
    this.fetchDeliveryProducts();
  }

  loadCategories() {
    const formData = {
      permissionName: 'Tasks',
      employeeIdMiddleware: 342,
      employeeId: 342,
    };

    this.dataService.fetchCategories(formData).then((res: any) => {
      this.categories = res; // Assign response to categories
      console.log("Response ::::::::::::::", res);
    }).catch(error => {
      console.error('Error fetching categories data', error);
    });
  }

  fetchDeliveryProducts() {
    const formData = {
      permissionName: 'Tasks',
      employeeIdMiddleware: 342,
      employeeId: 342,
    };
    console.log('formdata', formData);
    this.dataService.fetchProducts(formData).then((data: any) => {
      console.log('Delivery DATA :::::::::::::::::::::::::::::::::::::::', data);
      this.productData = data.productData.map((product) => ({
        ...product,
        SerialNumber: product.serialNumber,
        ProductName: product.productName,
        Status: product.status,
        selected: false // Add selected property
      }));
      this.filterProducts(); // Filter products after loading
    }).catch(error => {
      console.error('Error fetching data', error);
    });
  }

  filteredProducts(): any[] {
    let filtered = this.productData;

    if (this.searchQuery) {
      filtered = filtered.filter(product => product.ProductName.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.categoryName === this.selectedCategory.name);
    }

    return filtered;
  }

  filterProducts() {
    this.filteredProduct = this.filteredProducts();
  }

  loadSubstations() {
    const formData = {
      permissionName: 'Tasks',
      employeeIdMiddleware: 342,
      employeeId: 342,
    };

    this.dataService.fetchSubstations(formData).then((res: any) => {
      this.substationData = res;
      console.log("Response ::::::::::::::", res);
    }).catch(error => {
      console.error('Error fetching Substations data', error);
    });
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  deliverProduct()
  {
    const formData = {
      permissionName: 'Tasks',
      employeeIdMiddleware: 342,
      employeeId: 342,
    }; 
    
    const selectedProducts = this.productData.filter(product => product.selected);
    if (!this.selectedSubstation) {
      alert('Please select a substation.');
      return;
    }
    if (selectedProducts.length === 0) {
      alert('Please select at least one product.');
      return;
    }
    const deliveryDetails = {
      products: selectedProducts,
      substation: this.selectedSubstation,
    };
    this.dataService.deliverProduct(deliveryDetails, formData).subscribe(
      () => {
        alert('Products delivered successfully!');
        this.selectedSubstation = null;
        this.productData.forEach(product => product.selected = false); // Deselect all products
        this.filterProducts(); // Refresh filtered products
      },
      error => {
        console.error('Error delivering products', error);
        alert('There was an error delivering the products.');
      }
    );
  }

  downloadChallan(deliveryDetails: any) {
    this.dataService.generateChallan(deliveryDetails).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'outward_challan.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error => {
        console.error('Error generating challan', error);
        alert('There was an error generating the challan.');
      }
    );
  }
}






// import { Component, OnInit } from '@angular/core';
// import { DataService } from 'src/app/services/asset.service'; // Adjust the path as necessary

// @Component({
//   selector: 'app-delivery',
//   templateUrl: './delivery.page.html',
//   styleUrls: ['./delivery.page.scss'],
// })
// export class DeliveryPage implements OnInit {
//   categories: any[] = [];
//   products: any[] = [];
//   substations: string[] = [];
//   selectedSubstation: string;
//   selectedCategory: any;
//   searchQuery: string = '';
//   data: any;
//   substationData : any[];
//   productData: any[];
//   constructor(private dataService: DataService) { }

//   ngOnInit() {
//     this.loadCategories();
//     this.loadSubstations();
//     this.fetchDeliveryProducts()
//   }

//   loadCategories() {
//     const formData = {
//       permissionName: 'Tasks',
//       employeeIdMiddleware: 342,
//       employeeId: 342,
//     };

//     this.dataService.fetchCategories(formData).then((res: any) => {
//       this.categories = res; // Assign response to categories
//       console.log("Response ::::::::::::::", res);
//     }).catch(error => {
//       console.error('Error fetching categories data', error);
//     });
//   }

//   fetchDeliveryProducts() {
//     const formData = {
//       permissionName: 'Tasks',
//       employeeIdMiddleware: 342,
//       employeeId: 342,
//     };
//     console.log('formdata', formData);
//     this.dataService.fetchProducts(formData).then((data: any) => {
//       console.log('Delivery DATA :::::::::::::::::::::::::::::::::::::::', data);
//       this.productData = data.productData.map((productData) => ({
//         ...productData,
//         SerialNumber: productData.serialNumber,
//         ProductName: productData.productName,
//         Status: productData.status
//       }));
//     }).catch(error => {
//       console.error('Error fetching data', error);
//     });
//   }

//   filteredProducts(): any[] {
//     if (!this.searchQuery) {
//       return this.products;
//     }
//     return this.products.filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
//   }

//   loadSubstations(){
//     const formData = {
//       permissionName: 'Tasks',
//       employeeIdMiddleware: 342,
//       employeeId: 342,
//     };

//     this.dataService.fetchSubstations(formData).then((res: any) => {
//       this.substationData= res
//       console.log("Response ::::::::::::::",res)
//     }).catch(error => {
//       console.error('Error fetching Substations data', error);
//     });
//   }


//   filterProducts() {
//     if (this.selectedCategory) {
//       this.products = this.filteredProducts().filter(product => product.categoryName === this.selectedCategory.name);
//     } else {
//       this.products = this.filteredProducts();
//     }
//   }

//   selectCategory(category: any) {
//     this.selectedCategory = category;
//     this.filterProducts();
//   }

//   deliverProduct() {
//     const selectedProducts = this.products.filter(product => product.selected);
//     if (!this.selectedSubstation) {
//       alert('Please select a substation.');
//       return;
//     }
//     if (selectedProducts.length === 0) {
//       alert('Please select at least one product.');
//       return;
//     }
//     const deliveryDetails = {
//       products: selectedProducts,
//       substation: this.selectedSubstation
//     };
//     this.dataService.deliverProduct(deliveryDetails).subscribe(
//       () => {
//         alert('Products delivered successfully!');
//         this.selectedSubstation = null;
//         this.products = [];
//       },
//       error => {
//         console.error('Error delivering products', error);
//         alert('There was an error delivering the products.');
//       }
//     );
//   }

//   downloadChallan(deliveryDetails: any) {
//     this.dataService.generateChallan(deliveryDetails).subscribe(
//       (blob: Blob) => {
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'outward_challan.pdf';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//       },
//       error => {
//         console.error('Error generating challan', error);
//         alert('There was an error generating the challan.');
//       }
//     );
//   }
// }
