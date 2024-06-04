import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/asset.service'; // Adjust the path as necessary

@Component({
  selector: 'app-asset-grid',
  templateUrl: './asset-grid-view.page.html',
  styleUrls: ['./asset-grid-view.page.scss'],
})
export class AssetGridPage implements OnInit {
  substations: string[] = [];
  assets: any[] = [];
  selectedSubstation: string;
  searchQuery: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadSubstations();
  }

  loadSubstations() {
    this.dataService.getSubstations().subscribe(
      data => {
        this.substations = data;
      },
      error => {
        console.error('Error loading substations', error);
      }
    );
  }

  selectSubstation(substation: string) {
    this.selectedSubstation = substation;
    this.loadAssets(substation);
  }

  loadAssets(substation: string) {
    this.dataService.getAssetsBySubstation(substation).subscribe(
      data => {
        this.assets = data;
      },
      error => {
        console.error('Error loading assets', error);
      }
    );
  }

  filteredAssets() {
    if (!this.searchQuery) {
      return this.assets;
    }
    return this.assets.filter(asset => 
      asset.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
