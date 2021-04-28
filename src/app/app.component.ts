import { Component } from '@angular/core';
import { UserService } from './user.service';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MatSliderChange } from '@angular/material/slider';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userList: any[] = [];
  userListfiltered: any[] = [];
  MyChartData: any[] = [];
  regionList: any[] = [];
  monthlySpend: any[] = [];
  monthlyList: any[] = [];
  cumulativeList: any[] = [];

  
  


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
  avg: unknown;


  constructor(private userService: UserService) {
  
  }

  ngOnInit() {

    // retrieve list of users from the service
    this.userService.getUsers().subscribe(result => {
     this.userList = result;
  
     // populate region list with unique values only
     this.regionList =this.userList.map(user => user.region).filter((value, index, self) => self.indexOf(value) === index);
  
    console.log(this.regionList);


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

    this.getMonthlyUsers(event.value);
    
  }

  updateChart() {
     this.lineChartData = 
   [ { data: this.monthlyList, label: 'Monthly' },
   { data: this.cumulativeList, label: 'Cumulative' } ] 
   
  
  }
  getMonthlyUsers(filterBySlider? : number) {
    this.monthlyList = [];
    for (let i = 1; i < 13; i++) {
      if (filterBySlider) {
        this.monthlyList.push(this.userList.filter(user => user.birthday ==  i && user.spend > filterBySlider).length);
      } else {
    this.monthlyList.push(this.userList.filter(user => user.birthday == i).length);
      }

  }// end loop
  console.log("average out of  loop: " + (this.monthlyList));
  this.getCumulativeUsers();
} 

getCumulativeUsers(filterBySlider? : number) {
  this.cumulativeList = [];
 this.cumulativeList = this.monthlyList.map(element => element * 5)
          .map((content, index, array) =>
          {
            
            return array[index] += array[index-1] ? array[index-1] : 0
          })


this.updateChart();
console.log("cumulativeList list" + this.cumulativeList);
} 

}
