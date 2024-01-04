import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metaData = {
  title: 'prompt-share',
  description: 'Discover & Share AI Prompts ',
};
const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <link rel='shortcut icon' href='#'></link>
      </head>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
