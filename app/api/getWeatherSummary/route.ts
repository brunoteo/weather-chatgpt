import openai from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { weatherData } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `Pretend you're a weather news presenter presenting LIVE on television. Be energetic and full of charisma.
                Introduce yourself as Matteo and say you are LIVE from the NAYMIX Headquarters. State the city you are providing a summary for.
                Then gie a summary of todays weather only. Make it easy for the viewer to understand and know what to do to prepare for those weather conditions
                such as wear SPF if the UV is high etc. use the un_index provided to provide UV advice. Provide a joke regarding the weather.
                Assume the data came from your team at the news office and not the user.`,
      },
      {
        role: "user",
        content: `Hi there, can I get a summary of todays weather, use the following information to get the weather data: 
                ${JSON.stringify(weatherData)}`,
      },
    ],
  });

  const { data } = response;
  console.log("DATA IS: ", data);

  return NextResponse.json(data.choices[0].message);
}
