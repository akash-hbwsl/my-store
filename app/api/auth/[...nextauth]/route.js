import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ✅ export this
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const users = [
          {
            email: "admin@test.com",
            password: "admin123",
            role: "admin",
          },
          {
            email: "user@test.com",
            password: "user123",
            role: "user",
          },
        ];

        const user = users.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password,
        );

        if (!user) return null;

        return {
          id: "1",
          name: user.role === "admin" ? "Admin" : "User",
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
