const forecastData = [
  { label: "ARIMA", value: 6.07, color: "#e0b600" },
  { label: "SARIMA", value: 21.77, color: "#6f6a65" },
  { label: "SARIMAX", value: 46.0, color: "#2b2b2b" }
];

const forecastMatrixData = [
  { model: "ARIMA", mape: "6.07%", rmse: "128169.01", mae: "103375.53" },
  { model: "SARIMA", mape: "21.77%", rmse: "442938.96", mae: "391201.71" },
  { model: "SARIMAX", mape: "46.00%", rmse: "913735.41", mae: "820072.23" }
];

const forecastTrendData = [
  { label: "2023-02", value: 1741703 },
  { label: "2023-03", value: 1830044 },
  { label: "2023-04", value: 1585015 },
  { label: "2023-05", value: 1766348 },
  { label: "2023-06", value: 1875093 },
  { label: "2023-07", value: 2421792 },
  { label: "2023-08", value: 1816448 },
  { label: "2023-09", value: 2105440 },
  { label: "2023-10", value: 1412741 },
  { label: "2023-11", value: 1872112 },
  { label: "2023-12", value: 1558454 },
  { label: "2024-01", value: 1690837 },
  { label: "2024-02", value: 1418500 },
  { label: "2024-03", value: 1410470 },
  { label: "2024-04", value: 1727850 },
  { label: "2024-05", value: 1640718 },
  { label: "2024-06", value: 2654941 },
  { label: "2024-07", value: 1557486 },
  { label: "2024-08", value: 1758837 },
  { label: "2024-09", value: 1804113 }
];

const demandModelData = [
  { label: "XGBoost", value: 0.1228, max: 0.13, color: "#e0b600", detail: "R2" },
  { label: "Random Forest", value: 0.0717, max: 0.13, color: "#6f6a65", detail: "R2" }
];

const featureData = [
  { name: "price", detail: "Primary demand driver", value: "0.465979" },
  { name: "Month", detail: "Seasonality signal", value: "0.339968" },
  { name: "title_Catering Coordination Service", detail: "Service-specific effect", value: "0.016281" },
  { name: "title_Startup Pitch Event Organization", detail: "Observed title influence", value: "0.010878" },
  { name: "title_Unspecified", detail: "Residual service category effect", value: "0.010552" }
];

const classificationData = [
  { label: "Gradient Boosting", value: 0.66, max: 1, color: "#e0b600", detail: "Accuracy" },
  { label: "Random Forest", value: 0.65, max: 1, color: "#6f6a65", detail: "Accuracy" }
];

const classificationMetricsData = [
  {
    model: "Gradient Boosting",
    accuracy: "0.66",
    precision: "0.55",
    recall: "0.66",
    f1: "0.54"
  },
  {
    model: "Random Forest",
    accuracy: "0.65",
    precision: "0.59",
    recall: "0.65",
    f1: "0.59"
  }
];

function renderForecastChart() {
  const chart = document.getElementById("forecast-chart");
  if (!chart) return;
  const max = Math.max(...forecastData.map((item) => item.value));
  chart.innerHTML = forecastData.map((item) => {
    const width = (item.value / max) * 100;
    return `
      <div class="bar-row">
        <div class="bar-label">${item.label}</div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${width}%; background:${item.color};"></div>
        </div>
        <div class="bar-value">${item.value.toFixed(2)}%</div>
      </div>
    `;
  }).join("");
}

function renderFeatureList() {
  const list = document.getElementById("feature-list");
  if (!list) return;
  const max = Math.max(...featureData.map((item) => Number(item.value)));
  list.innerHTML = featureData.map((item) => {
    const width = (Number(item.value) / max) * 100;
    return `
      <div class="feature-bar-row">
        <div class="feature-bar-label">
          <strong>${item.name}</strong>
          <small>${item.detail}</small>
        </div>
        <div class="feature-bar-track">
          <div class="feature-bar-fill" style="width:${width}%;"></div>
        </div>
        <div class="feature-bar-value">${item.value}</div>
      </div>
    `;
  }).join("");
}

function renderForecastLineChart() {
  const chart = document.getElementById("forecast-line-chart");
  if (!chart) return;

  const width = 760;
  const height = 220;
  const padding = { top: 18, right: 18, bottom: 34, left: 42 };
  const min = Math.min(...forecastTrendData.map((d) => d.value));
  const max = Math.max(...forecastTrendData.map((d) => d.value));
  const xStep = (width - padding.left - padding.right) / (forecastTrendData.length - 1);
  const yScale = (value) => {
    const ratio = (value - min) / (max - min || 1);
    return height - padding.bottom - ratio * (height - padding.top - padding.bottom);
  };
  const points = forecastTrendData.map((d, index) => ({
    x: padding.left + index * xStep,
    y: yScale(d.value),
    label: d.label
  }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const labels = forecastTrendData
    .filter((_, index) => index % 3 === 0 || index === forecastTrendData.length - 1)
    .map((d, index) => {
      const originalIndex = forecastTrendData.findIndex((x) => x.label === d.label && x.value === d.value);
      const x = padding.left + originalIndex * xStep;
      return `<text x="${x}" y="${height - 10}" text-anchor="middle">${d.label.slice(2)}</text>`;
    })
    .join("");

  chart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Observed monthly revenue trend from notebook values">
      <defs>
        <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(224,182,0,0.32)"/>
          <stop offset="100%" stop-color="rgba(224,182,0,0.02)"/>
        </linearGradient>
      </defs>
      <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="rgba(37,37,37,0.14)"/>
      <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="rgba(37,37,37,0.10)"/>
      <polyline fill="none" stroke="#e0b600" stroke-width="4" points="${polyline}" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${points.map((p) => `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#2b2b2b"/>`).join("")}
      ${labels}
    </svg>
  `;
}

function renderHeroForecastChart() {
  const chart = document.getElementById("hero-forecast-chart");
  if (!chart) return;

  const subset = forecastTrendData.slice(-8);
  const width = 320;
  const height = 96;
  const padding = { top: 10, right: 10, bottom: 12, left: 10 };
  const min = Math.min(...subset.map((d) => d.value));
  const max = Math.max(...subset.map((d) => d.value));
  const xStep = (width - padding.left - padding.right) / (subset.length - 1);
  const yScale = (value) => {
    const ratio = (value - min) / (max - min || 1);
    return height - padding.bottom - ratio * (height - padding.top - padding.bottom);
  };
  const points = subset.map((d, index) => ({
    x: padding.left + index * xStep,
    y: yScale(d.value)
  }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  chart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Compact forecasting trend snapshot">
      <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="rgba(37,37,37,0.12)"/>
      <polyline fill="none" stroke="#e0b600" stroke-width="4" points="${polyline}" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${points.map((p, index) => `<circle cx="${p.x}" cy="${p.y}" r="${index === points.length - 1 ? 4 : 3}" fill="${index === points.length - 1 ? '#2b2b2b' : '#e0b600'}"/>`).join("")}
    </svg>
  `;
}

function renderForecastMatrix() {
  const matrix = document.getElementById("forecast-matrix");
  if (!matrix) return;

  const header = `
    <div class="matrix-row matrix-head">
      <div>Model</div>
      <div>MAPE</div>
      <div>RMSE</div>
      <div>MAE</div>
    </div>
  `;

  const rows = forecastMatrixData.map((item) => `
    <div class="matrix-row">
      <div class="matrix-label">
        <strong>${item.model}</strong>
        <small>Notebook result</small>
      </div>
      <div class="matrix-cell"><strong>${item.mape}</strong></div>
      <div class="matrix-cell"><strong>${item.rmse}</strong></div>
      <div class="matrix-cell"><strong>${item.mae}</strong></div>
    </div>
  `).join("");

  matrix.innerHTML = header + rows;
}

function renderClassificationMetrics() {
  const matrix = document.getElementById("classification-metrics");
  if (!matrix) return;

  const header = `
    <div class="matrix-row matrix-head matrix-head-light">
      <div>Model</div>
      <div>Accuracy</div>
      <div>Precision</div>
      <div>Recall</div>
      <div>F1-score</div>
    </div>
  `;

  const rows = classificationMetricsData.map((item) => `
    <div class="matrix-row matrix-row-light">
      <div class="matrix-label matrix-label-light">
        <strong>${item.model}</strong>
        <small>Notebook classification report</small>
      </div>
      <div class="matrix-cell matrix-cell-light"><strong>${item.accuracy}</strong></div>
      <div class="matrix-cell matrix-cell-light"><strong>${item.precision}</strong></div>
      <div class="matrix-cell matrix-cell-light"><strong>${item.recall}</strong></div>
      <div class="matrix-cell matrix-cell-light"><strong>${item.f1}</strong></div>
      </div>
    `).join("");

  matrix.innerHTML = header + rows;
}

function renderDemandChart() {
  const chart = document.getElementById("demand-chart");
  if (!chart) return;

  chart.innerHTML = demandModelData.map((item) => {
    const width = (item.value / item.max) * 100;
    return `
      <div class="split-row">
        <div class="split-label">
          <strong>${item.label}</strong>
          <small>${item.detail}</small>
        </div>
        <div class="split-track">
          <div class="split-fill" style="width:${width}%; background:${item.color};"></div>
        </div>
        <div class="split-value">${item.value.toFixed(4)}</div>
      </div>
    `;
  }).join("");
}

function renderClassificationChart() {
  const chart = document.getElementById("classification-chart");
  if (!chart) return;

  chart.innerHTML = classificationData.map((item) => {
    const width = (item.value / item.max) * 100;
    return `
      <div class="split-row">
        <div class="split-label">
          <strong>${item.label}</strong>
          <small>${item.detail}</small>
        </div>
        <div class="split-track">
          <div class="split-fill" style="width:${width}%; background:${item.color};"></div>
        </div>
        <div class="split-value">${item.value.toFixed(2)}</div>
      </div>
    `;
  }).join("");
}

function setupTabs() {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tabTarget;
      tabs.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });
      panels.forEach((panel) => {
        const isTarget = panel.id === targetId;
        panel.classList.toggle("is-active", isTarget);
        panel.hidden = !isTarget;
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
    });
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".section, .hero-copy, .hero-panel");
  items.forEach((item) => item.classList.add("reveal"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  items.forEach((item) => observer.observe(item));
}

function setupDepth() {
  const targets = document.querySelectorAll(".hero-panel, .hero-copy, .viz-card-elevated");
  targets.forEach((target) => {
    target.addEventListener("pointermove", (event) => {
      if (window.innerWidth < 900) return;
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 5;
      const rotateX = (0.5 - y) * 4;
      target.style.transform = `translateZ(24px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    target.addEventListener("pointerleave", () => {
      target.style.transform = "";
    });
  });
}

renderForecastChart();
renderForecastLineChart();
renderHeroForecastChart();
renderFeatureList();
renderForecastMatrix();
renderDemandChart();
renderClassificationChart();
renderClassificationMetrics();
setupTabs();
setupReveal();
setupDepth();
