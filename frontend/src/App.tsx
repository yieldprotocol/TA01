import React, {useContext} from 'react';
import './App.css';
import { Symfoni, SignerContext, TokenContext} from "./hardhat/SymfoniContext";
import { Greeter } from './components/Greeter';
import { BorrowFromVic } from './components/BorrowFromVic';
import { VicsClaim } from './components/VicsClaim';


function App() {

  /* HINT: this is how to bring in the signerContext */
  const [ signer ] = useContext(SignerContext)
  
  return (
    <div className="App" >
      <header className="App-header">
        <Symfoni autoInit={true} >


          <div style={{width:'75%'}}>

          <div >
            <p style={{fontSize:'32px'}}> 
              Yield : UI Technical Assessment
            </p>
          </div>

          <div className='section'>
            <p>
            Briefing:
            </p>
            <p>
              This assessment requires you to create <a style={{color:'white'}} href='https://reactjs.org/' target='_blank' >React</a> elements that interact with the <a style={{color:'white'}} href='https://ethereum.org/en/' target='_blank' >Ethereum</a> blockchain. We know that some of this may be new to you, and there are things here that you may not currently understand very well. That's ok. Part of the purpose of this technical assessment is to see how well you use <em>us</em> as a resource to help you get work done by asking us questions.
              Once complete, this single page app should connect with a local blockchain implementation, receive and send ETH, and interact with a predeployed <a style={{color:'white'}} href='https://eips.ethereum.org/EIPS/eip-20' target='_blank' >ERC20</a> contract, TST.
            </p>                    
            <p style={{fontSize:'14px'}}>
              A <a style={{color:'white'}} href='https://hardhat.org/' target='_blank' >Hardhat</a> implementation is 'pre-setup'. Run it in the background with with:  <code> npx hardhat node --watch </code>.           
            </p>
            <p style={{fontSize:'14px'}}>
              Also, make sure you have <a style={{color:'white'}} href='https://metamask.io/' target='_blank' >Metamask</a> installed in your browser. 
            </p>

            <div className='section'>
              <BorrowFromVic />
            </div>
             
            <p style={{fontSize:'14px'}}>
              If all is running fine at this point, the above button will short-circuit the system and credit the connected metamask account with <strong>1.5ETH</strong>. This should help you get going with the rest of the tasks.                
            </p>
            <p style={{fontSize:'14px'}}>
              HINT: Make sure metamask is connected to the 'custom RPC network' with port 31337.
            </p>
          </div>

          <ol>
            <div className='section'> 
              Working with ETH:
              <li> 
                <div >
                  <div >
                    <p > Create a new React component to show the account name and ETH balance of the connected wallet. </p>               
                  </div>
                  <div style={{alignContent:'flex-end', border:'2px solid white'}}> 0 ETH </div>
                </div>
                <p style={{fontSize:'14px'}}> (human readable, and dynamically changing would be nice) </p>           
              </li> 

              <li> 
                <p> 
                   Make this 
                  <button onClick={()=>console.log('Make this button sends eth ' )}> Button </button> 
                  send  <strong>1.25 </strong> Eth  (or a variable amount) from your connected account to another address: <input />. 
                </p> 
                <p style={{fontSize:'14px'}}>(It might be a good idea to pay Vic back?! )</p>

                <p style={{fontSize:'14px'}}>
                 HINT: all the account info/functions you need for these first two tasks are in the <em>signerContext  </em>  
                ( It might also be easier to break each task out into a new component).
                </p>

              </li>

            </div>


            <div className='section'> 
              Working with ERC20 Tokens:

              <li>
                <div> 
                  <p > Get some TST (Test Tokens) </p>
                </div>
                <div>
                  <p style={{fontSize:'14px'}}>
                  <strong>I know a someone who has loads,... 🦈 !  </strong> 
                  </p>
                  <p style={{fontSize:'14px'}}>
                  Vic's account holds a lot of TST. Help yourself to it - she left her key under the mat. 
                  </p> 

                  <input placeholder='amount to steal' /> <button onClick={()=>console.log('make this button steal Vics TST')}> Steal TST!</button>

                  <p style={{fontSize:'14px'}}>
                    HINT: If you need some more help here, have a look at the 'BorrowFromVic' and 'VicsClaim' components ... there are certainly enought hints in those to accomplish the task!!
                  </p> 
                </div>
              </li>

              <li>
                <div> 
                  <p > Showoff your stolen TST token balance: </p>
                </div>
                <div style={{alignContent:'flex-end', border:'2px solid white'}}> 0 TST </div>

                <p style={{fontSize:'14px'}}>
                  HINT: This one should be easy after the last. You should use the 'tokenContext' here ( which has wrapped all the ERC20 functionality ).
                </p>
              </li> 


              <li> 
                <p> 
                  Cover your tracks! Make this <button> button </button> transfer <input /> of the Test token (TST) from your account to another account:  
                  <input/> .
                </p> 
                <p style={{fontSize:'14px'}}>
                  HINT: Use the 'tokenContext' here too!
                </p>

              </li>
                     
              <li> 
                <p> 
                  Approve token transfers out of your account 
                  </p> 

                  <p style={{fontSize:'14px'}}> 
                  <strong>Hey,... VIC IS MAD!!! </strong> She wants some of her TST back. That's fine - it's not worth much anyway. 
                  Give her permission to take as much as she wants from your account
                  ( best we give her access to the highest possible amount:  ethers.constants.MaxUint256 ).
                </p>
                <p style={{fontSize:'14px'}}>
                    HINT: The only help I can give you here is to checkout the ERC20 token spec.
                </p> 

                <VicsClaim />

              </li>
            </div>


            <div className='section'>
              In your comfort zone:

            <p> This app is NOT particularily well made (and the storyline is shoddy). Use whatever tools/packages you feel comfortable with to shuffle things around, tidy things up, or show-off your skills. </p>
            <li> <p> <strong>Optional:</strong> Make this page <strong>nicer to look at</strong> </p></li>
            <li> <p> <strong>Optional:</strong> Make this test <strong> nicer to work with</strong> for the next potential candidate</p></li>
            </div>

          </ol>


          <div className='section'>
          <p>When you feel like you have done, submit a PR. </p>
          <p style={{fontSize:'14px'}}>Thank you very much for taking this assessment. We appreciate your time, and welcome any feedback!</p>
          </div>

          <div className='section'>
          <p style={{fontSize:'14px'}} >Here is an extra example of a contract, for reference purposes:</p> 
            <Greeter></Greeter>
          </div>
          </div>

        </Symfoni>
      </header>
    </div>
  );
}

export default App;
