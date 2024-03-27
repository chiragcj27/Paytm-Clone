import { useNavigate } from 'react-router-dom'
import tick from '../assets/7efs.gif'
import { Button } from '../components/Button'

export const Transaction = () => {
    const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <div>
                    <img src={tick} alt='successful...' /> 
                </div>
                <div className="font-bold text-2xl pt-6">
                    Transaction Successful
                </div>
                <div className='pt-8'>
                <Button label={"Back"} onClick={()=> {
                    navigate('/dashboard')
                }}/>
                </div>
            </div>
        </div> 
    </div>
}