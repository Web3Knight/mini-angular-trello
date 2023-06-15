import { Injectable } from '@angular/core';
import { Column } from '../models/schema.model';
import {defaultData} from "../models/schema.model";

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  private _columns: Column[] = [];

  constructor() {
    this._columns = this.getSavedData();
  }

  /**
   * read data from localstorage
   * */
  getSavedData(): Column[] {

    if (this.isFirstUse()) {
      localStorage.setItem("first-flag", "false"); // now, not first time again.
      this.saveToLocalStorage(defaultData);
      return defaultData;
    }

    return this.getDataFromLocalStorage();
  }

  /**
   * save all data to localStorage
   * */
  saveToLocalStorage(data): void {
    localStorage.setItem("saved-data", JSON.stringify(data));
  }

  getDataFromLocalStorage(): Column[]  {
    let data = [];
    try {
      data = JSON.parse(localStorage.getItem("saved-data"));
    } catch (e) {
    }

    return data;
  }

  isFirstUse(): boolean {
    return localStorage.getItem("first-flag") == null;
  }

  getColumns(): Column[] {
    return this._columns;
  }
}
