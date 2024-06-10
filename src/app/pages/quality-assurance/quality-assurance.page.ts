import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quality-assurance',
  templateUrl: './quality-assurance.page.html',
  styleUrls: ['./quality-assurance.page.scss'],
})
export class QualityAssurancePage implements OnInit {
  categories = [
    { name: 'Category1' },
    { name: 'Category2' },
    { name: 'Category3' },
  ];
  oems = [
    { name: 'OEM1' },
    { name: 'OEM2' },
    { name: 'OEM3' },
  ];
  substations = ['Substation1', 'Substation2', 'Substation3'];

  selectedCategory: any;
  selectedOEM: any;
  searchQuery: string = '';
  selectedSubstation: string;

  products = [
    { serialNumber: '123', name: 'Product1', status: 'Available', selection: '' },
    { serialNumber: '456', name: 'Product2', status: 'Unavailable', selection: '' },
    { serialNumber: '789', name: 'Product3', status: 'Available', selection: '' },
    { serialNumber: '101', name: 'Product4', status: 'Available', selection: '' },
    { serialNumber: '102', name: 'Product5', status: 'Unavailable', selection: '' },
    { serialNumber: '103', name: 'Product6', status: 'Available', selection: '' },
    { serialNumber: '104', name: 'Product7', status: 'Available', selection: '' },
    { serialNumber: '105', name: 'Product8', status: 'Unavailable', selection: '' },
    { serialNumber: '106', name: 'Product9', status: 'Available', selection: '' },
    { serialNumber: '107', name: 'Product10', status: 'Available', selection: '' },
    { serialNumber: '108', name: 'Product11', status: 'Unavailable', selection: '' },
    { serialNumber: '109', name: 'Product12', status: 'Available', selection: '' },
    { serialNumber: '110', name: 'Product13', status: 'Available', selection: '' },
    { serialNumber: '111', name: 'Product14', status: 'Unavailable', selection: '' },
    { serialNumber: '111', name: 'Product14', status: 'Unavailable', selection: '' },
    { serialNumber: '111', name: 'Product14', status: 'Unavailable', selection: '' },
    { serialNumber: '111', name: 'Product14', status: 'Unavailable', selection: '' },
    { serialNumber: '111', name: 'Product14', status: 'Unavailable', selection: '' },
    { serialNumber: '111', name: 'Product14', status: 'Unavailable', selection: '' },
  ];

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor() {}

  ngOnInit() {}

  selectCategory(event: any) {
    // Handle category selection
    console.log('Selected Category:', this.selectedCategory);
  }

  selectOEM(event: any) {
    // Handle OEM selection
    console.log('Selected OEM:', this.selectedOEM);
  }

  filteredProducts() {
    const filtered = this.searchQuery
      ? this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      : this.products;
    
    return this.paginate(filtered);
  }

  paginate(items: any[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return items.slice(start, end);
  }

  changePage(increment: number) {
    this.currentPage += increment;
  }

  deliverProduct() {
    console.log('Deliver product to:', this.selectedSubstation);
  }
}
