const router = require('express').Router();
const Account = require('./accounts-model');
const md = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
	try {
		const accounts = await Account.getAll();
		res.json(accounts);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', md.checkAccountId, async (req, res, next) => {
	try {
		const account = await Account.getById(req.params.id);
		res.json(account);
	} catch (error) {
		next(error);
	}
});

router.post(
	'/',
	md.checkAccountPayload,
	md.checkAccountNameUnique,
	async (req, res, next) => {
		try {
			const newAccount = await Account.create({
				name: req.body.name.trim(),
				budget: req.body.budget,
			});
			res.status(201).json(newAccount);
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	'/:id',
	md.checkAccountId,
	md.checkAccountPayload,
	md.checkAccountNameUnique,
	async (req, res, next) => {
		try {
			const updated = await Account.updateById(req.params.id, req.body);
			res.json(updated);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
	try {
		const data = await Account.deleteById(req.params.id);
		res.json(data);
	} catch (error) {
		next(error);
	}
});

router.use((err, req, res, next) => {
	// eslint-disable-line
	res.status(err.status || 500).json({
		message: err.message,
	});
});

module.exports = router;
