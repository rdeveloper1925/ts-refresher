import { useState } from 'react';
import logo from '../../assets/transparent-logo.png';
import * as z from 'zod';
import selfHostedSupabase from './supabase';

const EmlPass = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const [input, setInput] = useState<LoginSchema>({ email: '', password: '' });
    const [session, setSession] = useState({});

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, label: string) => {
        setInput(prev => ({ ...prev, [label]: e.target.value }));
    }

    const handleLogin = () => {
        setErrors([]);
        try {
            const data = LoginSchema.parse(input);
            selfHostedSupabase.auth.signInWithPassword(data).then(res => {
                console.log('preres', res);
                if(res.data && res.data.user){
                    console.log('resSignin', res);
                    selfHostedSupabase.auth.getSession().then(data=>{
                        console.log('session', data);
                    });


                }else{
                    selfHostedSupabase.auth.signUp(data).then(signupRes=>{
                        console.log(signupRes, 'sres');
                    })
                }
            })
        } catch (error) {
            const errorBag = [''];
            if (error instanceof z.ZodError) {
                error.format(issue => {
                    errorBag.push(`${String(issue.path[0])}: ${issue.message}`);
                });
                setErrors(errorBag);
            }else{
                console.error(error);
            }
        }
    }
    return (<main className=" h-screen flex justify-center items-center bg-gradient-to-tl from-green-200 via-emerald-100 to-cyan-200">
        <div className="shadow-[0px_0px_18px_3px_#64bea3] p-5 rounded-sm bg-gray-100 min-w-[400px] max-w-[500px]">
            <div className='flex-col justify-center items-center mb-6'>
                <div className='flex justify-center text-center'><img src={logo} width={150} className='' /></div>
                <h2 className='font-bold text-3xl text-center'>Welcome back!</h2>
            </div>
            {errors.length > 0 ? (
                <div className='p-3 mb-3 bg-red-300 rounded-md'>
                    {errors.map((v,i)=>(<p key={i}>{v}</p>))}
                </div>
            ) : ''}
            <div>
                <div className='login-inputs'>
                    <input type='text' value={input.email} name='email' placeholder='Something that identifies you..' onChange={(e) => changeHandler(e, 'email')} />
                </div>
                <div className='login-inputs'>
                    <input type='password' value={input.password} name='password' placeholder='Something only you know..' onChange={(e) => changeHandler(e, 'password')} />
                </div>
                <div>
                    <button onClick={handleLogin} className='submit cursor-pointer bg-[#64bea3] p-2 rounded-sm w-full text-white font-semibold'>Login</button>
                </div>
            </div>
        </div>

    </main>)
}
export default EmlPass;

const LoginSchema = z.object({
    email: z.email().nonempty(),
    password: z.string().min(8).max(20).nonempty()
});

type LoginSchema = z.infer<typeof LoginSchema>
