import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
//https://console.cloud.google.com/

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    session.user.id = sessionUser._id.toString();
    return session;
  },
  async signIn({ profile }) {
    try {
      //serverless -> Lambda -> dynamodb
      await connectToDB();

      //check if user is already exists
      const userExist = await User.findOne({
        email: profile.email,
      });

      //if not create a new user
      if (!userExist) {
        await User.create({
          email: profile.email,
          userName: profile.name.replace(' ', '').toLowerCase(),
          image: profile.picture,
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
