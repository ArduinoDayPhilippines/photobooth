import { DrawContext } from '@/lib/ar/types';


export function drawBinaryRain(context: DrawContext) {
    const { ctx, x, y, width, height } = context;
    const time = Date.now();

    ctx.save();

    
    const fullWidth = ctx.canvas.width;
    const fullHeight = ctx.canvas.height;

    
    const faceCenterX = x;
    const faceCenterY = y + height * 0.3; 
    const excludeRadiusX = width * 1.0;   
    const excludeRadiusY = height * 2.0;  

    
    const columnWidth = 22;
    const columns = Math.ceil(fullWidth / columnWidth) + 2;

    
    const chars = ['0', '1'];

    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.textAlign = 'center';

    for (let col = 0; col < columns; col++) {
        const colX = col * columnWidth;

        
        const speed = 0.06 + (col % 5) * 0.02;
        const offset = col * 137;

        
        const charCount = Math.ceil(fullHeight / 18) + 5;

        for (let i = 0; i < charCount; i++) {
            
            const baseY = ((time * speed + offset + i * 18) % (fullHeight + 200)) - 100;

            
            const dx = (colX - faceCenterX) / excludeRadiusX;
            const dy = (baseY - faceCenterY) / excludeRadiusY;
            const isInsideExclusion = (dx * dx + dy * dy) <= 1;

            
            if (isInsideExclusion) {
                continue;
            }

            
            const charIndex = Math.floor((time / 70 + col + i) % 2);
            const char = chars[charIndex];

            
            const trailPosition = i / charCount;
            const fade = Math.max(0, 1 - trailPosition * 1.2);

            
            const brightness = 150 + fade * 105;
            ctx.fillStyle = `rgba(0, ${brightness}, 50, ${0.7 + fade * 0.3})`;

            
            if (i < 3) {
                ctx.shadowColor = '#00FF00';
                ctx.shadowBlur = 15;
            } else {
                ctx.shadowBlur = 0;
            }

            ctx.fillText(char, colX, baseY);
        }
    }

    ctx.restore();
}
