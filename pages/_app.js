// pages/_app.js
import '../styles/globals.css'; // import your Tailwind CSS

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
