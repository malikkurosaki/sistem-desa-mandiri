// components/NoZoom.js
import Head from 'next/head';

export default function NoZoom() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Head>
  );
}