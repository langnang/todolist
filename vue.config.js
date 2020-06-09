module.exports = {
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production'
        ? '/ToDoList/'
        : '/',
    devServer: {
        port: 9501,
        https: true,
    }
}