import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import pool from "@/lib/db";
import { redirect } from "next/dist/server/api-utils";
import { signIn } from "next-auth/react";


export default NextAuth({
	session:{
		strategy:'jwt'
	},
	providers:[
		CredentialsProvider({
			type:"credentials",
			credentials: {
			},
			async authorize(credentials, req){
				const {email, password} = credentials;
				
				const res = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2',[email, password])
				.then(res => res.rows[0])
				.catch(err => err.stack)


				if(email == res.email && password == res.password ) {
					return res;
				}
				else{
					return null;
				}
			}
		})
	],
	pages:{
		signIn: 'auth/signin',
	},
	callbacks:{
		async jwt({token, user}){
			user && (token.user = user)
			return token
		},
		async session({session, token}){
			session.user = token.user;
			return session;
		},
	}
})