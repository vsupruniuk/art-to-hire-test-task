import 'dotenv/config';
import { Server } from 'socket.io';
import { app } from './app';
import * as http from 'http';

const port = process.env.PORT || 3000;

const server = http.createServer(app);
export const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET'],
	},
});

io.on('connection', () => {
	console.log('A new user connected');
});

server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
