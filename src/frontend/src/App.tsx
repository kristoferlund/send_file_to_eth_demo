import Header from "./components/header/Header";
import ReceivedFiles from "./components/ReceivedFiles";
import SendFile from "./components/SendFile";

function App() {
  return (
    <div className="flex flex-col items-center w-full dark">
      <Header />
      <div className="flex flex-col items-center w-full gap-10 p-5 mb-20">
        <SendFile />
        <ReceivedFiles />
      </div>
    </div>
  );
}

export default App;
