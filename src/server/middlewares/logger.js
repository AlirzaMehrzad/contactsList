


export default function loggerMidddleware(req, res, next) {
    console.log('Request:', req.method, req.url);
    next()
}