import { Component } from '@angular/core';
import { UserService } from './user.service';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tech-test-ui';
  spend: any[] = [];
  userList: any[] = [];
  MyChartData: any[] = [];
  regionList: any[] = [];


   lineChartData: ChartDataSets[] = [
    ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                              'August', 'September', 'October', 'November', 'December'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  constructor(private userService: UserService) {
  
  }

  ngOnInit() {

    
    this.userService.getUsers();

    this.userService.getUsers().subscribe(result => {
     this.userList = result;
    //  populate spend list 
     this.spend = this.userList.map(user => user.spend);
     // populate region list with unique values only
     this.regionList =this.userList.map(user => user.region).filter((value, index, self) => self.indexOf(value) === index);
  
    console.log(this.regionList);

//filter on region
// this.userList = userList.filter(0 -> o.region ==='United States');
// this.userList = userList.filter(region => region.region ==='United States');

console.log(this.userList);
console.log("spend: " + this.spend);
this.updateChart();
    },
    err => {
      console.error('error loading', err);
    }
  );


  } 
  onInputChange(event: MatSliderChange) {
    console.log("This is emitted as the thumb slides");
    console.log(event.value);
  }

  updateChart() {
    this.lineChartData = 
   [ { data: this.spend, label: 'Crude oil prices' }]
  }

}