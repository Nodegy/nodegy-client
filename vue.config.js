module.exports = {
    devServer: {
        host: 'localhost',
        port: 8081,
    },
    configureWebpack: {
        devtool: 'source-map',
    },
    runtimeCompiler: true,
    productionSourceMap: false,
    css: {
        sourceMap: process.env.NODE_ENV !== 'production'
    },
};