import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Fejlettebb user agent detektálás
const detectDevice = (userAgent) => {
    const ua = userAgent.toLowerCase();
    return {
        isMobile: /mobile|android|iphone|ipad|ipod|blackberry|windows phone/i.test(ua),
        isTablet: /tablet|ipad/i.test(ua) && !/mobile/i.test(ua),
        isDesktop: !/mobile|android|iphone|ipad|ipod|blackberry|windows phone|tablet/i.test(ua),
        browser: ua.includes('chrome') ? 'chrome' :
            ua.includes('firefox') ? 'firefox' :
                ua.includes('safari') ? 'safari' : 'other',
        platform: ua.includes('windows') ? 'windows' :
            ua.includes('mac') ? 'mac' :
                ua.includes('linux') ? 'linux' :
                    ua.includes('android') ? 'android' :
                        ua.includes('ios') ? 'ios' : 'other'
    };
};

app.use((req, res, next) => {
    const ua = req.headers['user-agent'] || '';
    req.device = detectDevice(ua);
    next();
});

// Middleware-k
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    etag: true,
    lastModified: true
}));

// Routes
app.get('/device-info', (req, res) => {
    res.json({
        ...req.device,
        userAgent: req.headers['user-agent']
    });
});

app.get('/mobile-config', (req, res) => {
    if (req.device.isMobile) {
        res.json({
            optimizedFor: 'mobile',
            features: ['touch-optimized', 'reduced-data', 'fast-loading']
        });
    } else {
        res.json({ optimizedFor: 'desktop' });
    }
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Device Detection Test</h1>
        <p>Is Mobile: ${req.device.isMobile}</p>
        <p>Is Tablet: ${req.device.isTablet}</p>
        <p>Platform: ${req.device.platform}</p>
        <a href="/device-info">Device Info JSON</a>
    `);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});