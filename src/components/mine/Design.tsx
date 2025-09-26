import type { GridItems, Widget } from "@/lib/types";
import { ArrowRight, Book, Grid, Headphones, Home, Newspaper, PartyPopper, PenBox, Podcast, SpeechIcon, Star, StarOffIcon, User } from "lucide-react"
import type { JSX } from "react";
import type React from "react";

const Design = () => {
    const widgets: Array<Widget> = [{
        aspect: "Speaking",
        completion: 80,
        text: "Excellent!"
    }, {
        aspect: "Comprehension",
        completion: 69,
        text: "Nice!"
    }, {
        aspect: "Writing",
        completion: 20,
        text: "Needs work!"
    }, {
        aspect: "Writing",
        completion: 70,
        text: "Impressive!"
    }];

    const courseList: Array<GridItems> = [
        {
            icon: <Headphones style={{ color: "indigo" }} />,
            aspect: "Listening",
            lessons: 18
        },
        {
            icon: <PenBox style={{ color: "indigo" }} />,
            aspect: "Writing",
            lessons: 3
        }, {
            icon: <Newspaper style={{ color: "indigo" }} />,
            aspect: "Reading",
            lessons: 9
        }
        , {
            icon: <Podcast style={{ color: "indigo" }} />,
            aspect: "Speaking",
            lessons: 15
        },
    ];

    const achievements: Array<GridItems> = [
        {
            icon: <Star style={{ color: "indigo" }} />,
            aspect: "Listening",
            lessons: 18
        },
        {
            icon: <StarOffIcon style={{ color: "indigo" }} />,
            aspect: "Writing",
            lessons: 3
        }, {
            icon: <PartyPopper style={{ color: "indigo" }} />,
            aspect: "Reading",
            lessons: 9
        }
        , {
            icon: <SpeechIcon style={{ color: "indigo" }} />,
            aspect: "Speaking",
            lessons: 15
        },
    ];

    const menu = [
        {
            icon: <Home />,
            text: "Home"
        },
        {
            icon: <Book />,
            text: "Lessons"
        },
        {
            icon: <Grid />,
            text: "Explore"
        },
        {
            icon: <User />,
            text: "Profile"
        },
    ]
    return (
        <section className="flex  justify-center m-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div id='enclosingDiv' className="relative w-200 border-1 border-gray-200 m-3 p-4 rounded-4xl min-h-screen bg-gradient-to-tl from-blue-50 via-sky-50 to-blue-100">
                <div className="flex justify-start mb-3">
                    <div className="overflow-hidden rounded-4xl border-3 border-transparent shadow-[0_0_10px_rgba(59,130,246,0.6)] max-w-[60px]">
                        <img className="min-w-[100px]" style={{ marginLeft: "-23px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&s" />
                    </div>
                    <div className="ml-2">
                        <h3 className="text-lg font-semibold">Hi! Rakib 🙌</h3>
                        <span className="font-thin">What do you want to learn?</span>
                    </div>
                </div>
                <div className="flex justify-center gap-2 mb-3 flex-wrap">
                    {widgets.map((v, i) => (
                        <Widget key={i} {...v} />
                    ))}
                </div>

                <div className="mb-3">
                    <h4 className="mb-3 font-semibold text-lg">Course List</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {
                            courseList.map((v, i) => (
                                <GridItem {...v} key={i} />
                            ))
                        }
                    </div>
                </div>
                <div className="mb-5">
                    <h4 className="mb-3 font-semibold text-lg">Achievements</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {
                            achievements.map((v, i) => (
                                <GridItem {...v} key={i} />
                            ))
                        }
                    </div>
                </div>
                <div id="footer" className=" bottom-3 rounded-3xl left-3 right-3 bg-blue-300 p-4 text-white">
                    <div className="justify-around flex">
                        {
                            menu.map((v, i) => (<FooterItem {...v} key={i} />))
                        }
                    </div>

                </div>
            </div>
        </section>
    )
}

const Widget: React.FC<Widget> = ({ aspect, text, completion }) => {
    return (<div className="min-w-[250px] max-w-[250px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white flex items-center space-x-5 p-3">
        <div>
            <svg className="w-20 h-20 transform" viewBox="0 0 100 100">

                <circle
                    className="text-indigo-400"
                    stroke-width="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                />

                <circle
                    className="text-white"
                    stroke-width="10"
                    stroke-dasharray="251.2"
                    stroke-dashoffset={-251.2 * (1 - (completion / 100))}
                    stroke-linecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(270 50 50)"

                />

                <text
                    x="50"
                    y="50"
                    text-anchor="middle"
                    dy="0.3em"
                    className="text-xl font-bold fill-white"
                >
                    {completion}%
                </text>
            </svg>
        </div>
        <div>
            <h4 className="font-semibold">{aspect}</h4>
            <p className="font-thin hidden md:block">{text}</p>
            <p className="font-sans flex space-x-1.5"><span className=" sm:block">Continue</span> <ArrowRight className=" md:block" height="25px" /></p>

        </div>
    </div>)

}

const GridItem: React.FC<GridItems> = ({ icon, aspect, lessons }) => {

    return (
        <div className="flex  flex-col justify-between p-3 pl-4 rounded-2xl h-[150px] bg-pink-100/75">
            <div>
                <div className="bg-white p-2 rounded-full flex items-center justify-center w-10 h-10">
                    {icon}
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-md">{aspect}</h4>
                <p className="flex justify-between items-center">
                    <span>{lessons} Lessons</span>
                    <ArrowRight />
                </p>

            </div>
        </div>
    )
}

const FooterItem: React.FC<{ icon: JSX.Element, text: string }> = ({ icon, text }) => {
    return (
        <div className="flex flex-col justify-center align-middle items-center hover:cursor-pointer hover:border-b-4 hover:border-b-indigo-500">
            <span>{icon}</span>
            <h3>
                {text}
            </h3>
        </div>
    )
}

export default Design;