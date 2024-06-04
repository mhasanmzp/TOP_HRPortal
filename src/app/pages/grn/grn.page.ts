import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/asset.service'; // Adjust the path as necessary
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-grn',
  templateUrl: './grn.page.html',
  styleUrls: ['./grn.page.scss'],
})
export class GrnPage implements OnInit {
  purchaseData: any[] = [];
  isModalOpen = false;
  oemsList = [];
  categories = [];
    material: any = {
    oem: '',
    category: '',
    productName: '',
    quantity: '',
    unit: '',
    date: '',
    warrantyPeriod: '',
    serialNumbers: []
  };
  searchTerm: any;
  data: any=[];

  constructor(
    private modalController: ModalController,
    private dataService: DataService, // Inject the DataService
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadOems();
    this.loadCategories();
    this.fetchData();
  
  }

  loadOems() {
    const formData = {
      permissionName: 'Tasks',
      employeeIdMiddleware: 342,
      employeeId: 342,
    };

    this.dataService.fetchOEM(formData).then((res: any) => {
      this.data= res
      console.log("Response ::::::::::::::",res)
    }).catch(error => {
      console.error('Error fetching OEM data', error);
    });
  }

  loadCategories() {
    const formData = {
      permissionName: 'Tasks',
      employeeIdMiddleware: 342,
      employeeId: 342,
    };

    this.dataService.fetchCategories(formData).then((res: any) => {
      this.data= res
      console.log("Response ::::::::::::::",res)
    }).catch(error => {
      console.error('Error fetching OEM data', error);
    });
  }
 
  // loadCategories() {
  //   // Fetch categories from API using DataService
  //   this.dataService.getCategories().subscribe(data => {
  //     this.categories = data;
  //   });
  // }

  openAddMaterialModal() {
    this.isModalOpen = true;
  }

  closeAddMaterialModal() {
    this.isModalOpen = false;
  }

  getSerialNumbersArray() {
    return new Array(this.material.quantity);
  }



fetchData() {
  const formData = {
    permissionName: 'Tasks',
    employeeIdMiddleware: 342,
    employeeId: 342,
  };
  console.log('formdata', formData);
  this.dataService.fetchData(formData).then((data: any) => {
    console.log('Asset DATA', data);
    this.purchaseData = data.purchaseData.map((purchaseData) => ({
      ...purchaseData,
      quantityRejected: purchaseData.nonUsableItems,
      stockableQuantity: purchaseData.usableItems,
      purchaseId: purchaseData.purchaseId
    }));
  }).catch(error => {
    console.error('Error fetching data', error);
  });
}

  async saveMaterial() {
    // Save material via API using DataService
    this.dataService.submitMaterial(this.material).subscribe(async response => {
      // Show success toast message
      const toast = await this.toastController.create({
        message: 'Asset saved successfully!',
        duration: 2000,
        position: 'bottom'
      });
      await toast.present();

      // Close the modal
      this.closeAddMaterialModal();
    }, async error => {
      // Handle error
      const toast = await this.toastController.create({
        message: 'Failed to save asset. Please try again.',
        duration: 2000,
        position: 'bottom'
      });
      await toast.present();
    });
  }
}


















































// export class GrnPage implements OnInit {
//   isModalOpen = false;
//   oems = [];
//   categories = [];
//   material: any = {
//     oem: '',
//     projectName: '',
//     category: '',
//     model: '',
//     quantity: '',
//     unit: '',
//     date: '',
//     warrantyPeriod: '',
//     serialNumbers: []
//   };
// searchTerm: any;

//   constructor(private modalController: ModalController, private http: HttpClient, private toastController: ToastController) { }

//   ngOnInit() {
//     this.loadOems();
//     this.loadCategories();
//   }

//   loadOems() {
//     // Fetch OEMs from API
//     this.http.get<any[]>('your-api-url/oems').subscribe(data => {
//       this.oems = data;
//     });
//   }

//   loadCategories() {
//     // Fetch categories from API
//     this.http.get<any[]>('your-api-url/categories').subscribe(data => {
//       this.categories = data;
//     });
//   }

//   openAddMaterialModal() {
//     this.isModalOpen = true;
//   }

//   closeAddMaterialModal() {
//     this.isModalOpen = false;
//   }

//   getSerialNumbersArray() {
//     return new Array(this.material.quantity);
//   }

//   async saveMaterial() {
//     // Save material via API
//     this.http.post('your-api-url/save-material', this.material).subscribe(async response => {
//       // Show success toast message
//       const toast = await this.toastController.create({
//         message: 'Asset saved successfully!',
//         duration: 2000,
//         position: 'bottom'
//       });
//       await toast.present();

//       // Close the modal
//       this.closeAddMaterialModal();
//     }, async error => {
//       // Handle error
//       const toast = await this.toastController.create({
//         message: 'Failed to save asset. Please try again.',
//         duration: 2000,
//         position: 'bottom'
//       });
//       await toast.present();
//     });
//   }
// }