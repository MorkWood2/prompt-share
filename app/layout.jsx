import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/provider';

export const metaData = {
  title: 'prompt-share',
  description: 'Discover & Share AI Prompts ',
};
const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          {' '}
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
