// controllers/authController.js

const bcrypt = require('bcrypt');
const jwttoken = require('jsonwebtoken');
const UserModel = require('../Models/user');
const validateUserData = require('../utilities/validation');


const JWT_SECRET = process.env.JWT_SECRET;

const login = async (request,response) => {
        const{ email, password } = request.body;
    
        try{
            
            const usermodel = await UserModel.findOne({email});
            
    
            if(!usermodel){
                return response.status(400).json({ message: "user Not found"});
            }
    
            const bcryptpass =  bcrypt.compare(password, usermodel.password);
    
            if(!bcryptpass){
                return response.status(400).json({ message : "Invalid Password"});
            }
    
            const token = jwttoken.sign({userId : usermodel._id}, JWT_SECRET, { expiresIn : '1h'});

            const formattedToken = `Bearer ${token}`;
    
            return response.json({message :"Login Successfull", token: formattedToken });
    
        }
        catch(error){
            return response.status(500).json({ error: error.message });
        }
    };


const register = async (request, response) => {
    const { email, password, name, country, state, phonenumber, address } = request.body;


    const { isValid, errors } = validateUserData({ email, password, name, country, state, phonenumber, address });
  if (!isValid) {
    return response.status(400).json({ errors });
  }

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return response.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = await UserModel.create({ ...request.body, password: hashedPassword });

        // Generate JWT token
        const token = jwttoken.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        return response.json({ message: "Registration successful"});
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

module.exports = { login, register };
