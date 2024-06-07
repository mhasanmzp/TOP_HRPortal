import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/asset.service'; // Adjust the path as necessary

@Component({
  selector: 'app-asset',
  templateUrl: './asset.page.html',
  styleUrls: ['./asset.page.scss'],
})
export class AssetPage implements OnInit {
  isModalOpen = false;
  categories = ['Category1', 'Category2', 'Category3'];
  engineers = ['Engineer1', 'Engineer2', 'Engineer3'];
  models = ['Model1', 'Model2', 'Model3'];
  oems = ['OEM1', 'OEM2', 'OEM3'];
  projects = ['Project1', 'Project2', 'Project3'];
  sites = ['Site1', 'Site2', 'Site3'];
  stores = ['Store1', 'Store2', 'Store3'];

  data = {
    masterData: '',
    engineer: '',
    model: '',
    oem: '',
    project: '',
    site: '',
    store: ''
  };

  categoryInputs: string[] = [''];
  engineerInputs: string[] = [''];
  modelInputs: string[] = [''];
  oemInputs: string[] = [''];
  projectInputs: string[] = [''];
  siteInputs: string[] = [''];
  storeInputs: string[] = [''];

  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private dataService: DataService
  ) { }

  ngOnInit() { }
  openAddDataModal() {
    this.isModalOpen = true;
    this.data.masterData = 'Category';  // Set default segment to "Category"
  }

  closeAddDataModal() {
    this.isModalOpen = false;
  }

  addCategoryInput() {
    this.categoryInputs.push('');
  }

  removeCategoryInput(index: number) {
    this.categoryInputs.splice(index, 1);
  }

  addEngineerInput() {
    this.engineerInputs.push('');
  }

  removeEngineerInput(index: number) {
    this.engineerInputs.splice(index, 1);
  }

  addModelInput() {
    this.modelInputs.push('');
  }

  removeModelInput(index: number) {
    this.modelInputs.splice(index, 1);
  }

  addOEMInput() {
    this.oemInputs.push('');
  }

  removeOEMInput(index: number) {
    this.oemInputs.splice(index, 1);
  }

  addProjectInput() {
    this.projectInputs.push('');
  }

  removeProjectInput(index: number) {
    this.projectInputs.splice(index, 1);
  }

  addSiteInput() {
    this.siteInputs.push('');
  }

  removeSiteInput(index: number) {
    this.siteInputs.splice(index, 1);
  }

  addStoreInput() {
    this.storeInputs.push('');
  }

  removeStoreInput(index: number) {
    this.storeInputs.splice(index, 1);
  }

  async saveData() {
    let saveObservable;

    switch (this.data.masterData) {
      case 'Category':
        saveObservable = this.dataService.saveCategory({ categories: this.categoryInputs });
        break;
      case 'Engineer':
        saveObservable = this.dataService.saveEngineer({ engineers: this.engineerInputs });
        break;
      case 'Model':
        saveObservable = this.dataService.saveModel({ models: this.modelInputs });
        break;
      case 'OEM':
        saveObservable = this.dataService.saveOEM({ oems: this.oemInputs });
        break;
      case 'Project':
        saveObservable = this.dataService.saveProject({ projects: this.projectInputs });
        break;
      case 'Site':
        saveObservable = this.dataService.saveSite({ sites: this.siteInputs });
        break;
      case 'Store':
        saveObservable = this.dataService.saveStore({ stores: this.storeInputs });
        break;
      default:
        return;
    }

    try {
      await saveObservable.toPromise();
      const toast = await this.toastController.create({
        message: 'Data saved successfully!',
        duration: 2000,
        position: 'bottom'
      });
      await toast.present();
      this.closeAddDataModal();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Failed to save data!',
        duration: 2000,
        position: 'bottom'
      });
      await toast.present();
    }
  }
}
