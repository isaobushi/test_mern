module.exports = {
	mongoURI:
		'mongodb://' +
		process.env.MONGO_USER_DDA +
		':' +
		process.env.MONGO_PASS_DDA +
		'@10.137.0.158:27017/' +
		process.env.MONGO_DBNAME_DDA_DEV,
	secretOrKey: 'secret',
};
