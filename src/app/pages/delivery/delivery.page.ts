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
  substations: string[] = [];
  selectedSubstation: string;
  selectedCategory: any;
  loadData: any;
  searchQuery: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadCategories();
    this.loadSubstations();
  }

  loadCategories() {
    this.dataService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  filteredProducts() {
    if (!this.searchQuery) {
      return this.products;
    }
    return this.products.filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  loadSubstations() {
    this.dataService.getSubstations().subscribe(data => {
      this.substations = data;
    });
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
    this.dataService.getProductsByCategory(category.id).subscribe(data => {
      this.products = data;
    });
  }

  deliverProduct() {
    const selectedProducts = this.products.filter(product => product.selected);
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
      substation: this.selectedSubstation
    };
    this.dataService.deliverProduct(deliveryDetails).subscribe(
      response => {
        alert('Products delivered successfully!');
        this.loadData(); // Refresh categories/products after delivery
        this.selectedSubstation = null;
        this.products = [];
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
