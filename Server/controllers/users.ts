import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt'; 
import UserModel, { IUser } from '../models/user'; 
import jwt from 'jsonwebtoken'
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user: IUser = await UserModel.create({
      email,
      name,
      password: hash,
    });

    console.log('Added successfully...');
    console.log(user);

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error')
  }
};


export const loginUser =async  (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            {
              email: user.email,
              role: user.role,
              name: user.name,
              id:user.id
            },
            'cv-taskmanager',
            { expiresIn: '1d' }
          );

          res.json({Status: 'success',token,role: user.role,email })
          // res.json({ Status: 'success', role: user.role });
        } else {
          res.json('password incorrect');
        }
      });
    } else {
      res.json('No record exists');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const userdetails =async (req: Request, res: Response): Promise<void>=>{
try{
  const {email}=req.body
  const user = await UserModel.findOne({ email: email })
  if(user){
      res.json(user);
    } else {
      res.json({ Status: "nouser" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ Status: "error" });
  }
}