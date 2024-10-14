
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage';
import { atom, RecoilRoot } from 'recoil';
export const Glogin=atom({
  key:"setlogin",
  default:false

})
export const User=atom({
  key:"User",
  default:''
})
function App() {
  return (
<>
<RecoilRoot>
<Homepage/>
</RecoilRoot>




 


</>


 
 
  
   
  );
}

export default App;
