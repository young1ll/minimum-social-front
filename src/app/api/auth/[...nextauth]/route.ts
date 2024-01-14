import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth';

/**
 * Auth API Route #2 #8 #9
 */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
