import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import Main from '../main/main.js'


function FullLayout() {
  return (
    <div>
      <Header/>
      <Main />
      <Footer />
    </div>
  );
}

export default FullLayout;
