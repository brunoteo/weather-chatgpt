const cleanData = (data: Root, city: string) => {
  const {
    current_weather,
    timezone,
    hourly,
    hourly_units,
    timezone_abbreviation,
  } = data;

  const { temperature, windspeed, winddirection, weathercode, time } =
    current_weather;

  const {
    temperature_2m,
    snowfall,
    rain,
    relativehumidity_2m,
    precipitation_probability,
    uv_index,
  } = hourly;

  return {
    current_weather: {
      temperature,
      windspeed,
      winddirection,
      time,
      weathercode,
    },
    hourly: {
      temperature_2m: temperature_2m.slice(0, 25),
      snowfall: snowfall.slice(0, 25),
      rain: rain.slice(0, 25),
      relativehumidity_2m: relativehumidity_2m.slice(0, 25),
      precipitation_probability: precipitation_probability.slice(0, 25),
      uv_index: uv_index.slice(0, 25),
    },
    timezone,
    timezone_abbreviation,
    hourly_units,
    city,
  };
};

export default cleanData;
