import 'tailwindcss/tailwind.css';
import '@/styles/styles.css';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { useTheme } from 'next-themes';

const App = ({ Component, pageProps }) => {
  const { resolvedTheme } = useTheme();
  const backgroundImage = resolvedTheme === 'dark' ? '/images/background_dark.jpg' : '/images/background_light.jpg';
  console.log('TESTE',resolvedTheme)

  return (
    <ThemeProvider attribute="class">
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
      <Component {...pageProps} />
      {/* Defina a imagem de fundo diretamente no HTML */}
      <style>
        {`
          body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}
      </style>
    </ThemeProvider>
  );
};

export default App;
