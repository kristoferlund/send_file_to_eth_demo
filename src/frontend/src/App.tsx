import Header from "./components/header/Header";
import GitHubIcon from "./components/GitHubIcon";
import ReceivedFiles from "./components/ReceivedFiles";
import SendFile from "./components/SendFile";

function App() {
  return (
    <div className="flex flex-col items-center w-full">
      <Header />
      <div className="flex flex-col items-center w-full gap-10 p-5">
        <div className="h-5 md:h-28" />
        <ReceivedFiles />
        <SendFile />
        <GitHubIcon />
      </div>
    </div>
  );
}

export default App;
