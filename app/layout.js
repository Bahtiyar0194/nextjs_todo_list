import './globals.css'

export const metadata = {
  title: 'To-Do List App',
  description: 'My First To-Do List App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/heywow" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/roboto" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}