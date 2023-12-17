import Feed from '@components/Feed';
const home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Explore & Exchange
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI Powered Prompts</span>
        <p className='desc text-center'>
          AI Prompt share is a AI prompting tool for modern era to explore,
          create and share creative prompts
        </p>
      </h1>
      <Feed />
    </section>
  );
};

export default home;
