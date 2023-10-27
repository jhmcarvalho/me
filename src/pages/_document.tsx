import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
	return (
		<Html className="">
			<Head>
				<title>Jeff</title>
				<link rel="icon" type="image/png" href="https://anahoward.me/images/eyesemoji.png" />
				<meta name="title" content="Jeff" />
				{/* facebook  / open graph */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.anahoward.me"></meta>
				<meta property="og:title" content="Jeff" />
				<meta property="og:description" content="" />

				{/* <!-- Google tag (gtag.js) --> */}
				<Script
       				 src="https://www.googletagmanager.com/gtag/js?id=G-HERRG7L4LP"
        				strategy="afterInteractive"
      			/>
      			<Script id="google-analytics" strategy="afterInteractive">
				{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){window.dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-HERRG7L4LP');
				`}
			</Script>
			</Head>
			<body className="bg-[#f7f2f2] dark:bg-gray-800">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
