import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        if (email === "admin@test.com" && password === "admin123") {
          return {
            id: "1",
            name: "Admin",
            email,
            role: "admin",
          };
        }

        if (email && password) {
          return {
            id: "2",
            name: "User",
            email,
            role: "user",
          };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role;
      session.user.name = token.name;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
