import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function WeatherCard({ weather }) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 360,
        mx: "auto",
        textAlign: "center",
        borderRadius: 3,
        boxShadow: "0 18px 40px rgba(15, 23, 42, 0.18)",
      }}
    >
      <CardContent>
        <Typography variant="h5">{weather.city}</Typography>
        <Typography color="text.secondary">{weather.country}</Typography>

        <Typography variant="h4" sx={{ marginTop: 1 }}>
          {weather.temp} &deg;C
        </Typography>

        <Typography color="text.secondary">{weather.condition}</Typography>

        <Typography variant="body2">Humidity: {weather.humidity}%</Typography>

        <Typography variant="body2">
          Feels Like: {weather.feelsLike} &deg;C
        </Typography>
      </CardContent>

      {weather.icon && (
        <CardMedia
          component="img"
          image={`https:${weather.icon}`}
          alt={weather.condition}
          sx={{ width: 100, margin: "auto", padding: 2, paddingTop: 0 }}
        />
      )}
    </Card>
  );
}
