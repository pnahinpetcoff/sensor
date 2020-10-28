const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort('\\\\.\\COM3', { //PUERTO QUE UTILIZA ARDUINO
  baudRate: 9600//VALOR DEL BAUDIO EN ARDUINO
});

const parser = port.pipe(new ReadLine({ delimiter: '\r\n' })); //PROPIEDAD: LECTURA Y LINEA

const socket = io => {
    io.on('connection', client => {
      console.log('New Connection');
  
      // socket event for client subscription
      client.on('subscribeToDateEvent', interval => {
        console.log('Client is subscribing with interval: ', interval);
  
        // emit message to the client side
        setInterval(() => {
          parser.on('data', function (data) {
            let distance = String(data);
            //console.log(distance);
            client.emit('getDisponibilidad',distance);
          });
        }, interval);
      });
    });
  }
  
  module.exports = socket;