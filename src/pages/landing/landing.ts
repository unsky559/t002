import html from './index.html';
import './index.scss';
import './responsive.scss';
import { Chart, LineElement, LineController, ScriptableContext, ChartType } from 'chart.js';
import { registerables } from 'chart.js';
import TabHandler from '../../handlers/tabHandler';
import SwitchHandler from '../../handlers/switchHandler';
Chart.register(...registerables);


window.onload = () => {
  document.body.innerHTML = html;
  buildGraph();
  buildDiagram();

  const salesTab = new TabHandler(document.getElementById('tesla-token-tab-component'));
  salesTab.autoConfigureListeners();

  const roadMapTab = new TabHandler(document.getElementById('roadmap-tab-component'));
  roadMapTab.autoConfigureListeners();

  const teamTab = new TabHandler(document.getElementById('team-tab-component'));
  teamTab.autoConfigureListeners();
  
  const mainImageSwitch = new SwitchHandler(document.querySelector('.banner .banner_image'));
  
  const themeSwitherSwitch = new SwitchHandler(document.querySelector("#theme-switcher"));
  const dollarFeatSwitch = new SwitchHandler(document.querySelector('#dollar-feat'));  
  const bitcoinFeatSwitch = new SwitchHandler(document.querySelector('#bitcoin-feat'));
  const discountVoucherFeatSwitch = new SwitchHandler(document.querySelector('#discount-voucher-feat'));  
  const laptopFeatSwitch = new SwitchHandler(document.querySelector('#laptop-feat'));
  
  const themeSwitherBtn = document.querySelector("#theme-switcher");
  themeSwitherBtn.addEventListener('click', () => {
    document.body.classList.toggle('black');
    mainImageSwitch.siwitch();
    themeSwitherSwitch.siwitch();
    dollarFeatSwitch.siwitch();
    bitcoinFeatSwitch.siwitch();
    discountVoucherFeatSwitch.siwitch();
    laptopFeatSwitch.siwitch();

  });

}



function buildDiagram(){
  const diagram = <HTMLCanvasElement>document.getElementById("diagram");
  const diagramCtx = diagram.getContext('2d');

  const getGrad = (ctx: { createLinearGradient: (arg0: any, arg1: number, arg2: any, arg3: number) => any; }, chartArea: { top: any; bottom: any; }) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgb(133,74,207)');
    gradient.addColorStop(1, 'rgb(206,92,180)');
    return gradient;
  }

  const data = {
    labels: ['Sale (costomer tokens)', 'Stake tokens', 'Marketing, Legal, finance, sales, IT', 'Company', 'Affiliate', 'Air drop', 'Advisors'],
    datasets: [
      {
        label: 'Sale (costomer tokens)',
        data: [65,10,10,10,5,3],
        backgroundColor: function(context: ScriptableContext<any>) {
            switch(context.dataIndex) {
              case 0:
                const chart = context.chart;
                const {ctx, chartArea} = chart;
                if ( !chartArea ) {
                  return null
                }
                return getGrad(ctx, chartArea)
              break;
              case 1:
                return 'rgba(134, 94, 234, 1)'
              break;
              case 2:
                return 'rgba(134, 94, 234, 0.5)'
              break;
              case 3:
                return 'rgba(134, 94, 234, 0.65)'
              break;
              case 4:
                return 'rgba(134, 94, 234, 0.20)'
              break;
              case 5:
                return 'rgba(134, 94, 234, 0.10)'
              break;
              case 6:
                return 'rgba(134, 94, 234, 0.30)'
              break;
            }
          }
      }
    ]
  }

  const graph = new Chart( diagramCtx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      borderColor: 'rgba(255,255,255,1)',
      plugins: {
        title: {
          display: false
        },
        legend: {
          display: false
        }
      }
    }
  }) as any;
}

function buildGraph(){
  const courseGraph = <HTMLCanvasElement>document.getElementById("courseGraph");
  const courseGraphCtx = courseGraph.getContext('2d');

  const datapoints = [0.40, 0.11, 0.16, 0.28, 0.20, 0.30, 0.43, 0.50, 0.20];

  const getGrad = (ctx: { createLinearGradient: (arg0: any, arg1: number, arg2: any, arg3: number) => any; }, chartArea: { left: any; right: any; }) => {
    const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    gradient.addColorStop(0, 'rgb(133,74,207)');
    gradient.addColorStop(1, 'rgb(206,92,180)');
    return gradient;
  }

  const data = {
    labels: datapoints,
    datasets: [{
      label: 'Red',
      data: datapoints,
      borderWidth: 2,
      tension: 0.1,
      borderColor: function(context: { chart: any; }) {
        const chart = context.chart;
        const {ctx, chartArea} = chart;
        if ( !chartArea ) {
          return null
        }
        return getGrad(ctx, chartArea)
      },
    }]
  }

  const graph = new Chart(courseGraphCtx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: { enabled: false },
        },
        elements: {
          point: { radius: 0 },
        },
        scales: {
          y: {
            ticks: { 
              display: false,
              autoSkip: false
            },
            grid: {
              display: false,
            },
            beginAtZero: true
          },
          x: {
            display: true,
            grid: {
              borderWidth: 0,
              lineWidth: 1,
            },
            ticks: {
              display: false,
            }
          }
        }
    }
  });
}