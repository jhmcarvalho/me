import 'tailwindcss/tailwind.css';
import '@/styles/styles.css';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const ThemeContent = ({ Component, pageProps }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const backgroundImage = resolvedTheme === 'dark' ? '/images/background_dark.jpg' : '/images/background_light.jpg';

  if (!mounted) {
    return (
      <>
        <Component {...pageProps} />
        <style>{`body { background-color: #f7f2f2; }`}</style>
      </>
    );
  }

  return (
    <>
      <Component {...pageProps} />
      <style>
        {`
          body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-repeat: no-repeat;
            transition: background-image 0.5s ease-in-out, filter 0.5s ease-in-out;
          }
        `}
      </style>
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Head>
        <title>Jeff</title>
      </Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-HERRG7L4LP" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HERRG7L4LP');
        `}
      </Script>
      <ThemeContent Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
};

export default App;
