import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '../utils/api';
import { motion } from 'framer-motion';

import '../styles/globals.css';
import BackgroundGradient from '@components/common/backgroundgradient';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: 'easeInOut' }}>
      <BackgroundGradient></BackgroundGradient>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </motion.div>
  );
};

export default api.withTRPC(MyApp);
