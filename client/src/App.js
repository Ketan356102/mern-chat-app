import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <div className="App">
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;