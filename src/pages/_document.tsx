import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='Program Merdeka Belajar Kampus Merdeka atau (MBKM) adalah program yang dirancang oleh Menteri Pendidikan dan kebudayaan untuk pembekalan mahasiswa dalam memasuki dunia kerja setelah lulus kuliah. program ini akan memberikan SKS 1 semester sebagai pengganti sks dari mata kuliah yang tidak dia tempuh dalam masa waktu MBKM.'
        />
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Poppins:wght@400;600;700&family=Roboto:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
