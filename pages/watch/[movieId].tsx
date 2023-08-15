import React from "react";
import useMovie from "../../hooks/useMovie";

import { BsArrowLeftCircle } from 'react-icons/bs';

import { useRouter } from "next/router";

const Watch = () => {
    const router = useRouter();
    const { movieId } = router.query;   

    const { data } = useMovie(movieId as string);

    return (
        <div className="h-screen w-screen bg-black">
            <nav className="
                fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-slate-900
                bg-opacity-70
            ">
                <BsArrowLeftCircle
                    size={30} className="text-white mx-4 my-1 cursor-pointer hover:text-neutral-300"
                    onClick={() => {
                        router.push('/')
                    }}
                />
                <p className="text-white text-xl font-bold">
                    <span className="font-light mx-1">
                        Watching:  
                    </span>
                      {data?.title}
                </p>
            </nav>
            <video 
                autoPlay controls
                src={data?.videoUrl} 
                className="h-full w-full"
            />
        </div>
    )
}

export default Watch;