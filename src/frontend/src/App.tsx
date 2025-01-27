import Header from "./components/header/Header";

function App() {
  return (
    <div className="flex flex-col items-center w-full dark">
      <Header />
      <div className="flex flex-col items-center w-full gap-10 p-5">
        <div className="h-5 md:h-28" />
      </div>
    </div>
  );
}

export default App;

// <ReceivedFiles />
// <SendFile />
// <GitHubIcon />
