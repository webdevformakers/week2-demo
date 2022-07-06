import axios from "axios";
import { useEffect, useState } from "react";

export default function Location(props: {location: string}) {
    const [weather, setWeather] = useState<{
        main: {
            temp: number,
            feels_like: number,
            temp_min: number,
            temp_max: number,
        },
        weather: {
            description: string
        }[]
    } | null>(null);

    useEffect(() => {
        axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: props.location,
                appid: "cbe2849b7ac1d55771a363b935e306a3",
            }
        }).then(res => {
            setWeather(res.data);
        }).catch(e => console.log(e));
    }, []);

    return (
        <div className="p-4 border border-black flex items-center mb-4">
            <div className="text-xl">
                <p className="font-bold">{props.location}</p>
                {weather ? (
                    <p>{Math.round((weather.main.temp - 276) * 9 / 5 + 32)}° F</p>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {weather && (
                <div className="ml-auto text-right">
                    <p>Feels like {Math.round((weather.main.feels_like - 276) * 9 / 5 + 32)}° F / {weather.weather[0].description}</p>
                    <p>Min {Math.round((weather.main.temp_min - 276) * 9 / 5 + 32)}° F / Max {Math.round((weather.main.temp_max - 276) * 9 / 5 + 32)}° F</p>
                </div>
            )}
        </div>
    )
}