import _NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string;
      name: string
      email: string
      image: string
    }
  }
  interface User {
    userId: string;
  }
}
