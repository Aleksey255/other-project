
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js', // Входной файл вашего приложения
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'), // Директория, откуда будет обслуживаться контент
    // compress: true, // Включить сжатие gzip
    // port: 9000, // Порт, на котором будет запущен сервер
    hot: true, // Включить горячую замену модулей
    static: {
      directory: './dist',
      watch: true
    },
    // proxy: {
    //   '/api': 'http://localhost:3000', // Прокси для API-запросов
    // },
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: ['style-loader', 'css-loader'], // Пример для работы с CSS
  //     },
  //   ],
  // },
};
