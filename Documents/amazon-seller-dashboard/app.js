// Dashboard data
const dashboardData = {
  "kpis": {
    "total_revenue": 193851.13,
    "total_profit": 93950.67,
    "profit_margin": 48.5,
    "total_units": 5917,
    "total_orders": 42,
    "avg_conversion_rate": 43.1,
    "total_sessions": 16439,
    "total_page_views": 22289
  },
  "brand_performance": [
    {
      "brand": "MaxiVision",
      "revenue": 69107.41,
      "profit": 45982.39,
      "margin": 56.62,
      "units": 1220,
      "sessions": 2688,
      "conversion_rate": 45.26,
      "products": 16,
      "page_views": 4028
    },
    {
      "brand": "Advanced Therapeuticals",
      "revenue": 24601.82,
      "profit": 13169.35,
      "margin": 7.12,
      "units": 667,
      "sessions": 2322,
      "conversion_rate": 39.8,
      "products": 11,
      "page_views": 3346
    },
    {
      "brand": "Lunovus",
      "revenue": 98515.0,
      "profit": 34811.5,
      "margin": 42.24,
      "units": 3928,
      "sessions": 11024,
      "conversion_rate": 44.2,
      "products": 16,
      "page_views": 14387
    },
    {
      "brand": "Eyecare Naturals",
      "revenue": 1626.9,
      "profit": -12.57,
      "margin": -0.77,
      "units": 102,
      "sessions": 405,
      "conversion_rate": 25.19,
      "products": 1,
      "page_views": 528
    }
  ],
  "top_products": [
    {
      "Product Title": "Lunovus Premium Eyelid Wipes With Tea Tree and Coconut Oil - Cleansing Wipes for People Itchy Eyes - Individually Wrapped - Box Of 30 Natural Eye Wipes",
      "ASIN": "B06X92BQC4",
      "Brand": "Lunovus",
      "Gross Revenue": 71023.73,
      "Net Profit": 19818.8,
      "Margin %": 27.9,
      "Units Sold": 3242,
      "Unit Session %": 39.94
    },
    {
      "Product Title": "MaxiVision® AREDS 2 Whole Body Formula - AREDS 2 Eye Vitamins w/Lutein and Zeaxanthin - for Macular Support - Eye Supplements for Eye Strain - 120 Capsules Count, 1 Bottle",
      "ASIN": "B00CBY92LG",
      "Brand": "MaxiVision",
      "Gross Revenue": 15819.44,
      "Net Profit": 11437.97,
      "Margin %": 72.3,
      "Units Sold": 344,
      "Unit Session %": 53.25
    },
    {
      "Product Title": "MaxiVision® AREDS 2 Whole Body Formula - AREDS 2 Eye Vitamins w/Lutein and Zeaxanthin - for Macular Support - Eye Supplements for Eye Strain - 360 Capsules Count (360 Capsules 1 Bottle)",
      "ASIN": "B0BMTKZB2Z",
      "Brand": "MaxiVision",
      "Gross Revenue": 13311.93,
      "Net Profit": 10378.69,
      "Margin %": 77.97,
      "Units Sold": 91,
      "Unit Session %": 50.0
    }
  ],
  "attention_products": [
    {
      "Product Title": "Lunovus Eyelid Wipes with Manuka Honey & Dead Sea Salt - Box of 30, Individually Wrapped, Pre-Moistened for Daily Hygiene & Dry Eyes Relief, Makeup & Debris Removal, Adults",
      "ASIN": "B0FK71CVQK",
      "Brand": "Lunovus",
      "Gross Revenue": 2013.29,
      "Net Profit": -1021.49,
      "Margin %": -50.74,
      "Units Sold": 92,
      "Unit Session %": 9.92
    },
    {
      "Product Title": "Visual Advantage Lunovus Eyelid Foam Cleanser with Manuka Honey and Dead Sea Salt – Gentle Daily Cleansing",
      "ASIN": "B0FKHHHWNG",
      "Brand": "Lunovus",
      "Gross Revenue": 676.3,
      "Net Profit": -212.98,
      "Margin %": -31.49,
      "Units Sold": 40,
      "Unit Session %": 20.83
    }
  ],
  "ad_performance": [
    {
      "brand": "Advanced Therapeuticals",
      "ppc_spend": 4654.36,
      "ppc_sales": 5953.97,
      "acos": 113.9,
      "tacos": 31.74,
      "roas": 1.28
    },
    {
      "brand": "Lunovus", 
      "ppc_spend": 29843.46,
      "ppc_sales": 16104.73,
      "acos": 94.77,
      "tacos": 35.83,
      "roas": 0.54
    },
    {
      "brand": "MaxiVision",
      "ppc_spend": 5622.74,
      "ppc_sales": 26582.01,
      "acos": 47.84,
      "tacos": 58.84,
      "roas": 4.73
    }
  ]
};

// Chart color palette
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

function formatPercentage(num) {
  return `${num.toFixed(1)}%`;
}

function truncateText(text, maxLength = 50) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  initializeKPIs();
  initializeTabNavigation();
  initializeCharts();
  initializeTables();
  initializeAlerts();
});

// Initialize KPI values
function initializeKPIs() {
  const kpis = dashboardData.kpis;
  
  document.getElementById('total-revenue').textContent = formatCurrency(kpis.total_revenue);
  document.getElementById('total-profit').textContent = formatCurrency(kpis.total_profit);
  document.getElementById('profit-margin').textContent = formatPercentage(kpis.profit_margin);
  document.getElementById('total-units').textContent = formatNumber(kpis.total_units);
  document.getElementById('conversion-rate').textContent = formatPercentage(kpis.avg_conversion_rate);
  document.getElementById('total-sessions').textContent = formatNumber(kpis.total_sessions);
  document.getElementById('page-views').textContent = formatNumber(kpis.total_page_views);
}

// Initialize tab navigation
function initializeTabNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

// Initialize all charts
function initializeCharts() {
  initializeRevenueProfitChart();
  initializeRevenueDistributionChart();
  initializeUnitsByBrandChart();
  initializeConversionRateChart();
  initializeRevenueMarginScatter();
  initializeTopProductsChart();
  initializeACOSChart();
  initializeROASChart();
}

// Revenue vs Profit Chart
function initializeRevenueProfitChart() {
  const ctx = document.getElementById('revenue-profit-chart').getContext('2d');
  const brands = dashboardData.brand_performance.map(b => b.brand);
  const revenues = dashboardData.brand_performance.map(b => b.revenue);
  const profits = dashboardData.brand_performance.map(b => b.profit);
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: brands,
      datasets: [
        {
          label: 'Revenue',
          data: revenues,
          backgroundColor: chartColors[0],
          borderColor: chartColors[0],
          borderWidth: 1
        },
        {
          label: 'Profit',
          data: profits,
          backgroundColor: chartColors[1],
          borderColor: chartColors[1],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + formatCurrency(context.raw);
            }
          }
        }
      }
    }
  });
}

// Revenue Distribution Chart
function initializeRevenueDistributionChart() {
  const ctx = document.getElementById('revenue-distribution-chart').getContext('2d');
  const brands = dashboardData.brand_performance.map(b => b.brand);
  const revenues = dashboardData.brand_performance.map(b => b.revenue);
  
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: brands,
      datasets: [{
        data: revenues,
        backgroundColor: chartColors.slice(0, brands.length),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const percentage = ((context.raw / revenues.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
              return context.label + ': ' + formatCurrency(context.raw) + ' (' + percentage + '%)';
            }
          }
        }
      }
    }
  });
}

// Units by Brand Chart
function initializeUnitsByBrandChart() {
  const ctx = document.getElementById('units-by-brand-chart').getContext('2d');
  const brands = dashboardData.brand_performance.map(b => b.brand);
  const units = dashboardData.brand_performance.map(b => b.units);
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: brands,
      datasets: [{
        label: 'Units Sold',
        data: units,
        backgroundColor: chartColors[2],
        borderColor: chartColors[2],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatNumber(value);
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Units Sold: ' + formatNumber(context.raw);
            }
          }
        }
      }
    }
  });
}

// Conversion Rate Chart
function initializeConversionRateChart() {
  const ctx = document.getElementById('conversion-rate-chart').getContext('2d');
  const brands = dashboardData.brand_performance.map(b => b.brand);
  const conversionRates = dashboardData.brand_performance.map(b => b.conversion_rate);
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: brands,
      datasets: [{
        label: 'Conversion Rate (%)',
        data: conversionRates,
        backgroundColor: chartColors[3],
        borderColor: chartColors[0],
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 60,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Conversion Rate: ' + context.raw.toFixed(1) + '%';
            }
          }
        }
      }
    }
  });
}

// Revenue vs Margin Scatter Plot
function initializeRevenueMarginScatter() {
  const ctx = document.getElementById('revenue-margin-scatter').getContext('2d');
  const data = dashboardData.top_products.concat(dashboardData.attention_products).map(product => ({
    x: product['Gross Revenue'] || product.revenue,
    y: product['Margin %'] || product.margin,
    label: product['Product Title'] || product.title
  }));
  
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Products',
        data: data,
        backgroundColor: chartColors[4],
        borderColor: chartColors[4],
        borderWidth: 1,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Revenue ($)'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Margin (%)'
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: function(context) {
              return truncateText(context[0].raw.label, 40);
            },
            label: function(context) {
              return [
                'Revenue: ' + formatCurrency(context.raw.x),
                'Margin: ' + context.raw.y.toFixed(1) + '%'
              ];
            }
          }
        }
      }
    }
  });
}

// Top Products Chart
function initializeTopProductsChart() {
  const ctx = document.getElementById('top-products-chart').getContext('2d');
  const products = dashboardData.top_products.slice(0, 5).map(p => truncateText(p['Product Title'], 30));
  const revenues = dashboardData.top_products.slice(0, 5).map(p => p['Gross Revenue']);
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: products,
      datasets: [{
        label: 'Revenue',
        data: revenues,
        backgroundColor: chartColors[5],
        borderColor: chartColors[5],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Revenue: ' + formatCurrency(context.raw);
            }
          }
        }
      }
    }
  });
}

// ACOS Chart
function initializeACOSChart() {
  const ctx = document.getElementById('acos-chart').getContext('2d');
  const brands = dashboardData.ad_performance.map(b => b.brand);
  const acos = dashboardData.ad_performance.map(b => b.acos);
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: brands,
      datasets: [{
        label: 'ACOS (%)',
        data: acos,
        backgroundColor: chartColors[6],
        borderColor: chartColors[6],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'ACOS: ' + context.raw.toFixed(1) + '%';
            }
          }
        }
      }
    }
  });
}

// ROAS Chart
function initializeROASChart() {
  const ctx = document.getElementById('roas-chart').getContext('2d');
  const brands = dashboardData.ad_performance.map(b => b.brand);
  const roas = dashboardData.ad_performance.map(b => b.roas);
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: brands,
      datasets: [{
        label: 'ROAS',
        data: roas,
        backgroundColor: chartColors[7],
        borderColor: chartColors[0],
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toFixed(1) + 'x';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'ROAS: ' + context.raw.toFixed(2) + 'x';
            }
          }
        }
      }
    }
  });
}

// Initialize all tables
function initializeTables() {
  initializeTopProductsTable();
  initializeBrandPerformanceTable();
  initializeAttentionProductsTable();
  initializeAdvertisingTable();
}

// Top Products Table
function initializeTopProductsTable() {
  const tbody = document.querySelector('#top-products-table tbody');
  dashboardData.top_products.forEach(product => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td><div class="product-title" title="${product['Product Title']}">${truncateText(product['Product Title'], 40)}</div></td>
      <td>${product.Brand}</td>
      <td class="currency">${formatCurrency(product['Gross Revenue'])}</td>
      <td class="currency ${product['Net Profit'] >= 0 ? 'status-positive' : 'status-negative'}">${formatCurrency(product['Net Profit'])}</td>
      <td class="percentage ${product['Margin %'] >= 0 ? 'status-positive' : 'status-negative'}">${formatPercentage(product['Margin %'])}</td>
      <td>${formatNumber(product['Units Sold'])}</td>
    `;
  });
}

// Brand Performance Table
function initializeBrandPerformanceTable() {
  const tbody = document.querySelector('#brand-performance-table tbody');
  dashboardData.brand_performance.forEach(brand => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td><strong>${brand.brand}</strong></td>
      <td class="currency">${formatCurrency(brand.revenue)}</td>
      <td class="currency ${brand.profit >= 0 ? 'status-positive' : 'status-negative'}">${formatCurrency(brand.profit)}</td>
      <td class="percentage ${brand.margin >= 0 ? 'status-positive' : 'status-negative'}">${formatPercentage(brand.margin)}</td>
      <td>${formatNumber(brand.units)}</td>
      <td>${formatNumber(brand.sessions)}</td>
      <td class="percentage">${formatPercentage(brand.conversion_rate)}</td>
      <td>${brand.products}</td>
    `;
  });
}

// Attention Products Table
function initializeAttentionProductsTable() {
  const tbody = document.querySelector('#attention-products-table tbody');
  dashboardData.attention_products.forEach(product => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td><div class="product-title" title="${product['Product Title']}">${truncateText(product['Product Title'], 40)}</div></td>
      <td>${product.Brand}</td>
      <td class="currency">${formatCurrency(product['Gross Revenue'])}</td>
      <td class="currency status-negative">${formatCurrency(product['Net Profit'])}</td>
      <td class="percentage status-negative">${formatPercentage(product['Margin %'])}</td>
      <td>${formatNumber(product['Units Sold'])}</td>
      <td class="percentage ${product['Unit Session %'] < 20 ? 'status-warning' : ''}">${formatPercentage(product['Unit Session %'])}</td>
    `;
  });
}

// Advertising Table
function initializeAdvertisingTable() {
  const tbody = document.querySelector('#advertising-table tbody');
  dashboardData.ad_performance.forEach(ad => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td><strong>${ad.brand}</strong></td>
      <td class="currency">${formatCurrency(ad.ppc_spend)}</td>
      <td class="currency">${formatCurrency(ad.ppc_sales)}</td>
      <td class="percentage ${ad.acos > 50 ? 'status-warning' : ''}">${formatPercentage(ad.acos)}</td>
      <td class="percentage">${formatPercentage(ad.tacos)}</td>
      <td class="${ad.roas < 1 ? 'status-warning' : 'status-positive'}">${ad.roas.toFixed(2)}x</td>
    `;
  });
}

// Initialize Performance Alerts
function initializeAlerts() {
  initializeNegativeMarginAlerts();
  initializeLowConversionAlerts();
  initializeHighACOSAlerts();
  initializePerformanceSummary();
}

// Negative Margin Alerts
function initializeNegativeMarginAlerts() {
  const container = document.getElementById('negative-margin-alerts');
  const negativeProducts = dashboardData.attention_products.filter(p => p['Margin %'] < 0);
  
  if (negativeProducts.length === 0) {
    container.innerHTML = '<div class="alert-item info">No products with negative margins found.</div>';
    return;
  }
  
  negativeProducts.forEach(product => {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-item negative';
    alertDiv.innerHTML = `
      <strong>${truncateText(product['Product Title'], 30)}</strong><br>
      Margin: ${formatPercentage(product['Margin %'])} | Loss: ${formatCurrency(Math.abs(product['Net Profit']))}
    `;
    container.appendChild(alertDiv);
  });
}

// Low Conversion Rate Alerts
function initializeLowConversionAlerts() {
  const container = document.getElementById('low-conversion-alerts');
  const lowConversionProducts = dashboardData.attention_products.filter(p => p['Unit Session %'] < 20);
  const lowConversionBrands = dashboardData.brand_performance.filter(b => b.conversion_rate < 20);
  
  if (lowConversionProducts.length === 0 && lowConversionBrands.length === 0) {
    container.innerHTML = '<div class="alert-item info">No low conversion rate issues found.</div>';
    return;
  }
  
  lowConversionProducts.forEach(product => {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-item warning';
    alertDiv.innerHTML = `
      <strong>${truncateText(product['Product Title'], 30)}</strong><br>
      Conversion: ${formatPercentage(product['Unit Session %'])}
    `;
    container.appendChild(alertDiv);
  });
  
  lowConversionBrands.forEach(brand => {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-item warning';
    alertDiv.innerHTML = `
      <strong>${brand.brand} Brand</strong><br>
      Conversion: ${formatPercentage(brand.conversion_rate)}
    `;
    container.appendChild(alertDiv);
  });
}

// High ACOS Alerts
function initializeHighACOSAlerts() {
  const container = document.getElementById('high-acos-alerts');
  const highACOSBrands = dashboardData.ad_performance.filter(ad => ad.acos > 50);
  
  if (highACOSBrands.length === 0) {
    container.innerHTML = '<div class="alert-item info">No high ACOS issues found.</div>';
    return;
  }
  
  highACOSBrands.forEach(ad => {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-item warning';
    alertDiv.innerHTML = `
      <strong>${ad.brand}</strong><br>
      ACOS: ${formatPercentage(ad.acos)} | ROAS: ${ad.roas.toFixed(2)}x
    `;
    container.appendChild(alertDiv);
  });
}

// Performance Summary
function initializePerformanceSummary() {
  const container = document.getElementById('performance-summary');
  const totalProducts = dashboardData.brand_performance.reduce((sum, brand) => sum + brand.products, 0);
  const profitableBrands = dashboardData.brand_performance.filter(b => b.profit > 0).length;
  const negativeProducts = dashboardData.attention_products.length;
  const avgROAS = (dashboardData.ad_performance.reduce((sum, ad) => sum + ad.roas, 0) / dashboardData.ad_performance.length).toFixed(2);
  
  container.innerHTML = `
    <div class="stat-item">
      <span class="stat-label">Total Brands:</span>
      <span class="stat-value">${dashboardData.brand_performance.length}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Profitable Brands:</span>
      <span class="stat-value status-positive">${profitableBrands}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Products Needing Attention:</span>
      <span class="stat-value status-warning">${negativeProducts}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Average ROAS:</span>
      <span class="stat-value ${avgROAS < 1 ? 'status-warning' : 'status-positive'}">${avgROAS}x</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Overall Profit Margin:</span>
      <span class="stat-value status-positive">${formatPercentage(dashboardData.kpis.profit_margin)}</span>
    </div>
  `;
}