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
    const marginL = 40, marginB = 30, marginT = 20, marginR = 10;
    ctx.strokeStyle = '#ddd';
    ctx.beginPath(); ctx.moveTo(marginL, marginT); ctx.lineTo(marginL, h - marginB); ctx.lineTo(w - marginR, h - marginB); ctx.stroke();
    // plot
    const vals = props.data || [];
    const labels = props.labels || vals.map((_, i) => String(i+1));
    const max = Math.max(1, ...vals);
    const color = props.color || '#0046FF';
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
    const left = marginL, bottom = h - marginB, right = w - marginR, top = marginT;
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
    // x-axis labels
    ctx.fillStyle = '#555'; ctx.font = '12px system-ui, sans-serif'; ctx.textAlign = 'center';
    labels.forEach((lab, i) => {
      const x = left + i * step;
      ctx.fillText(lab, x, h - 8);
    });
    // legend
    if (props.title) {
      ctx.fillStyle = '#111'; ctx.font = 'bold 13px system-ui, sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(props.title, left, top - 4);
    }
    ctx.fillStyle = color; ctx.fillRect(right - 100, top - 14, 10, 10);
    ctx.fillStyle = '#333'; ctx.textAlign = 'left'; ctx.fillText('Series', right - 85, top - 5);
  }
});

define("ChartWidget", ChartWidget);
export default ChartWidget;

