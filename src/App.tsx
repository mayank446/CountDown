
import Controls from "./components/Controls"
import Timer from "./components/Timer"
import { RecoilRoot } from "recoil";

function App() {


  return (
    <RecoilRoot>
      <Timer />
      <Controls />
    </RecoilRoot>
  )
}

export default App
