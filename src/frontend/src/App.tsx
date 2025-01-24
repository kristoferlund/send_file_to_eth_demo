import Header from "./components/header/Header";
import GitHubIcon from "./components/GitHubIcon";
import Transfers from "./components/Transfers";
import TransferForm from "./components/TransferForm";

function App() {
  return (
    <div className="flex flex-col items-center w-full">
      <Header />
      <div className="flex flex-col items-center w-full gap-10 p-5">
        <div className="h-5 md:h-28" />
        <TransferForm />
        <Transfers />
        <GitHubIcon />
      </div>
    </div>
  );
}

export default App;
