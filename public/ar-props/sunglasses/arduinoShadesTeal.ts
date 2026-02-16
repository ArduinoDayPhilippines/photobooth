import { DrawContext } from '@/lib/ar/types';
import { roundRect } from '../utils/shapes';


export function drawArduinoShadesTeal(context: DrawContext) {
    const { ctx, x, y, width, height, rotation, colors } = context;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    
    const frameWidth = width;
    const frameHeight = height;
    const lensWidth = frameWidth * 0.42; 
    const lensHeight = frameHeight * 0.8;
    const bridgeWidth = frameWidth * 0.16;
    const templeWidth = frameWidth * 0.2;

    
    const yOffset = 0;

   
    ctx.fillStyle = colors.primary + '40'; 
    ctx.strokeStyle = colors.secondary; 
    ctx.lineWidth = 4;

    roundRect(ctx, -frameWidth / 2, yOffset - lensHeight / 2, lensWidth, lensHeight, 10);
    ctx.fill();
    ctx.stroke();

    // Draw right lens frame
    roundRect(ctx, frameWidth / 2 - lensWidth, yOffset - lensHeight / 2, lensWidth, lensHeight, 10);
    ctx.fill();
    ctx.stroke();

    // Bridge - Moved to middle (yOffset) as requested
    ctx.beginPath();
    ctx.moveTo(-bridgeWidth / 2, yOffset);
    ctx.quadraticCurveTo(0, yOffset - 5, bridgeWidth / 2, yOffset);
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 4;
    ctx.stroke();

   
    drawCircuitPattern(ctx, -frameWidth / 2 + lensWidth / 2, yOffset, lensWidth * 0.7, lensHeight * 0.5);
    drawCircuitPattern(ctx, frameWidth / 2 - lensWidth / 2, yOffset, lensWidth * 0.7, lensHeight * 0.5);

    ctx.restore();
}

function drawCircuitPattern(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;

    // Vertical lines
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(x - w / 2 + (i * w / 4), y - h / 2);
        ctx.lineTo(x - w / 2 + (i * w / 4), y + h / 2);
        ctx.stroke();
    }

    // Horizontal lines
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x - w / 2, y - h / 2 + (i * h / 3));
        ctx.lineTo(x + w / 2, y - h / 2 + (i * h / 3));
        ctx.stroke();
    }

    // Small circuit nodes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let i = 0; i < 6; i++) {
        const nodeX = x - w / 2 + Math.random() * w;
        const nodeY = y - h / 2 + Math.random() * h;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}
