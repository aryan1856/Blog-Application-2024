const{createProxyMiddleware}=require('http-proxy-middleware');

module.exports = function(root){
    root.use(
        '/api',
        createProxyMiddleware({
             target: 'https://blog-application-2024-backend.onrender.com',
             changeOrigin: true,
             secure: false,
             headers: {
                'Accesss-Control-Allow-Origin': '*',

             }

        })
    );
};