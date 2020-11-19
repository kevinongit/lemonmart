import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';
import { InventoryComponent } from './inventory.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component'
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    InventoryHomeComponent,
    InventoryComponent,
    StockEntryComponent,
    ProductsComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InventoryRoutingModule,
  ],
})
export class InventoryModule { }
