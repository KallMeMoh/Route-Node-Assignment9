import { encrypt } from '../../common/utils/security/encrypt';
import { UserModel } from '../../DB/Model/User.model';

export const updateUserService = async (req, res, next) => {
  try {
    delete req.body.password;

    if (req.body.email) {
      const existingUser = await UserModel.findOne({
        email: req.body.email,
        _id: { $ne: req.userId },
      });

      if (existingUser)
        return res.status(409).json({ message: 'Email already exists' });
    }

    if (req.body.phone) req.body.phone = encrypt(req.body.phone);

    const user = await UserModel.findByIdAndUpdate(req.userId, req.body, {
      runValidators: true,
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ message: 'User updated' });
  } catch (error) {
    if (error.name === 'ValidationError')
      return res.status(400).json({ errors: error.errors });

    if (error.code === 11000)
      return res.status(409).json({ message: 'Email already exists' });

    next(error);
  }
};
