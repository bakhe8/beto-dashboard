import { define } from "./runtime";
import { ComponentMorph } from "../js/morph";

type Props = {
  labels: string[];
  data: number[];
  color?: string;
  title?: string;
};

const ChartWidget = ComponentMorph.create<Props>("ChartWidget", {
  render: ({ props }) => {
    return `
      <div class="chart">
        ${props.title ? `<div class="chart-title">${props.title}</div>` : ''}
        <canvas width="600" height="240"></canvas>
      </div>
    `;
  },
  afterRender: ({ root, props }) => {
    const canvas = root.querySelector('canvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    // axes
    ctx.strokeStyle = '#ddd';
    ctx.beginPath(); ctx.moveTo(40, 10); ctx.lineTo(40, h-30); ctx.lineTo(w-10, h-30); ctx.stroke();
    // plot
    const vals = props.data || [];
    const labels = props.labels || vals.map((_, i) => String(i+1));
    const max = Math.max(1, ...vals);
    const color = props.color || '#0046FF';
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
    const left = 40, bottom = h-30, right = w-10, top = 20;
    const step = (right - left) / Math.max(1, vals.length - 1);
    vals.forEach((v, i) => {
      const x = left + i * step;
      const y = bottom - (v / max) * (bottom - top);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    // dots
    ctx.fillStyle = color;
    vals.forEach((v, i) => {
      const x = left + i * step;
      const y = bottom - (v / max) * (bottom - top);
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI*2); ctx.fill();
    });
  }
});

define("ChartWidget", ChartWidget);
export default ChartWidget;

