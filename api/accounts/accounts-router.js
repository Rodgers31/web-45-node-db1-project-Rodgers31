const router = require('express').Router();
const Account = require('./accounts-model');
const {
	checkAccountId,
	checkAccountPayload,
	checkAccountNameUnique,
} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
	try {
		const data = await Account.getAll();
		res.json(data);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', checkAccountId, (req, res, next) => {});

router.post('/', (req, res, next) => {
	// DO YOUR MAGIC
});

router.put('/:id', checkAccountId, (req, res, next) => {
	// DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, (req, res, next) => {
	// DO YOUR MAGIC
});

router.use((err, req, res, next) => {
	// eslint-disable-line
	res.status(err.status || 500).json({
		message: err.message,
		stack: err.stack,
	});
});

module.exports = router;
