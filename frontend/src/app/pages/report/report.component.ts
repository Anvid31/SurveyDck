import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ReportService } from '../../services/reportservice/report.service';
import { jsPDF } from 'jspdf';

Chart.register(...registerables);

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [ReportService],
})
export class ReportComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  form!: FormGroup;
  chart!: Chart;
  reportData: any[] = [];

  constructor(private fb: FormBuilder, private reportService: ReportService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      startDate: [''], // Fecha inicial
      endDate: [''],   // Fecha final
    });
  }

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  // Inicializar el gráfico vacío
  private initializeChart() {
    if (!this.chartCanvas) {
      console.error('El canvas no está disponible.');
      return;
    }

    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [], // Etiquetas iniciales vacías
        datasets: [
          {
            label: 'Encuestas Creadas',
            data: [], // Datos iniciales vacíos
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }

  // Obtener el reporte desde el backend
  getReport() {
    const { startDate, endDate } = this.form.value;

    if (!startDate || !endDate) {
      alert('Por favor selecciona ambas fechas');
      return;
    }

    // Convertir las fechas seleccionadas a formato ISO
    const isoStartDate = new Date(startDate).toISOString();

    // Ajustar el endDate para incluir el final del día
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59, 999); // Final del día
    const isoEndDate = endDateObj.toISOString();

    console.log('Fechas enviadas al backend:', { isoStartDate, isoEndDate });

    this.reportService.getReport(isoStartDate, isoEndDate).subscribe(
      (data: any) => {
        console.log('Reporte obtenido:', data);
        this.reportData = data;
        this.updateChart(); // Actualiza el gráfico con los datos del backend
      },
      (error) => {
        console.error('Error al obtener el reporte:', error);
        alert('Error al obtener el reporte.');
      }
    );
  }

  // Actualizar los datos del gráfico
  private updateChart() {
    if (!this.chart) {
      console.error('El gráfico no está inicializado.');
      return;
    }

    // Mapea las fechas y cantidades al gráfico
    this.chart.data.labels = this.reportData.map((item: any) => item._id.date);
    this.chart.data.datasets[0].data = this.reportData.map((item: any) => item.totalSurveys);
    this.chart.update();
  }

  // Exportar el gráfico como PDF
  exportToPDF() {
    const canvas = this.chartCanvas.nativeElement;
    const pdf = new jsPDF('landscape');
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.text('Reporte de Encuestas', 10, 10);
    pdf.addImage(imgData, 'PNG', 10, 20, 250, 150);
    pdf.save('reporte_encuestas.pdf');
  }
}
