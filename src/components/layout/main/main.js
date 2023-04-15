import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Sidebar from "components/layout/sidebar/sidebar.js";
import Amplify from "aws-amplify";
import "./main.css";
import HomePage from "components/pages/Homepage/homepage.js";
import Spectrogramview from "components/Spectrogramview";
// import awsconfig from "components/../aws-exports";
import S3Browser from "components/pages/File_Browser/s3Browser";
// Amplify.configure(awsconfig)

function Main() {
  // const [bucket, setBucket] = useState('los-pollos-hermanos')
  return (
    <main className="main">
      {/* Don't know if we want a sidebar so I'll hide it for now
      <Sidebar/>
      */}

      <div className="block">
        {/*add routes to the components you want here */}
        <Switch>
          <Route exact path="/" component={Spectrogramview} />

          {/* <Route path="/spectrogram" exact
            render={(props) => (<Spectrogramview />)}/>
          <Route
            path="/bucket-trf0-disk3"
            exact
            render={(props) => (
              <S3Browser bucket="trf0-disk3" region="us-east-1" />
            )}
          />
          <Route
            path="/bucket-trf0-disk2"
            exact
            render={(props) => (
              <S3Browser bucket="trf0-disk2" region="us-east-1" />
            )}
          />
          <Route
            path="/bucket-audiot-disk3"
            exact
            render={(props) => (
              <S3Browser bucket="audiot-disk03" region="us-east-2" />
            )}
          /> */}
        </Switch>
      </div>
    </main>
  );
}

export default Main;
