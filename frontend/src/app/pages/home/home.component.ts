import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GetServiceService} from '../../services/getservice/get-service.service'


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  data: any[] = []

  constructor(private getServiceService: GetServiceService){}
  ngOnInit(): void {
      this.fill()
  }
  fill(){
    this.getServiceService.getData().subscribe(data =>{
      this.data = data
      console.log(this.data)
    })
  }
}
