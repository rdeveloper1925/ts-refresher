import { Atom, Github, GoalIcon, MailPlusIcon } from 'lucide-react';
import logo from '../assets/transparent-logo.png';
import { useEffect, useState } from 'react';
import { createClient, type Provider, type Session } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_CLOUD_SUPABASE_URL,
    import.meta.env.VITE_CLOUD_SUPABSE_SECRET,
);

const Login = () => {
    //const [toggleSupabase, setToggleSupabase] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    //const [userInfo, setUserInfo] = useState({ email: '', password: '' });

    

    const handleLogin = (oauthProvider: Provider) => {
        supabase.auth.signInWithOAuth({
            provider: oauthProvider, options: {
                redirectTo: import.meta.env.VITE_AUTH_REDIR
            }
        }).then(res => {
            console.log('res', res);
        });

    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('session:', session);
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_, session) => {
            console.log('session', session);
            setSession(session);
        })

        return () => subscription.unsubscribe();
    }, []);

    const info = () => {

        return (
            <div>
                <ul>
                    <li>User: {session?.user.user_metadata.name}</li>
                    <li>Email: {session?.user.user_metadata.email}</li>
                </ul>
                <img src={session?.user.user_metadata.picture} />
                <button className='cursor-pointer bg-[#64bea3] p-2 rounded-sm w-full text-white font-semibold' onClick={handleSignout}>Sign Out</button>
            </div>
        )
    }

    const handleSignout = () => {
        supabase.auth.signOut();
    }

    return (
        <main className=" h-screen flex justify-center items-center bg-gradient-to-tl from-green-200 via-emerald-100 to-cyan-200">
            <div className="shadow-[0px_0px_18px_3px_#64bea3] p-5 rounded-sm bg-gray-100 min-w-[400px] max-w-[500px]">
                <div className='flex-col justify-center items-center mb-6'>
                    <div className='flex justify-center text-center'><img src={logo} width={150} className='' /></div>
                    <h2 className='font-bold text-3xl text-center'>Welcome back!</h2>
                </div>
                <div>
                    {/* <div className='login-inputs'>
                        <input type='text' name='email' placeholder='Something that identifies you..' onChange={changeHandler} />
                    </div>
                    <div className='login-inputs'>
                        <input type='password' name='password' placeholder='Something only you know..' onChange={changeHandler} />
                    </div>
                    <div>
                        <button onClick={handleLogin} className='submit cursor-pointer bg-[#64bea3] p-2 rounded-sm w-full text-white font-semibold'>Login</button>
                    </div> */}
                    <hr className='my-3 h-[3px] bg-gray-500' />
                    <div className='oauth-section'>
                        <div className='oauth-btns' onClick={()=>handleLogin('github')}>
                            <Github />
                        </div>
                        <div className='oauth-btns'>
                            <MailPlusIcon onClick={()=>handleLogin('google')}/>
                        </div>
                        <div className='oauth-btns'>
                            <GoalIcon />
                        </div>
                        <div className='oauth-btns'>
                            <Atom />
                        </div>
                    </div>
                    {session ? info() : "no user info"}
                </div>
            </div>

        </main>
    )
}

export default Login;