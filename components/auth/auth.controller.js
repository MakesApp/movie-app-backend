const CLIENT_URL = process.env.CLIENT_URL;
export const authController = {
	googleLogin: (req, res) => {
		if (req.user) {
			res.status(200).json({
				success: true,
				message: 'successfull',
				user: req.user,
				cookies: req.cookies,
			});
		}
	},
	googleLoginFail: (req, res) => {
		res.status(401).json({
			success: false,
			message: 'failure',
		});
	},
	googleLogout: (req, res) => {
		req.logout();
		res.redirect(CLIENT_URL);
	},
};
