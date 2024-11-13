const pjson = require('./package.json');
module.exports = {
    filenameHashing: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://optoculos.vtexcommercestable.com.br',
                secure: true,
                changeOrigin: true
            },
            '/arquivos/ids': {
                target: 'https://optoculos.vtexcommercestable.com.br',
                secure: true,
                changeOrigin: true
            }
        },
    },
    css: {
        extract: {
            filename: `app-oculos-${ pjson.version }.css`,
            chunkFilename: `app-oculos-${ pjson.version }.chunk.css`,
        },
    },
    configureWebpack: {
        output: {
            filename: `app-oculos-${ pjson.version }.js`,
            chunkFilename: `app-oculos-${ pjson.version }.chunk.js`,
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/arquivos/'
        : '/'
};
