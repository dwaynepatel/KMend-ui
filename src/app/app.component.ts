import { Component } from '@angular/core';
import { UserService } from './user.service';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tech-test-ui';

  userList: any[] = [];


   lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
    { data: [185, 172, 178, 175, 177, 175], label: 'Crude oil prices 100' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

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


  constructor(private userService: UserService) {}

  ngOnInit() {

    
    this.userService.getUsers();

    this.userService.getUsers().subscribe(result => {
     const userList = result;
      // console.log(this.userList);

//filter on region
// this.userList = userList.filter(0 -> o.region ==='United States');
this.userList = userList.filter(region => region.region ==='United States');
console.log(this.userList);
    },
    err => {
      console.error('error loading', err);
    }
  );


  } 

}