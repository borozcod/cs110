import './App.css';
import PostMessage from './chat/PostMessage'
import Comments from "./comments/Comments";

      

function App() {
  return (
    <div className="App">
      <div className="card container-md mt-4">
        <Comments/>
      </div>
    </div>
  );
}

export default App;
