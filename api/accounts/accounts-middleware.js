const db = require('../../data/db-config');
const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
	try {
		const { name, budget } = req.body;
		if (!name || !budget) {
			res.status(400).json({ message: 'name and budget are required' });
		} else if (typeof name != 'string') {
			res.status(400).json({ message: 'name of account must be a string' });
		} else if (name.trim().length < 3 || name.trim().length > 100) {
			res
				.status(400)
				.json({ message: 'name of account must be between 3 and 100' });
		} else if (typeof budget != 'number') {
			res.status(400).json({ message: 'budget of account must be a number' });
		} else if (budget < 0) {
			res
				.status(400)
				.json({ message: 'budget of account is too large or too small' });
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
};

exports.checkAccountNameUnique = async (req, res, next) => {
	try {
		const { name } = req.body;
		const taken = await db('accounts').where('name', name.trim().first());
		if (taken) {
			res.status(400).json({ message: 'that name is taken' });
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
};

exports.checkAccountId = async (req, res, next) => {
	try {
		const { id } = req.params;
		const possibileAccount = await Account.getById(id);
		if (possibileAccount) {
			req.account = possibileAccount;
			next();
		} else {
			next({ message: 'account not found', status: 404 });
		}
	} catch (error) {
		next(error);
	}
};
