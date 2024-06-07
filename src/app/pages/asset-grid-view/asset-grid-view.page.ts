import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-assed-grid-view',
  templateUrl: './asset-grid-view.page.html',
  styleUrls: ['./asset-grid-view.page.scss'],
})
export class AssetGridViewPage implements OnInit {
  substations: string[] = [];
  selectedSubstation: string = '';
  searchQuery: string = '';
  assets: any[] = [];
  substationData : any[] = [];


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadSubstations
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
}
