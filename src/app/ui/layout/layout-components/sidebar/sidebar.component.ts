import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MenuItem, MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menu:{mainMenuItems:MenuItem[],bottomMenuItems:MenuItem[]} = {bottomMenuItems:null,mainMenuItems:null}
  menuIconButton:Element
  sidebar:Element
  mainContent : HTMLElement
  isOpenedSource:BehaviorSubject<boolean> = new BehaviorSubject(true)
  constructor(public route:Router,private menuService:MenuService,private bpObserver:BreakpointObserver){
  }
  async ngOnInit(): Promise<void> {
    this.getSidebarElements();
    this.getMenuItems();
    this.setMainContentWidth();
  }
  ngAfterViewInit(){
    this.setMenuForMobile();
  }
  getSidebarElements(){
    this.menuIconButton = document.querySelector("[data-menu-icon-btn]")
    this.sidebar = document.querySelector("[data-sidebar]")
    this.mainContent = document.querySelector(".main-content")
  }
  mouseenter() {
    if(!this.isOpenedSource.value && !this.sidebar.classList.contains("open")){
      this.mainContent.style.maxWidth = "calc(100% - 300px)"
      this.sidebar.classList.add("open")
    }
  }

  mouseleave() {
    if(!this.isOpenedSource.value && this.sidebar.classList.contains("open")){
      this.mainContent.style.maxWidth = "calc(100% - 75px)"
      this.sidebar.classList.remove("open")
    }
  }
  getMenuItems(){
    this.menu = this.menuService.getMenuItems()
    this.menuIconButton.addEventListener("click", () => {
      this.sidebar.classList.toggle("open")
      this.isOpenedSource.next(!this.isOpenedSource.value)

    })
    
  }
  setMenuForMobile(){
    this.bpObserver
    .observe(['(max-width: 1200px)'])
    .pipe(delay(1))
    .subscribe((res) => {
      if (res.matches) {
        this.sidebar.classList.remove("open")
        this.isOpenedSource.next(false)
        if(window.innerWidth>768)
          this.mainContent.style.maxWidth = "calc(100% - 75px)"
        else{
          this.mainContent.style.maxWidth = "100%"
        }

      } else {
        this.sidebar.classList.add("open")
        this.isOpenedSource.next(true)
        if(window.innerWidth > 768)
           this.mainContent.style.maxWidth = "calc(100% - 300px)"
        else{
          this.mainContent.style.maxWidth = "100%"

        }
      }
    });
  }
  setMainContentWidth(){
    this.isOpenedSource.subscribe(val=>{
      if(window.innerWidth > 768){
        if(val){
          this.mainContent.style.maxWidth = "calc(100% - 300px)"
        }
        else{
          this.mainContent.style.maxWidth = "calc(100% - 75px)"
        }
      }

    })
    this.bpObserver
    .observe(['(max-width: 768px)'])
    .pipe(delay(1))
    .subscribe((res) => {
      if (res.matches) {
        this.mainContent.style.maxWidth = "100%"
      }
      else{
        this.mainContent.style.maxWidth = "calc(100% - 75px)"
      }
    });
  }
}
