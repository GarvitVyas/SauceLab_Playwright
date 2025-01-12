import dotenv from 'dotenv';
dotenv.config();

export const config = {
    user1:{
        username:process.env.username1 || '',
        password:process.env.password || ''
    },
    user2:{
        username:process.env.username2 || '',
        password:process.env.password || '',    
    },
    user3:{
        username:process.env.username3 || '',
        password:process.env.password || ''
    },
    user4:{
        username:process.env.username4 || '',
        password:process.env.password || ''
    },

    baseURL : process.env.base
};