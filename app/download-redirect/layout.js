import '../[locale]/globals.css';

export const metadata = {
  title: 'Download LadangX',
  description: 'Download the LadangX mobile app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
