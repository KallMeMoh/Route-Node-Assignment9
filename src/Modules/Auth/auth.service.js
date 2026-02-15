import { hash } from 'bcrypt';
import { UserModel } from '../../DB/Model/User.model';
import { encrypt } from '../../common/utils/security/encrypt';
import { SALT_ROUNDS } from '../../../config/config.service';

export const registerService = async (req, res, next) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser)
      return res.status(409).json({ message: 'Email already exists' });

    const password = await hash(req.body.password, SALT_ROUNDS);
    const phone = encrypt(req.body.phone);

    await UserModel.create({ ...req.body, password, phone });
    return res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.log({ error });
    if (error.name === 'ValidationError')
      return res.status(400).json({ errors: error.errors });

    if (error.code === 11000 || error.name === 'MongoServerError')
      return res.status(409).json({ message: 'Email already exists' });

    next(error);
  }
};
