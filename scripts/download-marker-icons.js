const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = [
	{
		url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
		filename: 'marker-icon.png',
	},
	{
		url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
		filename: 'marker-icon-2x.png',
	},
	{
		url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
		filename: 'marker-shadow.png',
	},
];

const downloadFile = (url, filename) => {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(path.join('public', 'images', filename));
		https
			.get(url, (response) => {
				response.pipe(file);
				file.on('finish', () => {
					file.close();
					console.log(`Downloaded ${filename}`);
					resolve();
				});
			})
			.on('error', (err) => {
				fs.unlink(filename);
				reject(err);
			});
	});
};

const downloadAll = async () => {
	try {
		for (const icon of icons) {
			await downloadFile(icon.url, icon.filename);
		}
		console.log('All marker icons downloaded successfully!');
	} catch (error) {
		console.error('Error downloading marker icons:', error);
	}
};

downloadAll();
