import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'

interface CheckIn {
  name: string
  type: string
  appointmentId: string
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent {
  dataSource: CheckIn[] = 
    { name: 'Giridhar', type: 'Outbound', appointmentId: 'AP-12341' },
    { name: 'Jeeva', type: 'Outbound', appointmentId: 'AP-12342' },
    { name: 'Pavan Kumar', type: 'Inbound', appointmentId: 'AP-12344' },
  ]

  displayedColumns: string[] = ['avatar', 'name', 'type', 'appointmentId']
  displayedDataSource: CheckIn[] = []
  totalRowCount: number = this.dataSource.length
  showAllRows = false

  constructor() {
    this.updateDisplayedRows()
  }

  toggleViewAll() {
    this.showAllRows = !this.showAllRows
    this.updateDisplayedRows()
  }

  updateDisplayedRows() {
    if (this.showAllRows) {
      this.displayedDataSource = this.dataSource
    } else {
      this.displayedDataSource = this.dataSource.slice(0, 5)
    }
  }
}
